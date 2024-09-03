import * as React from 'react';
import SendIcon from '@mui/icons-material/Send';
import { Alert, Snackbar, InputBase, Typography } from '@mui/material';
import {
  Box,
  Drawer,
  Button,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Paper,
  TextareaAutosize,
} from '@mui/material/';
import ChatIcon from '@mui/icons-material/Chat';
import CallIcon from '@mui/icons-material/Call';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { drawerItems } from './Consts/itemGeral';
import { permissions } from './Consts/permissions';
import { secondaryDrawerItems } from './Consts/adminItems';

export default function Menu() {
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState('success');
  const [state, setState] = React.useState({
    bottom: false,
  });
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [isSearchFocused, setIsSearchFocused] = React.useState(false);
  const [textareaValue, setTextareaValue] = React.useState('');
  const [ip, setIp] = React.useState('');

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const toggleDrawerBottom = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

   const nivel = localStorage.getItem('nivel');

  const filteredItems = drawerItems.filter(item =>
    item.text.toLowerCase().includes(searchTerm.toLowerCase()),
    permissions[nivel]?.includes(drawerItems.text)
  );

  const filteredItemsSecondary = secondaryDrawerItems.filter(item =>
    item.text.toLowerCase().includes(searchTerm.toLowerCase()),
    permissions[nivel]?.includes(secondaryDrawerItems.text)
  );


  const renderSuggestionDrawer = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
    >
      {<List>
        <ListItem>
          <ListItemIcon>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="h6" gutterBottom>
                Sua sugestão ou opinião é sempre bem vinda!
              </Typography>
              <TextareaAutosize
                minRows={10}
                placeholder="Deixe aqui a sua sugestão ou sua opinião."
                style={{ width: 500 }}
                value={textareaValue}
                onChange={(e) => setTextareaValue(e.target.value)}
              />
              <Button
                variant="contained"
                name="comentario"
                endIcon={<SendIcon />}
                sx={{ marginLeft: 5, fontSize: 13, marginTop: '15%', paddingLeft: 1, height: 40, width: 200 }}
                onClick={handleSendComment}
              >
                Enviar sugestão
              </Button>
            </Box>
          </ListItemIcon>
          <ListItemText />
        </ListItem>
      </List>}
    </Box>
  );

  const DrawerList = (
    <Box sx={{ width: 280, marginTop: 2, paddingLeft: 2, marginRight: 5, marginBottom: 5 }} role="presentation" onClick={() => {
      if (!isSearchFocused) {
        toggleDrawer(false)();
        setSearchTerm('');
      }
    }}>
      <Paper
        component="form"
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          marginBottom: 1,
        }}
      >
        <InputBase
          sx={{ ml: 2, flex: 1 }}
          placeholder="Pesquisar natureza"
          inputProps={{ 'aria-label': 'search' }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
        />
        <IconButton sx={{ p: '8px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      <List>
        {filteredItemsSecondary.map((item, index) => (
          <React.Fragment key={item?.text || index}>
            {item && (
              <ListItem disablePadding>
                <ListItemButton component={Link} to={item.link}>
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            )}
          </React.Fragment>
        ))}
      </List>
<Divider/>
      <List>
        {filteredItems.map((item, index) => (
          <React.Fragment key={item?.text || index}>
            {item && (
              <ListItem disablePadding>
                <ListItemButton component={Link} to={item.link}>
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            )}
          </React.Fragment>
        ))}
      </List>

      <Divider />
      <ListItem disablePadding>
        <ListItemButton onClick={() => window.open('TelefonesUteis', '_blank', 'width=1800,height=950')}>
          <ListItemIcon>
            <CallIcon />
          </ListItemIcon>
          <ListItemText primary="Telefones úteis" />
        </ListItemButton>
      </ListItem>
    </Box>
  );

  React.useEffect(() => {
    if (!open) {
      setSearchTerm('');
    }
  }, [open]);

 React.useEffect(() => {
    const fetchIp = async () => {
      try {
        const response = await fetch('http://10.95.91.61:3000/getClientIp');
        const data = await response.json();
        setIp(data.ip);
        console.log(data.ip);
      } catch (error) {
        console.error('Erro ao obter o IP:', error);
      }
    };

    fetchIp();
  }, []);

  const handleSendComment = async () => {
    const currentDate = new Date();

    try {
      await axios.post('http://10.95.91.61:3000/Admins/comentarios/comentarios', {
        comentario: textareaValue,
        ipRede: ip,
        dataRegistro: currentDate,
      });
      setTextareaValue('');
      setState({ ...state, bottom: false });
      showSnackbar('Sugestão enviada com sucesso', 'success');
      console.error(ip);
    } catch (error) {
      console.error('Erro ao enviar o comentário:', error);
      showSnackbar('Sugestão não enviada', 'error');
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  return (
    <>
      <div>
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          sx={{ marginLeft: 5, fontSize: 12, marginTop: 2, paddingLeft: 1 }}
          onClick={toggleDrawer(true)}
          aria-label="Abrir menu"
        >
          SELECIONE A NATUREZA
        </Button>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>
      </div>

      <div>
        {['bottom'].map((anchor) => (
          <React.Fragment key={anchor}>
            <Button
              variant="contained"
              endIcon={<ChatIcon />}
              sx={{ marginLeft: 5, fontSize: 12, marginTop: 5, paddingLeft: 1 }}
              onClick={toggleDrawerBottom(anchor, true)}
              aria-label="Opa"
            >
              Sugestões e correções
            </Button>

            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawerBottom(anchor, false)}
            >
              {renderSuggestionDrawer(anchor)}
            </Drawer>
          </React.Fragment>
        ))}
      </div>

     {<Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        action={
          <Button color="inherit" onClick={handleSnackbarClose}>
            Fechar
          </Button>
        }
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>}
    </>
  );
}

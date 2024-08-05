import * as React from 'react';
import SendIcon from '@mui/icons-material/Send';
import SearchIcon from '@mui/icons-material/Search';
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
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import SpatialAudioIcon from '@mui/icons-material/SpatialAudio';
import PetsIcon from '@mui/icons-material/Pets';
import AlarmIcon from '@mui/icons-material/Alarm';
import ReportIcon from '@mui/icons-material/Report';
import HomeIcon from '@mui/icons-material/Home';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import MoodBadIcon from '@mui/icons-material/MoodBad';
import CarCrashIcon from '@mui/icons-material/CarCrash';
import CallIcon from '@mui/icons-material/Call';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import HeartBrokenOutlinedIcon from '@mui/icons-material/HeartBrokenOutlined';
import Face2Icon from '@mui/icons-material/Face2';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import DifferenceOutlinedIcon from '@mui/icons-material/DifferenceOutlined';
import VolunteerActivismOutlinedIcon from '@mui/icons-material/VolunteerActivismOutlined';
import Man2Icon from '@mui/icons-material/Man2';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
  const [localIp, setLocalIp] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [currentTime, setCurrentTime] = React.useState(new Date());

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const toggleDrawerBottom = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
    >
      <List>
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
      </List>
    </Box>
  );

  const drawerItems = [
    { text: 'Home', icon: <HomeIcon />, link: '/' },
    { text: 'Gerar Ocorrência', icon: <DifferenceOutlinedIcon />, link: '/GerarOcorrencia' },
    { text: 'Violência doméstica', icon: <Face2Icon />, link: '/ViolenciaDomestica' },
    { text: 'Som automotivo / Perturbação', icon: <SpatialAudioIcon />, link: '/SomAlto' },
    { text: 'Roubo/Furto', icon: <LocalPoliceIcon />, link: '/RouboFurto' },
    { text: 'Crimes contra animais', icon: <PetsIcon />, link: '/MausTratos' },
    { text: 'Alarme acionado', icon: <AlarmIcon />, link: '/AlarmeAcionado' },
    { text: 'Vias de Fato', icon: <SportsKabaddiIcon />, link: '/ViasDeFato' },
    { text: 'Ameaça', icon: <MoodBadIcon />, link: '/Ameaca' },
    { text: 'Acidente de trânsito', icon: <CarCrashIcon />, link: '/AcidenteTransito' },
    { text: 'Drogas', icon: <VaccinesIcon />, link: '/Drogas' },
    { text: 'Abandono', icon: <HeartBrokenOutlinedIcon />, link: '/Abandono' },
    { text: 'Crimes Sexuais', icon: <ReportIcon />, link: '/CrimesSexuais' },
    { text: 'Homofobia', icon: <Diversity2Icon />, link: '/Homofobia' },
    { text: 'Racismo', icon: <GroupOutlinedIcon />, link: '/Racismo' },
    { text: 'Suicidio', icon: <VolunteerActivismOutlinedIcon />, link: '/Suicidio' },
    { text: 'Pessoa armada', icon: <Man2Icon />, link: '/PessoaArmada' },
    { text: 'Agressão', icon: <Man2Icon />, link: '/Agressao' },
  ];

  const ordenarItens = (itens) => {
    const itemHome = itens.find(item => item.text === 'Home');
    const itemOcorrencia = itens.find(item => item.text === 'Gerar Ocorrência');
    const outrosItens = itens.filter(item => item.text !== 'Home' && item.text !== 'Gerar Ocorrência');
    outrosItens.sort((a, b) => a.text.localeCompare(b.text));
    return [itemHome, itemOcorrencia, ...outrosItens];
  };

  const filteredItems = drawerItems.filter(item =>
    item.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const DrawerList = (
    <Box sx={{ width: 280, marginTop: 2, paddingLeft: 2, marginRight: 5, marginBottom: 5 }} role="presentation" onClick={() => {
      if (!isSearchFocused) {
        toggleDrawer(false)();
        setSearchTerm('');
      }
    }}
    >
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
        {ordenarItens(filteredItems).map((item, index) => (
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
            {item && item.text === 'Gerar Ocorrência' && <Divider />}
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
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        setIp(data.ip);
      } catch (error) {
        console.error('Erro ao obter o IP:', error);
      }
    };

    
  const fetchLocalIp = async () => {
    try {
      const response = await axios.get('http://localhost:8080/getLocalIp');
      setLocalIp(response.data.ip);
    } catch (error) {
      console.error('Error fetching local IP:', error);
    }
  };
  const fetchUsername = async () => {
    try {
      const response = await axios.get('http://localhost:8080/getUsername');
      setUsername(response.data.username);
    } catch (error) {
      console.error('Error fetching username:', error);
    }
  };

  fetchIp();
  fetchLocalIp();
  fetchUsername();
}, []);

  const handleSendComment = async () => {
    const currentDate = new Date();
    
    try {
      await axios.post('http://localhost:8080/Admins/comentarios/comentarios', {
        comentario: textareaValue,
        ipMaquina: localIp,
        ipRede: ip,
        dataRegistro: currentDate,
        usuario: username,
      });
      setTextareaValue('');
      setState({ ...state, bottom: false });
      showSnackbar('Sugestão enviada com sucesso', 'success');
      console.error(localIp);
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
          sx={{ marginLeft: 5, fontSize: 13, marginTop: 2, paddingLeft: 1 }}
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
              sx={{ marginLeft: 5, fontSize: 12, marginTop: 8, paddingLeft: 1 }}
              onClick={toggleDrawerBottom(anchor, true)}
              aria-label="Opa"
            >
              Clique aqui para deixar sua sugestão
            </Button>

            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawerBottom(anchor, false)}
            >
              {list(anchor)}
            </Drawer>
          </React.Fragment>
        ))}
      </div>

      <Snackbar
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
      </Snackbar>
    </>
  );
}

import * as React from 'react';
import SendIcon from '@mui/icons-material/Send';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
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
import VolunteerActivismOutlinedIcon from '@mui/icons-material/VolunteerActivismOutlined';
import DifferenceOutlinedIcon from '@mui/icons-material/DifferenceOutlined';
import Man2Icon from '@mui/icons-material/Man2';
import { Link } from 'react-router-dom';
import { Textarea } from '@mui/joy';


export default function Menu() {

  const [state, setState] = React.useState({
    bottom: false,
  });

  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [isSearchFocused, setIsSearchFocused] = React.useState(false);

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
                <Textarea sx={{width:500, height:300}}/>
                <Button
              variant="contained"
              endIcon={<SendIcon />}
              sx={{ marginLeft: 5, fontSize: 13, marginTop: '15%', paddingLeft: 1, height:40, width:200 }}
              onClick={toggleDrawerBottom(anchor, true)}
              aria-label="Opa"
              >
                Enviar sugestão
                </Button>
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
    { text: 'Agressão', icon: <Man2Icon />, link: '/Agressao' }

  ];

  const ordenarItens = (itens) => {
    const itemHome = itens.find(item => item.text === 'Home');
    const itemOcorrencia = itens.find(item => item.text === 'Gerar Ocorrência');
    const outrosItens = itens.filter(item => item.text !== 'Home' && item.text !== 'Gerar Ocorrência');
    outrosItens.sort((a, b) => a.text.localeCompare(b.text));
    return [itemHome, itemOcorrencia, ...outrosItens];
  };

  drawerItems.slice(1).sort((a, b) => a.text.localeCompare(b.text));

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
              sx={{ marginLeft: 5, fontSize: 13, marginTop: 8, paddingLeft: 1 }}
              onClick={toggleDrawerBottom(anchor, true)}
              aria-label="Opa"
              >
                clique aqui para sugestões
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

    </>
  );
}

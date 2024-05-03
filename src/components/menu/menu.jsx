import * as React from 'react';
import {
  Box,
  Drawer,
  Button,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material/';


import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import SpatialAudioIcon from '@mui/icons-material/SpatialAudio';
import PetsIcon from '@mui/icons-material/Pets';
import AlarmIcon from '@mui/icons-material/Alarm';
import ReportIcon from '@mui/icons-material/Report';
import HomeIcon from '@mui/icons-material/Home';

export default function Menu() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const drawerItems = [
    { text: 'Home', icon: <HomeIcon /> },
    { text: 'Violência doméstica', icon: <ReportIcon /> },
    { text: 'Som automotivo/ Perturbação', icon: <SpatialAudioIcon /> },
    { text: 'Roubo/Furto', icon: <LocalPoliceIcon /> },
    { text: 'Maus tratos a animais', icon: <PetsIcon /> },
    { text: 'Alarme acionado', icon: <AlarmIcon /> }
  ];

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {drawerItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      <Button sx={{ marginLeft: 3, marginTop: 3 }} onClick={toggleDrawer(true)}>Mudar a Natureza do Registro</Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}

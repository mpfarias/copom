
import SearchIcon from '@mui/icons-material/Search';
import Face2Icon from '@mui/icons-material/Face2';
import SpatialAudioIcon from '@mui/icons-material/SpatialAudio';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import PetsIcon from '@mui/icons-material/Pets';
import AlarmIcon from '@mui/icons-material/Alarm';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import MoodBadIcon from '@mui/icons-material/MoodBad';
import CarCrashIcon from '@mui/icons-material/CarCrash';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import HeartBrokenOutlinedIcon from '@mui/icons-material/HeartBrokenOutlined';
import ReportIcon from '@mui/icons-material/Report';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import VolunteerActivismOutlinedIcon from '@mui/icons-material/VolunteerActivismOutlined';
import Man2Icon from '@mui/icons-material/Man2';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import { Cancel } from '@mui/icons-material';

export const drawerItems = [
    { text: 'Verificar Pessoa', icon: <SearchIcon />, link: '/BuscarPessoa' },
    { text: 'Verificar Veículo', icon: <SearchIcon />, link: '/BuscarVeiculo' },
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
    { text: 'Pessoa armada', icon: <Cancel />, link: '/PessoaArmada' },
    { text: 'Agressão', icon: <Man2Icon />, link: '/Agressao' },
    { text: 'Dano', icon: <MoneyOffIcon />, link: '/DanoAoPatrimonio' },
  ].sort((a, b) => a.text.localeCompare(b.text));

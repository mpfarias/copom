import HomeIcon from '@mui/icons-material/Home';
import DifferenceOutlinedIcon from '@mui/icons-material/DifferenceOutlined';
import SearchIcon from '@mui/icons-material/Search';
import Man2Icon from '@mui/icons-material/Man2';
import EqualizerIcon from '@mui/icons-material/Equalizer';

export const secondaryDrawerItems = [
    { text: 'Home', icon: <HomeIcon />, link: '/Main' },
    { text: 'Gerar Ocorrência', icon: <DifferenceOutlinedIcon />, link: '/GerarOcorrencia' },
    { text: 'Verificar Pessoa', icon: <SearchIcon />, link: '/BuscarPessoa' },
    { text: 'Verificar Veículo', icon: <SearchIcon />, link: '/BuscarVeiculo' },
    { text: 'Cadastrar Usuário', icon: <Man2Icon />, link: '/CadastrarUsuario' },
    { text: 'Relatórios', icon: <EqualizerIcon />, link: '/Relatorios' },
    
  ];

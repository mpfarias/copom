import * as React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

export default function Home() {
  const theme = useTheme();

  return (
    <Box
      my={4}
      display="flex"
      alignItems="center"
      justifyContent="center"
      gap={4}
      p={2}

    >
      <Box
        component="img"
        src="src/img/PMDF.png"
        alt="PMDF Logo"
        sx={{
          maxWidth: '100%',
          height: 'auto',
          [theme.breakpoints.down('sm')]: {
            maxWidth: '60%', 
          },
          [theme.breakpoints.down('xs')]: { 
            maxWidth: '40%',
          },
        }}
      />
    </Box>
  );
}

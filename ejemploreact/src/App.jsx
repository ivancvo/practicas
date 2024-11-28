import { useState } from 'react'
import { BrowserRouter as router, route, Routes } from 'react-router-dom';
import Navbar  from './components/navbar/Navbar';

import home from './pages/Home/Home';
import Cursos from './pages/cursos/Cursos';
import Usuarios from './pages/usuarios/usuarios';
import MasInformacion from './pages/masinformacion/Masinformacion';

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#008CBA',
    },
    secondary: {
      main: '#f44336',
    },
    secondary:{
      main: '#f44336', 
    }
  },
})


import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette:{
        primary: {
            main: '#39A900', 
        },
        secondary:{
            main: '#007832', //color secundario
        },
        error:{
            main: '#f44336' //color de error
        },
        background: {
            default: '#ffffff' //color de fondo por defecto 
        },
    },
    typography:{
        fontFamily: 'Roboto, sans-serif',
        h1:{
            fontSize: '2.Srem',
        },
        h2: {
            fontSize: '2rem',
        },
        body1: {
            fontSize: '1rem',
        },
    },
    spacing: 8, //define a unidad de espaciado (8 es el valor predetermindado)
    shape: {
        borderRadius: 8,
    },
    breakpoints: {
        values:{
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1928,
        },
    },
     components: {
        MuiButton: {
            styleOverrides: {
              root: {
                textTransform: 'none',  //77desactiva la capitalizacion automatica
              },
            },
        },
    },
});
export default theme;

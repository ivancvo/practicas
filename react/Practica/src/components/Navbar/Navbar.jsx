import React, { useState } from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from  '@mui/material/Toolbar';
import Typography from '@mui/material/Button';
import Button from '@mui/material/Button'
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { Box, Drawer, IconButton, List, ListItem, ListItemText } from "@mui/material";
import linkBehavior from "../../utils/textUtils";
import LinkBehavior from "./LinkBehavior";

const useStyles = makeStyles((theme)=> ({
title: {
    flexGrow: 1,
},
    link: {
    color: 'white',
    textDecoration: 'none',
    margin: theme.spacing(2),
},
    toolbar:{
    display: 'flex',
    justifyContent: 'space-between',
},
}));

export default function Navbar(){
const classes = useStyles();
return (
    <AppBar position="static">
        <Toolbar className={classes.toolbar}>
            <Typography variant="h6" className={classes.title}>
                SERVICIO NACIONAL DE APRENDIZAJE SENA
            </Typography>
            <div>
                <link to="/home" className={classes.link}>
                <Button color="inherit">Home</Button>
                </link>
                <link to="/cursos" className={classes.link}>
                <Button color="inherit">Cursos</Button>
                </link>
                <link to="/usuarios" className={classes.link}>
                <Button color="inherit">Usuarios</Button>
                </link>
                <link to="/masinformacion" className={classes.link}>
                <Button color="inherit">Mas informacion</Button>
                </link>
            </div>
        </Toolbar>
    </AppBar>
    );
};

export default function Navbar(){
    const classes = useStyles();
    const[drawerOpen, setDrawerOpen] = useState(false);

    const handleCrawerToggle =() =>{
        setDrawerOpen(!drawerOpen);
    };

    const drawer = (
        <div className={classes.drawer}>
          <List>
            {['Home', 'Cursos', 'Usuarios', 'Más información'].map((text) => (
              <ListItem button component={Link} to={`/${normalizeText(text)}`} key={text}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
    );
    return(
       <>
        <AppBar position="fixed">
            <Toolbar className={classes.toolbar}>
                <img src={logosena} alt="Sena logo" className={classes.logo}/> 
                <Typography variant="h6" className={classes.title}>
                    SERIVIO NACIANL DE AORENDISAJE SENA
                </Typography>
                <IconButton
                edge = "start"
                color="inherit"
                aria-label="menu"
                onClick={handleDrawerToggle}
                sx={{display: {xs: 'block', md: 'none'}}}
                >
                    <menuIcon/>
                </IconButton>
                <Box sx={{display:{xs: 'none', md: 'flex'}}}>
                    {('Home', 'Cursos', 'Usuarios', 'Mas informacion').map((text)=>(
                        <Button color="inherit" component = {LinkBehavior} to={`/${normalizeText(text)}`} key={text}>
                            (text)
                        </Button>
                    ))}
                </Box>
            </Toolbar>
        </AppBar>
        <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
            {drawer}
        </Drawer>
        </>
    );
}
    





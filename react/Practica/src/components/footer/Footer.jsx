import React from "react";
import './Footer.css' // solo si hay estilos para aplicar en el footer
import { ClassNames } from "@emotion/react";

const Footer = () => {
    const currentYear = new Date().getFullYear(); //obtener el año actual de forma dinamica

    return(
        <footer ClassName="footer">
            <p>©{currentYear} SENA, All rights reserved.</p> 
        </footer>
    );
};

export default Footer;
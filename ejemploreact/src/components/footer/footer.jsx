import React from "react";
import './footer.css';
const footer =() =>{
    const currentYear = new Date().getFullYear();
    return (
        <footer className="footer">
            <p>©{currentYear} SENA. All rights</p>
        </footer>
    );
};

export default footer;

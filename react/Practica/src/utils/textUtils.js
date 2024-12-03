import React from 'react';
import {link as RouterLink} from 'react-router-dom';

const linkBehavior = React.forwardRef((props, ref)=>{
    //destructura los props ára excluir "button" y cualquier ptro prop no deseado 
    const {button, ...restProps} = props;
    //solo pasas los props que deberian ir a routerlink
    return <RouterLink ref= {ref} {...restProps} />;
});

export default linkBehavior;
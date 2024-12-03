import React from "react";
import {Link as RouterLink} from 'react-router-dom';

const LinkBehavior = React.forwardRef((props, ref)=>{
    //destructura los props para excluir 'buttom' y cualquier otro prop no deseasdo 
    const {button, ...restProps} = props;

    return <RouterLink ref={ref} {...restProps}/>
});

export default LinkBehavior;
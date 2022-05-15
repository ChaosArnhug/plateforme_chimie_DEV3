import React, { Component } from 'react';

import {Button, MenuItem, Menu} from '@mui/material'

class MonCompteMenu extends Component{

    render(){
      return(
        <BasicMenu/>
      )
      
    }
  }
   
  export default MonCompteMenu;

        const BasicMenu = () => {
            const [anchorEl, setAnchorEl] = React.useState(null);
            const open = Boolean(anchorEl);

            const handleClick = (event) => {
                setAnchorEl(event.currentTarget);
            };

            const handleClose = () => {
                setAnchorEl(null);
            };
    
        return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{ml:3, mr:4, my:2, py:2, bgcolor:"secondary.button", fontSize:12, color:"#000000"}}
            >
                Mon Compte
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                '   aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => {window.location = "/utilisateurs/demande"}}>Demandes</MenuItem>
                <MenuItem onClick={() => {window.location = "/utilisateurs/inscription"}}>Inscription</MenuItem>
                <MenuItem onClick={() => {window.location = "/utilisateurs/connexion"}}>Connexion</MenuItem>
                <MenuItem> Déconnexion</MenuItem>
    
            </Menu>
        </div>
        );
    }
  
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import HubCours from './HubCours'

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


// Render le bouton d'un cours dans le menu déroulant déroulant.
class CoursButton extends Component{
  goToCours(e){
    e.preventDefault();
    this.props.handleClose();
    ReactDOM.render(
      <HubCours nom={this.props.nom}/>,
      document.getElementById('main')
    )
  }
  render(){
      return <MenuItem onClick={()=>{window.location = `http://localhost:3000/cours/${this.props.nom}/creation`}}>{this.props.nom}</MenuItem>}
  /*render(){
      return(
        (req.user.idUtilisateur == 1 &&
          <MenuItem onClick={()=>{window.location = `http://localhost:3000/cours/${this.props.nom}/creation`}}>{this.props.nom}</MenuItem>)
        (req.user.idUtilisateur != 1 &&
          <MenuItem onClick={()=>{window.location = `http://localhost:3000/cours/${this.props.nom}`}}>{this.props.nom}</MenuItem>)
  )}*/
}

// Fait un .map() de l'array de données reçu et appelles CoursButton pour chacun. Envoie le nom du cours à afficher 
// et la fonction pour gérer la fermeture du menu déroulant
class CoursButtonList extends Component{
  render(){
    return(
      <div>
    {
      this.props.data.map(item =>(
        <CoursButton key={item.nom} nom={item.nom} handleClose={this.props.handleClose}/>
      ))
    }
    </div>)
  }
}


// Composant MUI, menu déroulant. Voir Documentation MUI. 
// Appelles CoursButtonList en lui donnant les données récupérées lors du fetch de la liste des cours. 
// Si le fetch n'a pas encore renvoyé on envoie {nom:"nom_vide_chargement"}
function BasicMenu(props) {
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
        Mes cours
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        
        <CoursButtonList data={props?.data ?? [{"nom":"nom_vide_chargement"}]} handleClose={handleClose}/>

      </Menu>
    </div>
  );
}


// Composant contenant le menu déroulant, effectue le fetch des données et les envoie à BasicMenu
class ListingCours extends Component{
  state = { 
    loading : true,
    data : null
  } 

  async componentDidMount() {
      const url = "http://141.94.26.80:5000/cours";  
      const response = await fetch(url);
      const data = await response.json();
      console.log(data)
      this.setState({loading : false, data : data});
  }

  render(){
    return(
      <BasicMenu data={this.state.data} />
    )
    
  }
}
 
export default ListingCours;

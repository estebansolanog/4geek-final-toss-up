import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ShareIcon from '@material-ui/icons/Share';
import { Link } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Divider } from "@material-ui/core";
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';
import "../../styles/home.css"
import Navbar from "../component/navbar.jsx";

const useStyles = makeStyles((theme) => ({
  plusButton: {
    position: 'fixed',
    bottom: '3%',
    right: '3%',
    zIndex: 2,
  },
}));
const Home = () => {
  const { store, actions } = useContext(Context);
  const [chatHistory, setChatHistory] = useState([]);
  const [socialShareAnchorEl, setSocialShareAnchorEl] = useState(null);
  const [expandedChatIndex, setExpandedChatIndex] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();
  const [infoUsuario, setInfoUsuario] = useState(null)


  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await axios.get('http://localhost:3001/chat/AllShareRecipes', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          }
        });
        setChatHistory(response.data);
      } catch (err) {
        console.error(err);
      }
    };


    fetchChatHistory();
  }, []);


  useEffect(() => {


  }, [setChatHistory]);


  const handleOpenSocialShareMenu = (event) => {
    setSocialShareAnchorEl(event.currentTarget);
  };

  const handleCloseSocialShareMenu = () => {
    setSocialShareAnchorEl(null);
  };

  const handleToggleExpandChat = (index) => {
    if (expandedChatIndex === index) {
      setExpandedChatIndex(null);
    } else {
      setExpandedChatIndex(index);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //TRAER INFORMACIION DE USUARIO
  useEffect(() => {
    const cargaDatos = async () => {
      // let { respuestaJson, response } = await actions.useFetch("/api/protected")
      const { respuestaJson, response } = await actions.useFetch("/api/myaccount");

      console.log(response.ok)
      console.log(respuestaJson)
      if (response.ok) {
        setInfoUsuario(respuestaJson.name)
        console.log(respuestaJson.name)
      }
    }
    cargaDatos()
  }, [])

  return (
    <>
      <Navbar />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '20PX' }}>
        <div>
          {chatHistory && chatHistory.length > 0 ? [...chatHistory].reverse().map((chat, index) => (
            <div key={index}>

              <div className="recetas-container card d-none d-xs-block d-sm-block d-md-block" style={{ width: "40rem" }}>
                <p className="card-title text-black">Por: <strong>{chat.user_name}</strong></p>
                {chat.image_of_recipe && <img className="responsive-image" src={chat.image_of_recipe} alt="recipe" />}
                <div className="card-body bg bg-dark">
                  {store.userLogin ?
                    <div className="home_name-and-icons">
                      <h5 className="card-title text-white">{chat.user_query}</h5>
                      <div className="home_name-and-icons_icons">
                        <CommentIcon style={{ color: 'white', fontSize: "1.5rem" }} />
                        <FavoriteIcon style={{ color: 'white', fontSize: "1.5rem" }} />
                      </div>
                    </div> : <div className="home_name-and-icons">
                      <h5 className="card-title text-white">{chat.user_query}</h5>
                      <div className="home_name-and-icons_icons">
                        <CommentIcon style={{ color: 'gray', fontSize: "1.5rem" }} />
                        <FavoriteIcon style={{ color: 'gray', fontSize: "1.5rem" }} />
                      </div>
                    </div>
                  }
                  {expandedChatIndex === index ? (
                    <p className="card-text text-warning" style={{ whiteSpace: 'pre-wrap' }}>{chat.description}</p>
                  ) : (
                    <p className="card-text text-warning" style={{ maxHeight: '3em', overflow: 'hidden', textOverflow: 'ellipsis' }}>{chat.description}</p>
                  )}
                  <div className="home_button-group">
                    {chat.description && chat.description.split('\n').length > 3 && (
                      <Button className="btn-link text-warning" onClick={() => handleToggleExpandChat(index)}>
                        {expandedChatIndex === index ? "Ver menos" : "Ver más"}
                      </Button>
                    )}
                    <Button className="btn-warning rounded" color="warning" onClick={handleOpenSocialShareMenu}>
                      <i className="fa-solid fa-ellipsis-vertical btn-warning p-3 rounded"></i>
                    </Button>
                    <Menu
                      id="social-share-menu"
                      anchorEl={socialShareAnchorEl}
                      keepMounted
                      open={Boolean(socialShareAnchorEl)}
                      onClose={handleCloseSocialShareMenu}
                    >
                      <MenuItem onClick={() => handleSocialShare('Facebook', chat)}><ShareIcon />Facebook</MenuItem>
                      <MenuItem onClick={() => handleSocialShare('Twitter', chat)}><ShareIcon />Twitter</MenuItem>
                      <MenuItem onClick={() => handleSocialShare('WhatsApp', chat)}><ShareIcon />WhatsApp</MenuItem>
                    </Menu>
                  </div>
                </div>
              </div>
              <div className="divider"></div>
            </div>
          )) : <p>No hay recetas compartidas</p>}
        </div>
        <div style={{ border: "red", height: "10px " }}></div>
      </div>




      <div className="recetas-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '20PX' }}>

        <div>
          {chatHistory && chatHistory.length > 0 ? chatHistory.map((chat, index) => (
            <div key={index}>
              <div className="card d-xs-none d-sm-none d-md-none" style={{ width: "18rem" }}>
                <h5 className="card-title text-white" style={{ color: "primary" }}>{infoUsuario}</h5>
                {chat.image_of_recipe && <img className="responsive-image" src={chat.image_of_recipe} alt="recipe" />}
                <div className="card-body bg bg-dark">
                  <h5 className="card-title text-white">{chat.query_user}</h5>
                  {expandedChatIndex === index ? (
                    <p className="card-text text-warning" style={{ whiteSpace: 'pre-wrap' }}>{chat.description}</p>
                  ) : (
                    <p className="card-text text-warning" style={{ maxHeight: '3em', overflow: 'hidden', textOverflow: 'ellipsis' }}>{chat.description}</p>
                  )}
                  <div className="home_button-group">
                    {chat.description && chat.description.split('\n').length > 3 && (
                      <Button className="btn-link text-warning" onClick={() => handleToggleExpandChat(index)}>
                        {expandedChatIndex === index ? "Ver menos" : "Ver más"}
                      </Button>
                    )}
                    <Button className="btn-warning rounded" color="warning" onClick={handleOpenSocialShareMenu}>
                      <i className="fa-solid fa-ellipsis-vertical btn-warning p-3 rounded"></i>
                    </Button>
                    <Menu
                      id="social-share-menu"
                      anchorEl={socialShareAnchorEl}
                      keepMounted
                      open={Boolean(socialShareAnchorEl)}
                      onClose={handleCloseSocialShareMenu}
                    >
                      <MenuItem onClick={() => handleSocialShare('Facebook', chat)}><ShareIcon />Facebook</MenuItem>
                      <MenuItem onClick={() => handleSocialShare('Twitter', chat)}><ShareIcon />Twitter</MenuItem>
                      <MenuItem onClick={() => handleSocialShare('WhatsApp', chat)}><ShareIcon />WhatsApp</MenuItem>
                    </Menu>
                  </div>
                </div>
              </div>
            </div>
          )) : <p>No hay recetas compartidas</p>}
        </div>
      </div>

      <div>
        <Fab className={classes.plusButton} color="primary" aria-label="add" onClick={handleClick}>
          <AddIcon />
        </Fab>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <Link to="/addRecipe" style={{ textDecoration: 'none', color: 'black' }}><MenuItem onClick={handleClose}>Agregar receta manual</MenuItem></Link>
          <Link to="/chatbot" style={{ textDecoration: 'none', color: 'black' }}><MenuItem onClick={handleClose}>Agregar receta con MarIA</MenuItem></Link>
        </Menu>
      </div>
    </>
  );
};

export default Home;

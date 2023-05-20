import React, { useEffect, useState } from "react";
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ShareIcon from '@material-ui/icons/Share';
const Home = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [socialShareAnchorEl, setSocialShareAnchorEl] = useState(null);


  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await axios.get('http://localhost:3001/chat/AllShareRecipes', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          }
        });
        console.log(response.data);
        setChatHistory(response.data);

        setChatHistory(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchChatHistory();
  }, []);

  //Cada vez que se recarga la pagina, hace escroll hacia abajo para ver el ultimo mensaje.
  useEffect(() => {
    // messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);


  const handleOpenSocialShareMenu = (event) => {
    setSocialShareAnchorEl(event.currentTarget);
  };

  const handleCloseSocialShareMenu = () => {
    setSocialShareAnchorEl(null);
  };

  return (
    <div className="recetas-container">
      <h1>Receta</h1>
      <div>
        {chatHistory && chatHistory.length > 0 ? chatHistory.map((chat, index) => (
          <div key={index}>
            <div div className="card ">
              {chat.image_of_recipe && <img className="responsive-image" src={chat.image_of_recipe} alt="recipe" />}
              <p style={{ whiteSpace: 'pre-wrap' }}> {chat.description}</p>

              <Button
                variant="outlined"
                color="primary"
                onClick={handleOpenSocialShareMenu}
              >
                <i className="fa-solid fa-ellipsis-vertical"></i>
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

        )) : <p>No hay recetas compartidas</p>}
      </div>
    </div>
  );
};

export default Home;
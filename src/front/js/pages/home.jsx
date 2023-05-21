import React, { useEffect, useState } from "react";
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ShareIcon from '@material-ui/icons/Share';

const Home = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [socialShareAnchorEl, setSocialShareAnchorEl] = useState(null);
  const [expandedChatIndex, setExpandedChatIndex] = useState(null);

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

  return (
    <>
      <div className="recetas-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '20PX' }}>

        <div>
          {chatHistory && chatHistory.length > 0 ? [...chatHistory].reverse().map((chat, index) => (
            <div key={index}>
              <div className="card d-none d-xs-block d-sm-block d-md-block" style={{ width: "40rem" }}>
                {chat.image_of_recipe && <img className="responsive-image" src={chat.image_of_recipe} alt="recipe" />}
                <div className="card-body bg bg-dark">
                  <h5 className="card-title text-white">MATEO SANCHEZ</h5>
                  {expandedChatIndex === index ? (
                    <p className="card-text text-warning" style={{ whiteSpace: 'pre-wrap' }}>{chat.description}</p>
                  ) : (
                    <p className="card-text text-warning" style={{ maxHeight: '3em', overflow: 'hidden', textOverflow: 'ellipsis' }}>{chat.description}</p>
                  )}
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
          )) : <p>No hay recetas compartidas</p>}
        </div>
      </div>




      <div className="recetas-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '20PX' }}>

        <div>
          {chatHistory && chatHistory.length > 0 ? chatHistory.map((chat, index) => (
            <div key={index}>
              <div className="card d-xs-none d-sm-none d-md-none" style={{ width: "18rem" }}>
                {chat.image_of_recipe && <img className="responsive-image" src={chat.image_of_recipe} alt="recipe" />}
                <div className="card-body bg bg-dark">
                  <h5 className="card-title text-white">MATEO SANCHEZ</h5>
                  {expandedChatIndex === index ? (
                    <p className="card-text text-warning" style={{ whiteSpace: 'pre-wrap' }}>{chat.description}</p>
                  ) : (
                    <p className="card-text text-warning" style={{ maxHeight: '3em', overflow: 'hidden', textOverflow: 'ellipsis' }}>{chat.description}</p>
                  )}
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
          )) : <p>No hay recetas compartidas</p>}
        </div>
      </div>

    </>
  );
};

export default Home;

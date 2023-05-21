import React, { useEffect, useState } from "react";
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ShareIcon from '@material-ui/icons/Share';
const Home = () => {
  const [recipesChatShared, setRecipesChatShared] = useState([]);
  const [recipesShare, setRecipesShare] = useState([]);
  const [socialShareAnchorEl, setSocialShareAnchorEl] = useState(null);

  //Se trae todas las recetas compartidas por los usuarios en el chat.
  useEffect(() => {
    const fetchRecipesChatShared = async () => {
      try {
        const response = await axios.get('http://localhost:3001/chat/AllShareRecipes', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          }
        });
        console.log(response.data);
        setRecipesChatShared(response.data);

        // setRecipesChatShared(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRecipesChatShared();
  }, []);

  //Se trae todas las recetas manuales compartidas por los usuarios.
  useEffect(() => {
    const fetchRecipesShared = async () => {
      try {
        const response = await axios.get('http://localhost:3001/rrecipe/AllShareRecipesManual', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          }
        });
        console.log(response.data);
        setRecipesShare(response.data);

        // setRecipesShare(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRecipesShared();
  }, []);

  //Cada vez que se recarga la pagina, hace escroll hacia abajo para ver el ultimo mensaje.
  useEffect(() => {
    // messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [recipesChatShared]);

  useEffect(() => {
    // messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [recipesShare]);

  console.log(recipesShare);
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
        {/* {recipesChatShared && recipesChatShared.length > 0 ? recipesChatShared.map((chat, index) => ( */}
        {recipesChatShared && recipesChatShared.length > 0 ? recipesChatShared.map((chat, index) => (
          <div key={index}>
            <div>
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

        {recipesShare && recipesShare.length > 0 ? recipesShare.map((recipe, index) => (
          <div key={index}>
            <div>
              {recipe.image_of_recipe && <img className="responsive-image" src={recipe.image_of_recipe} alt="recipe" />}
              <p style={{ whiteSpace: 'pre-wrap' }}> {recipe.description}</p>

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
                <MenuItem onClick={() => handleSocialShare('Facebook', recipe)}><ShareIcon />Facebook</MenuItem>
                <MenuItem onClick={() => handleSocialShare('Twitter', recipe)}><ShareIcon />Twitter</MenuItem>
                <MenuItem onClick={() => handleSocialShare('WhatsApp', recipe)}><ShareIcon />WhatsApp</MenuItem>
              </Menu>
            </div>
          </div>
        )) : <p>No hay recetas manuales compartidas</p>}
      </div>
    </div>
  );

};


//   return (
//     <div className="recetas-container">
//       <h1>Receta</h1>
//       <div>
//         {recipesChatShared && recipesChatShared.length > 0 ? recipesChatShared.map((chat, index) => (
//           <div key={index}>
//             <div>
//               {chat.image_of_recipe && <img className="responsive-image" src={chat.image_of_recipe} alt="recipe" />}
//               <p style={{ whiteSpace: 'pre-wrap' }}> {chat.description}</p>

//               <Button
//                 variant="outlined"
//                 color="primary"
//                 onClick={handleOpenSocialShareMenu}
//               >
//                 <i className="fa-solid fa-ellipsis-vertical"></i>
//               </Button>
//               <Menu
//                 id="social-share-menu"
//                 anchorEl={socialShareAnchorEl}
//                 keepMounted
//                 open={Boolean(socialShareAnchorEl)}
//                 onClose={handleCloseSocialShareMenu}
//               >
//                 <MenuItem onClick={() => handleSocialShare('Facebook', chat)}><ShareIcon />Facebook</MenuItem>
//                 <MenuItem onClick={() => handleSocialShare('Twitter', chat)}><ShareIcon />Twitter</MenuItem>
//                 <MenuItem onClick={() => handleSocialShare('WhatsApp', chat)}><ShareIcon />WhatsApp</MenuItem>
//               </Menu>
//             </div>
//           </div>

//         )) : <p>No hay recetas compartidas</p>}
//       </div>
//     </div>
//   );
// };

export default Home;
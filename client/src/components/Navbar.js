import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

function Navbar (){
  
  const pathname = window.location.pathname;

  const path = pathname === '/' ? 'home' : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => setActiveItem(name);

    return (
      
        <Menu pointing size="huge" color="grey">
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={handleItemClick}
            as={Link}
            to="/"
          />
          <Menu.Item
            name='login'
            active={activeItem === 'login'}
            onClick={handleItemClick}
            as={Link}
            to="/login"
          />
          <Menu.Item
            name='signup'
            active={activeItem === 'signup'}
            onClick={handleItemClick}
            as={Link}
            to="/signup"
          />
          
          
           <Menu.Menu position='right'>
            <Menu.Item
            name='logout'
            active={activeItem === 'logout'}
            onClick={handleItemClick}
            />

              
          </Menu.Menu> 
        </Menu>
    
    )
  }


export default Navbar;
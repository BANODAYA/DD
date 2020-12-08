import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import './Navbar.css';



import Axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import './Header.css';
import {logoutUser } from "../../../actions/authActions";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";



const useStyles = makeStyles((theme) => ({

  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Navbar() {
  const dispatch = useDispatch();
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [temp, setTemp] = useState();

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {

    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  const openTemp = async() => {
    console.log("open temp")
    Axios({
      method: "GET",
      url: "http://localhost:5000/api/users/rentalCalculator",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      console.log(res.data);
    });
    // const res = await axios.get('http://localhost:5000/api/users/rentalCalulator');
    // console.log(Rc);
  }
 const onLogoutClick = e => {
    e.preventDefault();
    dispatch(logoutUser({}));

}

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  

  return (
    <>
  <AppBar position="static">
  <Toolbar>
    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
      <MenuIcon aria-controls="simple-menu" aria-haspopup="true" onClick={handleClickMenu} ></MenuIcon>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Rental Calculator</MenuItem>
        <MenuItem onClick={handleClose}>Rehab Calculator</MenuItem>
        <MenuItem onClick={handleClose}>Fix N Flip Calculator</MenuItem>
        <MenuItem onClick={handleClose}>Whole Failing Calculator</MenuItem>
      </Menu>
    </IconButton>
    <Typography variant="h6" className={classes.title}>
     Adeborna Rentals
    </Typography>
    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            
            <li className='nav-item'  onClick={handleClick}> 
              <Link
                to='/Rc'
                className='nav-links'
                onClick={openTemp}
              >
                RentalCalculator
              </Link>
            </li>  
             <li className='nav-item'>
              <Link
                to='/cal2'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Rehab Calculator
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/cal3'
                className='nav-links'
                onClick={closeMobileMenu}
              >
               Fix N Flip Calculator
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/cal4'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Whole saling Calculator
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/login'
                className='nav-links'
                onClick={onLogoutClick}
              >
                Log Out
              </Link>
            </li>
          </ul>
  </Toolbar>
  </AppBar>
    </>
  );
}

export default Navbar;



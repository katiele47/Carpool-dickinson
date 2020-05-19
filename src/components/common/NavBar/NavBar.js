import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import {
    BrowserRouter as Router,
    Switch as RouterSwitch,
    Route,
    Redirect,
    Link
  } from "react-router-dom";
// import Account from '../Account/Account';
// import MainChat from '../Chat/MainChat'

import { useDispatch, useSelector } from "react-redux";
import actions from './duck/actions'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: 'white',
    textDecoration: "none"
  },
  appBar:{
      zIndex: 3,
  }
}));

export default function MenuAppBar() {
  const classes = useStyles();
  // const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);


  // const handleChange = (event) => {
  //   setAuth(event.target.checked);
  // };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //states 
  const auth = useSelector(state => state.auth);
  const accountIcon = useSelector(state => state.accountIcon);
  // console.log(auth.getState())
  const dispatch = useDispatch()



  const logOff = () => {
   
    return <Redirect to='/' />
    
  }

  return (
    <div className={classes.root}>
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={auth} onChange={()=>{

            if(auth){
              console.log("true")
              dispatch(actions.logoff())
            }else{
              console.log("here")
              // dispatch(actions.login)
              dispatch(actions.login())
            }
            
          }

          } aria-label="login switch" />}
          label={auth ? 'Logout' : 'Login'}
        />
      </FormGroup>
      <AppBar className={classes.appBar} position="fixed">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>

 

          <Link className={classes.title} to="/">Carpool</Link>
         

          
          <Button component={Link} to="/logIn" edge="start" className={classes.menuButton} color="inherit" aria-label="menu" variant="outlined">Log in</Button>
          <Button component={Link} to="/signUp" edge="start" className={classes.menuButton} color="inherit" aria-label="menu" variant="outlined">Sign up</Button>

          {auth && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              
              
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >

                <MenuItem onClick={handleClose} component={Link} to="/account">Account</MenuItem>
                <MenuItem onClick={handleClose} component={Link} to="/chat">Chat</MenuItem>
                
              </Menu>
            </div>
          )}

          {!auth && logOff()}

        </Toolbar>
      </AppBar>
    </div>
    
    
  );
}

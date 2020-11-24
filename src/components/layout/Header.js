import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import { fade, makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import Fab from '@material-ui/core/Fab';

import DBuzzLogo from '../common/DBuzzLogo';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    color: '#212529'
  },
  toolbarTitle: {
    flex: 1
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },



  navBtnStyle: {
    backgroundColor: '#ffffff',
    boxShadow: 'none',
    borderColor: 'none',
    '&:hover': {
      boxShadow: 'none',
      color: '#e31337',
      backgroundColor: '#ffffff',
    }
  },

  signUpBtn: {
    backgroundColor: '#fff',
    borderColor: '#e61c34',
    color: '#e31337',
    boxShadow: 'none',
    '&:hover': {
      color: '#e31337',
      backgroundColor: '#fff'
    }
  },

  // SEARCH
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },

  fabSubscribe: {
    position: 'fixed',
    bottom: theme.spacing(4),
    right: theme.spacing(2),
    zIndex: 1,
    backgroundColor: '#e31337'
  },

  fabRegister: {
    position: 'fixed',
    bottom: theme.spacing(4),
    right: theme.spacing(10),
    zIndex: 1,
    backgroundColor: '#e31337'
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const { title } = props;

  return (
    <React.Fragment>
      <Hidden smUp>
        <Toolbar 
          className={classes.toolbar}
        >
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon className={classes.signUpBtn} />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>

          
          <Fab 
            className={classes.fabSubscribe} 
            color="secondary" 
          >
            <SubscriptionsIcon />
          </Fab>
          <Fab 
            className={classes.fabRegister} 
            color="secondary" 
          >
            <PermIdentityIcon />
          </Fab>
        </Toolbar>
      </Hidden>
      <Hidden xsDown>
        <Toolbar
          className={classes.toolbar}
        >
          <Button className={classes.signUpBtn} variant="contained" size="medium">Follow</Button>
          <Typography
            component="h2"
            variant="h5"
            color="inherit"
            align="center"
            noWrap
            className={classes.toolbarTitle}
          >
            <DBuzzLogo />
          </Typography>

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon className={classes.signUpBtn}  />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <Button className={classes.signUpBtn} variant="contained" size="medium">Sign up</Button>
        </Toolbar>
      </Hidden>

      <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
        <Grid
          container justify="center" spacing={1}
        >
          <Grid item>
            <Button
              className={classes.navBtnStyle}
            >Posts</Button>
          </Grid>
          <Grid item>
            <Button
              className={classes.navBtnStyle}
            >Proposals</Button>
          </Grid>
          <Grid item>
            <Button
              className={classes.navBtnStyle}
            >Witnesses</Button>
          </Grid>
          <Grid item>
            <Button
              className={classes.navBtnStyle}
            >Our dApps</Button>
          </Grid>
        </Grid>
      </Toolbar>
    </React.Fragment>
  )
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};

export default Header;

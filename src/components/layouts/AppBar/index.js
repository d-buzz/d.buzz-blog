import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import classNames from 'classnames'
import { 
  Avatar,
  BrandIcon, 
  BrandDarkIcon, 
  BackArrowIcon,  
} from 'components/elements'
import { createUseStyles } from 'react-jss'
import { SearchField, LoginModal } from 'components'
import { signupHiveOnboard } from 'services/helper'
import { useLocation, useHistory, Link } from 'react-router-dom'
import { isMobile } from 'react-device-detect'
import { connect } from 'react-redux'
import { 
  Button, 
  Hidden,
  IconButton,
} from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import TrendingUpIcon from '@material-ui/icons/TrendingUp'
import UpdateIcon from '@material-ui/icons/Update'
import SettingsIcon from '@material-ui/icons/Settings'
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount'
import {
  Menu,
  MenuList,
  MenuButton,
  MenuLink,
} from '@reach/menu-button'
import AddIcon from '@material-ui/icons/Add'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { bindActionCreators } from 'redux'
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone'
import { signoutUserRequest } from 'store/auth/actions'
import { useLastLocation } from 'react-router-last-location'
import { pending } from 'redux-saga-thunk'

const useStyles = createUseStyles(theme => ({
  nav: {
    height: 65,
    backgroundColor: theme.nav.background,
    borderBottom: theme.border.primary,
  },
  search: {
    width: '60%',
    paddingLeft: 5,
    marginBottom: 5,
    marginTop: 5,
    backgroundColor: '#e6ecf0',
  },
  backButton: {
    display: 'inline-block',
    ...theme.icon,
  },
  buttons: {
    display: 'inline-block',
    whiteSpace: 'nowrap',
    paddingLeft: 15,
  },
  leftAdjust: {
    marginLeft: 7,
  },
  profileButton: {
    height: 'max-content',
    borderRadius: 50,
    cursor: 'pointer',
    transitionDuration: '0.3s',
    transitionProperty: 'background-color',
    ...theme.nav.profile.wrapper,
  },
  profileUsername: {
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
  },
  avatarWrapper: {
    minHeight: 35,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 5,
  },
  buzzButton: {
    borderRadius: 35,
    margin: 'auto',
    transitionDuration: '0.3s',
    transitionProperty: 'background-color',
    ...theme.nav.buzz.wrapper,
  },
  buzzWrapper: {
    height: 45,
    width: 45,
    padding: 10,
    alignItems: 'center',
  },
  notificationButton: {
    borderRadius: 35,
    margin: 'auto',
    transitionDuration: '0.3s',
    transitionProperty: 'background-color',
    ...theme.nav.notification.wrapper,
  },
  notificationWrapper: {
    height: 45,
    width: 45,
    padding: 10,
    alignItems: 'center',
  },
  menulistWrapper: {
    display: 'block',
    whiteSpace: 'nowrap',
    borderRadius: 5,
    border: 'solid 1px hsla(0, 0%, 0%, 0.25)',
    background: 'hsla(0, 100%, 100%, 0.99)',
    outline: 'none',
    padding: '1rem 0',
    fontSize: '85%',
    cursor: 'pointer',
    '& a': {
      display: 'block',
      color: 'inherit',
      font: 'inherit',
      textDecoration: 'initial',
      padding: '5px 20px',
      '&:hover': {
        backgroundColor: '#f5f8fa',
      },
    },
  },
}))

const AppBar = (props) => {
  const classes = useStyles()
  const lastLocation = useLastLocation()
  const { theme, user, signoutUserRequest, loadingAccount } = props
  const { isAuthenticated } = user
  const { mode } = theme
  const history = useHistory()
  const location = useLocation()
  const { pathname } = location
  const { username } = user

  const minify = false // set value for testing...
  const [open, setOpen] = useState(false)

  const handleClickBackButton = () => {
    if(!lastLocation) {
      history.replace('/')
    } else {
      history.goBack()
    }
  }

  const handleClickOpenLoginModal = () => {
    setOpen(true)
  }

  const handleClickCloseLoginModal = () => {
    setOpen(false)
  }

  const handleSignupOnHive = () => {
    signupHiveOnboard()
  }

  const handleClickLogout = () => {
    signoutUserRequest()
  }
  
  const handleClickBuzz = () => {
    alert('buzz me')
  }

  const handleClickNotification = () => {
    alert('notification')
  }

  const handleClickProfile = () => {
    alert('profile')
  }

  let title = 'Home'

  if(pathname.match(/(\/c\/)/)) {
    title = 'Buzz'
  }

  if(pathname.match(/^\/trending/)) {
    title = 'Trending'
  }

  if(pathname.match(/^\/latest/)) {
    title = 'Latest'
  }

  if(!pathname.match(/(\/c\/)/) && pathname.match(/^\/@/)) {
    title = 'Profile'
  }

  if(pathname.match(/(\/notifications)/)) {
    title = 'Notifications'
  }

  if(pathname.match(/(\/tags?)/)) {
    title = 'Tags'
  }

  if(pathname.match(/(\/search?)/)) {
    title = 'Search'
  }

  useEffect(() => {
    if (!loadingAccount) {
      setOpen(false)
    }
  }, [loadingAccount])

  return (
    <React.Fragment>
      <Navbar fixed="top" className={classes.nav}>
        <Container>
          <Navbar.Brand>
            {title !== 'Home' && title !== 'Trending' && title !== 'Latest' && (
              <React.Fragment>
                <IconButton className={classes.backButton} onClick={handleClickBackButton} size="small">
                  <BackArrowIcon />
                </IconButton>
                &nbsp;
              </React.Fragment>
            )}
            <Link to="/">
              {mode === 'light' && (<BrandIcon height={50} top={-3} />)}
              {(mode === 'darknight' || mode === 'grayscale') && (<BrandDarkIcon height={50} top={-3} />)}
            </Link>
          </Navbar.Brand>
          {!isMobile && (
            <React.Fragment>
              <Hidden only="xs">
                <SearchField className={classes.search} disableTips={true} />
              </Hidden>            
              {isAuthenticated && (
                <React.Fragment>
                  {!minify && (
                    <React.Fragment>
                      <div style={{ display: 'inline-flex' }}>
                        <div className={classes.buzzButton}>
                          <div className={classes.buzzWrapper} onClick={handleClickBuzz}>
                            <AddIcon />
                          </div>
                        </div>
                        &nbsp;
                        <div className={classes.notificationButton}>
                          <div className={classes.notificationWrapper} onClick={handleClickNotification}>
                            <NotificationsNoneIcon />
                          </div>
                        </div>
                        &nbsp;
                        <Menu>
                          <MenuButton
                            className={classNames(classes.profileButton, classes.avatarWrapper)}
                            style={{ display: 'table-cell', width: 'auto', height: '100%', border: 'none' }}
                          >
                            <div style={{ display: 'inline-flex', top: '50%', bottom: '50%' }}>
                              <Avatar author={username} />
                              <h6 className={classes.profileUsername}>@{username}</h6>
                            </div>
                          </MenuButton>
                          <MenuList style={{ width: 'auto' }} className={classes.menulistWrapper}>
                            <MenuLink onSelect={handleClickProfile} style={{ padding: 'auto', '&: hover':{ backgroundColor: 'red' } }}>
                              <div>
                                <Avatar height={40} author={username} style={{ marginBottom: -10 }} />
                                <strong style={{ paddingLeft: 30, marginBottom: 0, fontSize: 15 }}>Profile</strong>
                                <div style={{ marginTop: -15, paddingLeft: 50, paddingBottom: 5 }}>
                                  <span style={{ fontSize: 13 }}>See your Profile</span>
                                </div>
                              </div>
                            </MenuLink>
                            <MenuLink to="/latest"><HomeIcon /><label style={{ paddingLeft: 15, marginBottom: 0, fontSize: 15 }}>Home</label></MenuLink>
                            <MenuLink to="/latest"><TrendingUpIcon /><label style={{ paddingLeft: 15, marginBottom: 0, fontSize: 15 }}>Trending</label></MenuLink>
                            <MenuLink to="/latest"><UpdateIcon /><label style={{ paddingLeft: 15, marginBottom: 0, fontSize: 15 }}>Latest</label></MenuLink>
                            <MenuLink to="/latest"><SettingsIcon /><label style={{ paddingLeft: 15, marginBottom: 0, fontSize: 15 }}>User Settings</label></MenuLink>
                            <MenuLink to="/latest"><SupervisorAccountIcon /><label style={{ paddingLeft: 15, marginBottom: 0, fontSize: 15 }}>Switch Account</label></MenuLink>
                            <MenuLink onSelect={handleClickLogout}> <ExitToAppIcon /><label style={{ paddingLeft: 15, marginBottom: 0, fontSize: 15 }}>Signout</label></MenuLink>
                          </MenuList>
                        </Menu>
                      </div>
                      
                    </React.Fragment>
                  )}
                </React.Fragment>
              )}
              
            </React.Fragment>
          )}
          {!isAuthenticated && (
            <div className={classes.buttons}>
              <Button variant="outlined" color="secondary" onClick={handleClickOpenLoginModal}>
                Sign in
              </Button>
              &nbsp;
              <Button p={1} variant="contained" color="secondary" disableElevation onClick={handleSignupOnHive}>
                Sign up
              </Button>
            </div>
          )}
          
        </Container>
        <LoginModal show={open} onHide={handleClickCloseLoginModal} />
      </Navbar>
    </React.Fragment>
  )
}
const mapStateToProps = (state) => ({
  theme: state.settings.get('theme'),
  user: state.auth.get('user'),
  loadingAccount: pending(state, 'AUTHENTICATE_USER_REQUEST'),
})

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({
    signoutUserRequest,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(AppBar)
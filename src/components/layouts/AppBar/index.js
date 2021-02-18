import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { BrandIcon, 
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
  Avatar,
  Typography,
  Fab,
} from '@material-ui/core'
import { IconButton } from 'components/elements'
import AddIcon from '@material-ui/icons/Add'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { bindActionCreators } from 'redux'
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import { signoutUserRequest } from 'store/auth/actions'

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
}))

const AppBar = (props) => {
  const classes = useStyles()
  const { theme, user, signoutUserRequest } = props
  let { isAuthenticated } = user
  const { mode } = theme
  const history = useHistory()
  const location = useLocation()
  const { pathname } = location
  const { username } = user

  const [open, setOpen] = useState(false)

  const handleClickBackButton = () => {
    history.goBack()
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

  const isActivePath = (path, current) => {
    return path === current
  }

  return (
    <React.Fragment>
      <Navbar fixed="top" className={classes.nav}>
        <Container>
          <Navbar.Brand>
            {pathname === '/' && (
              <React.Fragment>
                <IconButton className={classes.backButton} onClick={handleClickBackButton} size="small">
                  <BackArrowIcon />
                </IconButton>
                &nbsp;
              </React.Fragment>
            )}
            <Link to="/">
              {mode === 'light' && (<BrandIcon height={50} top={-40} />)}
              {(mode === 'darknight' || mode === 'grayscale') && (<BrandDarkIcon height={50} top={-3} />)}
            </Link>
          </Navbar.Brand>
          {!isMobile && (
            <React.Fragment>
              <Hidden only="xs">
                <SearchField className={classes.search} disableTips={true} />
              </Hidden>
              <Nav style={{ marginLeft: 60 }}>
                {isAuthenticated && (
                  <React.Fragment>
                    {/* <div onClick={onClick} >
                    <Link to={path}>
                      <IconWrapper style={{ textAlign: 'right' }} className={iconClass}>{icon}</IconWrapper>
                      {username}
                    </Link>
                    </div> */}
                    
                    <Avatar className={classes.leftAdjust} src={`https://images.hive.blog/u/${username}/avatar/small`} />
                    &nbsp;&nbsp;&nbsp;
                    <Typography variant="subtitle1" style={{ paddingTop: 5 }} className={classes.leftAdjust}>{username}</Typography>
                    &nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;
                    <Fab color="secondary" size="small" aria-label="add" className={classes.leftAdjust}>
                      <AddIcon />
                    </Fab>
                    &nbsp;
                    <Fab color="secondary" size="small" aria-label="add" className={classes.leftAdjust}>
                      <NotificationsNoneIcon />
                    </Fab>
                    &nbsp;
                    <Fab color="secondary" size="small" aria-label="add" className={classes.leftAdjust}>
                      <KeyboardArrowDownIcon />
                    </Fab>
                    &nbsp;
                    <Fab onClick={handleClickLogout} color="secondary" size="small" aria-label="add" className={classes.leftAdjust}>
                      <ExitToAppIcon />
                    </Fab>
                  </React.Fragment>
                )}
              </Nav>
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
})

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({
    signoutUserRequest,
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(AppBar)
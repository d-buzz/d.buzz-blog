import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { BrandIcon, 
  BrandDarkIcon, 
  BackArrowIcon,  
} from 'components/elements'
import IconButton from '@material-ui/core/IconButton'
import { createUseStyles } from 'react-jss'
import { SearchField, LoginModal } from 'components'
import { signupHiveOnboard } from 'services/helper'
import { useLocation, useHistory, Link } from 'react-router-dom'
import { isMobile } from 'react-device-detect'
import { connect } from 'react-redux'
import { Button, Hidden, Toolbar } from '@material-ui/core'

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
}))

const AppBar = (props) => {
  const classes = useStyles()
  const { theme } = props
  const { mode } = theme
  const history = useHistory()
  const location = useLocation()
  const { pathname } = location

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


  return (
    <React.Fragment>
      <Navbar fixed="top" className={classes.nav}>
        <Container>
          <Navbar.Brand>
            {pathname !== '/' && (
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
              <Nav>
                <Hidden only={['xs', 'sm']}>
                  <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
                    
                  </Toolbar>
                </Hidden>
              </Nav>
                
              
            </React.Fragment>
          )}
          
          <div className={classes.buttons}>
            <Button variant="outlined" color="secondary" onClick={handleClickOpenLoginModal}>
              Sign in
            </Button>
            &nbsp;
            <Button p={1} variant="contained" color="secondary" disableElevation onClick={handleSignupOnHive}>
              Sign up
            </Button>
          </div>
        </Container>
        <LoginModal show={open} onHide={handleClickCloseLoginModal} />
      </Navbar>
    </React.Fragment>
  )
}
const mapStateToProps = (state) => ({
  theme: state.settings.get('theme'),
})

export default connect(mapStateToProps)(AppBar)
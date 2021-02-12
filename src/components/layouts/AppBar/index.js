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
import { Button, Hidden } from '@material-ui/core'

const useStyles = createUseStyles(theme => ({
  nav: {
    height: 55,
    backgroundColor: theme.nav.background,
    borderBottom: theme.border.primary,
  },
  search: {
    width: 350,
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: '#e6ecf0',
  },
  container: {
    margin: '0 auto',
    '@media (min-width: 1100px)': {
      '&.container': {
        maxWidth: '1000px',
      },
    },
  },
  backButton: {
    display: 'inline-block',
    ...theme.icon,
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
    console.log('test login')
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
        <Container className={classes.container}>
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
              {mode === 'light' && (<BrandIcon height={30} top={-10} />)}
              {(mode === 'darknight' || mode === 'grayscale') && (<BrandDarkIcon height={30} top={-10} />)}
            </Link>
          </Navbar.Brand>
          {!isMobile && (
            <Nav className="mr-auto">
              <Hidden only="xs">
                <SearchField disableTips={true} />
              </Hidden>
            </Nav>
          )}
          <div>
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
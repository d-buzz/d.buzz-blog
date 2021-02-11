import React, { useState } from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'
import { BrandIcon, BrandDarkIcon, BackArrowIcon, ContainedButton } from 'components/elements'
import IconButton from '@material-ui/core/IconButton'
import { createUseStyles } from 'react-jss'
import { SearchField, LoginModal } from 'components'
import { signupHiveOnboard } from 'services/helper'
import { useLocation, useHistory, Link } from 'react-router-dom'
import { isMobile } from 'react-device-detect'
import { connect } from 'react-redux'

const useStyles = createUseStyles(theme => ({
  nav: {
    height: 55,
    backgroundColor: theme.nav.backgroud,
    borderBottom: theme.border.primary,
  },
  container: {
    margin: '0 auto',
    '@media (min-width: 1100px)': {
      '&.container': {
        maxWidth: '900px',
      },
    },
  },
  backButton: {
    display: 'inline-block',
    ...theme.icon,
  },
  search: {
    width: 350,
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: '#e6ecf0',
  },
  button: {
    width: 100,
    height: 35,
  },
  loginButton: {
    marginTop: 15,
    width: 100,
    height: 35,
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

  const handleSignupComplete = () => {
    signupHiveOnboard()
  }


  return (
    <Navbar fixed="top" className={classes.nav}>
      <Container> className={classes.container}
        <Navbar.Brand>
          {pathname !== 'ug' && (
            <React.Fragment>
              <IconButton className={classes.backButton} onClick={handleClickBackButton} size="small">
                <BackArrowIcon />
              </IconButton>
              &nbsp;
            </React.Fragment>
          )}
          <Link to="/">
            {mode === 'light' && (<BrandIcon height={30} top={-15} />)}
            {(mode === 'night' || mode === 'gray') && (<BrandDarkIcon height={30} top={-15} />)}
          </Link>
        </Navbar.Brand>
        {!isMobile && (
          <Nav className="mr-auto">
            <SearchField disableTips={true} />
          </Nav>
        )}
        <ContainedButton style={{ marginLeft: 5 }} onClick={handleClickOpenLoginModal} transparent={true} fontSize={15} label="Log in" className={classes.button} />
        <ContainedButton style={{ marginLeft: 5 }} onClick={handleSignupComplete} fontSize={15} label="Sign up" className={classes.button} />      
      </Container>
      <LoginModal show={open} onHide={handleClickCloseLoginModal} />
    </Navbar>
  )
}
const mapStateToProps = (state) => ({
  theme: state.settings.get('theme'),
})

export default connect(mapStateToProps)(AppBar)
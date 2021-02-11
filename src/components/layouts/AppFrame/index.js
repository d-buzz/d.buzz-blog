import React, { useState, useEffect } from 'react'
import { AppBar, LoginModal, GuardedAppFrame } from 'components'
import { createUseStyles } from 'react-jss'
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'
import { isMobile } from 'react-device-detect'
import { Container } from 'react-bootstrap'
import { StickyContainer } from 'react-sticky'
import { connect } from 'react-redux'

const useStyles = createUseStyles({
  main: {
    minHeight: '100vh',
    borderLeft: '1px solid #e6ecf0',
    borderRight: '1px solid #e6ecf0',
  },
  inner: {
    width: '98%',
    margin: '0 auto',
  },
  guardedContainer: {
    width: 'max-content',
    '@media (min-width: 1250px)': {
      margin: '0 auto !important',
      '&.container': {
        margin: '0 auto',
        maxWidth: 'max-content',
      },
    },
    '@media (max-width: 768px)': {
      margin: '0 auto !important',
      '&.container': {
        margin: '0 auto',
        minWidth: 'max-content',
      },
    },
  },
  unGuardedContainer: {
    '@media (min-width: 1100px)': {
      margin: '0 auto !important',
      '&.container': {
        maxWidth: '900px',
      },
    },
  },
})

const AppFrame = (props) => {
  const classes = useStyles()
  const { user, route } = props
  const { pathname, search } = useLocation()
  const { isAuthenticated } = user
  const params = queryString.parse(search) || ''
  const referrer = document.referrer
  
  let containerClass = classes.guardedContainer
  const unGuardedRoute = (pathname.match(/^\/login/) || !isAuthenticated)
  
  const [showLogin, setShowLogin] = useState(false)
  const [signUpConfirmation, setSignUpConfirmation] = useState(false)

  if(unGuardedRoute) {
    containerClass = classes.unGuardedContainer
  }

  const checkIfLogin = () => {
    if (!isAuthenticated) {
      setShowLogin(true)
    } else {
      setShowLogin(false)
    }
  }

  const handleClickCloseLoginModal = () => {
    setShowLogin(false)
  }

  useEffect(() => {
    if ((params.status === 'success') && referrer === 'https://hiveonboard.com/') {
      setSignUpConfirmation(true)
      checkIfLogin()
    } else {
      setShowLogin(false)
    }
    // eslint-disable-next-line
  }, [params, pathname]);

  return (
    <React.Fragment>
      {!isAuthenticated && (<AppBar />)}
      {!isMobile && (
        <Container className={containerClass}>
          <StickyContainer>
            {isAuthenticated && (
              <GuardedAppFrame pathname={pathname} route={route} />
            )}
          </StickyContainer>
        </Container>
      )}
      <LoginModal
        show={showLogin}
        onHide={handleClickCloseLoginModal}
        signUpConfirmation={signUpConfirmation}/>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => ({
  user: state.auth.get('user'),
})


export default connect(mapStateToProps)(AppFrame)
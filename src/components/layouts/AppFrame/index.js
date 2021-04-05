import React from 'react'
import { AppBar, GuardedAppFrame, UnguardedAppFrame, ReplyFormModal, NotificationBox } from 'components'
import { createUseStyles } from 'react-jss'
import { useLocation } from 'react-router-dom'
import { isMobile } from 'react-device-detect'
import { Container } from 'react-bootstrap'
import { StickyContainer } from 'react-sticky'
import { connect } from 'react-redux'

const useStyles = createUseStyles({
  main: {
    minHeight: '100vh',
  },
  inner: {
    width: '98%',
    margin: '0 auto',
  },
  guardedContainer: {
    '@media (min-width: 1100px)': {
      margin: '0 auto !important',
      '&.container': {
        maxWidth: '900px',
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
  profileContainer: {
    '@media (min-widht: 1100px': {
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
  const { pathname } = useLocation()
  const { isAuthenticated } = user

  
  let containerClass = classes.guardedContainer
  const unGuardedRoute = (pathname.match(/^\/login/) || !isAuthenticated)
  const profileRoute = (!pathname.match(/(\/c\/)/) && pathname.match(/^\/@/))

  if (unGuardedRoute) {
    containerClass = classes.unGuardedContainer
  } else if (profileRoute) {
    containerClass = classes.profileContainer
  }

  return (
    <React.Fragment>
      {!isMobile && (
        <Container className={containerClass}>
          <AppBar />
          <StickyContainer>
            {isAuthenticated && (
              <GuardedAppFrame pathname={pathname} route={route} />
            )}
            {!isAuthenticated && (
              <UnguardedAppFrame route={route} />
            )}
          </StickyContainer>
        </Container>
      )}
      {isMobile && (
        <center>
          <h1 style={{ paddingTop: 50 }}>
             In Development...
          </h1>
          <br />
          <br />
          <br />
          <img src="https://media.giphy.com/media/xTkcEQACH24SMPxIQg/giphy.gif" alt="" width={200} />
        </center>
      )}
      <ReplyFormModal />
      <NotificationBox />
    </React.Fragment>
  )
}

const mapStateToProps = (state) => ({
  user: state.auth.get('user'),
})


export default connect(mapStateToProps)(AppFrame)
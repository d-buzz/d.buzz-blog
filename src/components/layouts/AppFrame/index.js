import React, { useEffect, useState } from 'react'
import { AppBar, GuardedAppFrame, UnguardedAppFrame, MobileAppFrame, ReplyFormModal, NotificationBox } from 'components'
import { createUseStyles } from 'react-jss'
import { useLocation } from 'react-router-dom'
import { isMobile } from 'react-device-detect'
import { Container } from 'react-bootstrap'
import { StickyContainer } from 'react-sticky'
import { connect } from 'react-redux'
import classNames from 'classnames'

const useStyles = createUseStyles(theme => ({
  main: {
    minHeight: '100vh',
  },
  inner: {
    width: '98%',
    margin: '0 auto',
  },
  container: {
    '@media (min-width: 1100px)': {
      margin: '0 auto !important',
      '&.container': {
        maxWidth: '1100px',
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
  marginLeft0:{
    marginLeft: 0,
  },
  marginRight0:{
    marginRight: 0,
  },
  padding10:{
    padding: '10px',
  },
}))

const AppFrame = (props) => {
  const classes = useStyles()
  const { user, route } = props
  const { pathname } = useLocation()
  const { isAuthenticated } = user
  const [isCreatePostPage, setIsCreatePostPage] = useState(false)

  console.log('isCreatePostPage',isCreatePostPage)
  
  let containerClass = classes.container
  const profileRoute = (!pathname.match(/(\/c\/)/) && pathname.match(/^\/@/))

  if (profileRoute) {
    containerClass = classes.profileContainer
  }

  useEffect(() => {
    if (pathname === '/create-post') {
      setIsCreatePostPage(true)
    }else{
      setIsCreatePostPage(false)
    }
    // eslint-disable-next-line
  }, [pathname])

  return (
    <React.Fragment>
      {!isMobile && (
        <Container className={classNames(containerClass, classes.marginLeft0, classes.marginRight0)}>
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
        <React.Fragment>
          <MobileAppFrame pathname={pathname} route={route} />
        </React.Fragment>
      )}
      {/* <div className={classNames(classes.height150, classes.positionFixed, classes.left0, classes.right0, classes.bottom0, classes.zindex600)}> */}
      {/* {isCreatePostPage && (
        <React.Fragment>
          <div className={classNames('height150 positionFixed left0 right0 bottom0 zindex600')}>
            <div className={classNames('backgroundColorFa displayFlex justContentCenter alignItemsCenter height100', isMobile?'padding10':'')}>
              Select text to change formatting, add headers, or create links.
            </div>
          </div>
        </React.Fragment>
      )} */}
     
      <ReplyFormModal />
      <NotificationBox />
    </React.Fragment>
  )
}

const mapStateToProps = (state) => ({
  user: state.auth.get('user'),
})


export default connect(mapStateToProps)(AppFrame)
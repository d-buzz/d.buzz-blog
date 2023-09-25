import React, { useState, useEffect } from 'react'
import { SideBarRight } from 'components'
import { Sticky } from 'react-sticky'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { createUseStyles } from 'react-jss'
import { renderRoutes } from 'react-router-config'
import { useLocation } from 'react-router-dom'
import { useWindowDimensions } from 'services/helper'
import classNames from 'classnames'

const useStyles = createUseStyles(theme => ({
  main: {
    minHeight: '100vh',
  },
  inner: {
    width: '98%',
    margin: '0 auto',
  },
  nav: {
    borderBottom: '1px solid #e6ecf0',
    borderLeft: '1px solid #e6ecf0',
    borderRight: '1px solid #e6ecf0',
    backgroundColor: 'white',
    zIndex: 2,
    overflow: 'hidden',
    width: '100%',
  },
  trendingWrapper: {
    width: '100%',
    minHeight: '100vh',
    border: '1px solid #e6ecf0',
  },
  clearPadding: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  marginLeft0:{
    marginLeft: 0,
  },
  marginRight0:{
    marginRight: 0,
  },
  displayFlex:{
    display: 'flex',
  },
  justifyContentCenter:{
    justifyContent: 'center'
  },
  alignItemsCenter:{
    alignItems: 'center',
  },
  minWidth100:{
    minWidth: '100%',
  },
  borderLeft1grey:{
    borderLeft: '1px solid #F2F2F2',
  },
}))

const UnguardedAppFrame = (props) => {
  const { route } = props
  const classes = useStyles()
  const location = useLocation()
  const { pathname } = location
  const [mainWidth, setMainWidth] = useState(8)
  const [hideRightSideBar, setHideRightSideBar] = useState(false)
  const { width } = useWindowDimensions()
  let isProfileRoute = false
  let isContentRoute = false
  const [isCreatePostPage, setIsCreatePostPage] = useState(false)

  if (!pathname.match(/(\/c\/)/) && pathname.match(/^\/@/)) {
    isProfileRoute = true
  } else if (pathname.match(/(\/c\/)/) && pathname.match(/^\/@/)) {
    isContentRoute = true
  }

  useEffect(() => {
    if (pathname === '/create-post') {
      setHideRightSideBar(true)
      setIsCreatePostPage(true)
    }
  },[pathname])

  useEffect(() => {
    if (width < 800) {
      setMainWidth(12)
      setHideRightSideBar(true)
    } else {
      setMainWidth(8)
      if (pathname === '/create-post') {
        setHideRightSideBar(true)
        setIsCreatePostPage(true)
      }else{
        setHideRightSideBar(false)
      }
    }
  }, [width, pathname])

  return (
    <React.Fragment>
      <Row className={classNames(isCreatePostPage?classes.displayFlex:'', isCreatePostPage?classes.justifyContentCenter:'', isCreatePostPage?classes.alignItemsCenter:'')}>
        {!isProfileRoute && !isContentRoute && (
          <React.Fragment>
            <Col xs={mainWidth} className={classes.clearPadding}>
              <div style={{ paddingTop: 60, marginTop: 20 }} className={classes.main}>
                <React.Fragment>
                  {renderRoutes(route.routes)}
                </React.Fragment>
              </div>
            </Col>
            {!hideRightSideBar && (
              <Col className={classes.borderLeft1grey}  xs={4}>
                <Sticky>
                  {({ style }) => (
                    <div style={{ ...style, paddingTop: 60 }}>
                      <SideBarRight hideSearchBar={true} />
                    </div>
                  )}
                </Sticky>
              </Col>
            )}
          </React.Fragment>
        )}
        {isProfileRoute && (
          <Col className={classes.clearPadding}>
            <div style={{ paddingTop: 60, marginTop: 20 }} className={classes.main}>
              <React.Fragment>
                {renderRoutes(route.routes)}
              </React.Fragment>
            </div>
          </Col>
        )}
        {isContentRoute && (
          <Col className={classes.clearPadding}>
            <div style={{ paddingTop: 60, marginTop: 20 }} className={classes.main}>
              <React.Fragment>
                {renderRoutes(route.routes)}
              </React.Fragment>
            </div>
          </Col>
        )}
      </Row>
      
    </React.Fragment>
  )
}

export default UnguardedAppFrame
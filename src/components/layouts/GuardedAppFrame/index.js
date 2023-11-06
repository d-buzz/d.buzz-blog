import React, { useState, useEffect } from 'react'
import { SideBarRight } from 'components'
import { Sticky } from 'react-sticky'
import { createUseStyles } from 'react-jss'
import { renderRoutes } from 'react-router-config'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useWindowDimensions } from 'services/helper'
import { useLocation } from 'react-router-dom'
import Tabs from '../../common/Tabs'
import classNames from 'classnames'

const useStyles = createUseStyles(theme => ({
  main: {
    minHeight: '100vh',
  },
  marginTop60:{
    marginTop: "60px",
  },
  marginTop100:{
    marginTop: "100px",
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
}))

const GuardedAppFrame = (props) => {
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
  const [isSearchPage, setIsSearchPage] = useState(false)

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
    if (pathname === '/search/people') {
      setIsSearchPage(true)
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

      if (pathname === '/search/people') {
        setIsSearchPage(true)
      }else{
        setIsSearchPage(false)
      }
    }
  }, [width, pathname])

  const [isTop, setIstop] = useState(true)

  const handleScroll = () => {
    const scrollPosition = window.scrollY // => scroll position
    if (scrollPosition <= 50) {
      setIstop(true)
    }else{
      setIstop(false)
    }
    // console.log(scrollPosition);
  }
  useEffect(() => {
    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <React.Fragment>
      <Row>
        {!isProfileRoute && !isContentRoute && (
          <React.Fragment>
            <Col xs={mainWidth} className={classes.clearPadding}>
              {!isCreatePostPage && !isSearchPage && (<Tabs/>)}
              <div  className={classNames(classes.main, pathname === '/create-post'? classes.marginTop100:classes.marginTop60)}>
                <React.Fragment>
                 
                  {renderRoutes(route.routes)}
                </React.Fragment>
              </div>
            </Col>
            {!hideRightSideBar && (
              <Col xs={3}>
                <Sticky>
                  {({ style }) => (
                    <div style={{ ...style, paddingTop: isTop?"60px":"0px" }}>
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

export default GuardedAppFrame
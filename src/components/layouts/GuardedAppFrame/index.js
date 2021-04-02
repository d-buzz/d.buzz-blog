import React, { useState, useEffect } from 'react'
import { SideBarRight } from 'components'
import { Sticky } from 'react-sticky'
import { createUseStyles } from 'react-jss'
import { renderRoutes } from 'react-router-config'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useWindowDimensions } from 'services/helper'
import { useLocation } from 'react-router-dom'

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

  if (!pathname.match(/(\/c\/)/) && pathname.match(/^\/@/)) {
    isProfileRoute = true
  } else if (pathname.match(/(\/c\/)/) && pathname.match(/^\/@/)) {
    isContentRoute = true
  }

  useEffect(() => {
    if (width < 800) {
      setMainWidth(12)
      setHideRightSideBar(true)
    } else {
      setMainWidth(8)
      setHideRightSideBar(false)
    }
  }, [width])

  return (
    <React.Fragment>
      <Row>
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
              <Col xs={4}>
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


export default GuardedAppFrame
import React, { useEffect, useState } from 'react'
import { createUseStyles } from 'react-jss'
import { Preloader, BrandIcon } from 'components/elements'
import { getBestRpcNode, checkVersionRequest } from 'store/settings/actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getTrendingTagsRequest } from 'store/posts/actions'
import { getSavedUserRequest } from 'store/auth/actions'

const useStyles = createUseStyles({
  wrapper: {
    width: '100%',
    height: '100vh',
    backgroundColor: 'white',
  },
})

const SplashScreen = () => {
  const classes = useStyles()

  return (
    <div className={classes.wrapper}>
      <div style={{ width: 200, height: 200, position: 'absolute', margin: 'auto', top: 0, left: 0, right: 0, bottom:0 }}>
        <Preloader />
      </div>
      <BrandIcon style={{
        position: 'absolute',
        margin: 'auto',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}/>
    </div>
  )
}

const Init = (props) => {
  const { 
    getTrendingTagsRequest,
    getBestRpcNode,
    getSavedUserRequest,
    children } = props

  const [init, setInit] = useState(false)

  useEffect(() => {
    setInit(true)
    getBestRpcNode().then(() => {
      getTrendingTagsRequest()
      getSavedUserRequest().then(() => {
        setInit(true)
      })
    })
  
    /** 
     * Check Version will be implemented
     * - if it will be on production mode
     * - if blog.d.buzz is already hosted
     *  
     * checkVersionRequest().then((isLatest) => {
     * if (!isLatest) {
     *  window.history.forward(1)
     *  window.location.reload(true)
     *  } else {
     *    getBestRpcNode().then(() => {
     *      getTrendingTagsRequest()
  *         getSavedUserRequest().then(() => {
     *        setInit(true)
     *      })
     *    })
     *  }
     * })
     */
    // eslint-disable-next-line
  }, [])

  return (
    <React.Fragment>
      {!init && (<SplashScreen />)}
      {init && (children)}
    </React.Fragment>
  )
}

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({
    getBestRpcNode,
    getSavedUserRequest,
    getTrendingTagsRequest,
    checkVersionRequest,
  }, dispatch),
})

export default connect(null, mapDispatchToProps)(Init)
import React, { useEffect, useState } from 'react'
import { createUseStyles } from 'react-jss'
import { Preloader, BrandIcon } from 'components/elements'
import { getBestRpcNode } from 'store/settings/actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

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
      <div style={{ width: 200, height: 200 }}>
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
  const { children } = props

  const [init, setInit] = useState(false)

  useEffect(() => {
    //note: should add the checkversionrequest()
    getBestRpcNode().then(() => {
      setInit(true)
      // getTrendingTagsRequest()
      // getSavedUserRequest().then(() => {
      //   setInit(true)
      // })
    })
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
  }, dispatch),
})

export default connect(null, mapDispatchToProps)(Init)
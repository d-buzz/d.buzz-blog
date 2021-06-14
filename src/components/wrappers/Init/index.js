import React, { useEffect, useState } from 'react'
import { createUseStyles } from 'react-jss'
import { Preloader, BrandIcon } from 'components/elements'
import { getBestRpcNode, checkVersionRequest } from 'store/settings/actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getTrendingTagsRequest } from 'store/posts/actions'
import { getSavedUserRequest } from 'store/auth/actions'
import { readSession } from '../../../services/helper'

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
      <div style={{ width: 250, height: 250, position: 'absolute', margin: 'auto', top: 0, left: 0, right: 0, bottom:0 }}>
        <Preloader />
      </div>
      <BrandIcon height={55}style={{
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

  let accounts = window.localStorage.getItem('user')
  
  accounts = JSON.parse(accounts)
    
  if (accounts !== null) {
    accounts.forEach((account) => {
      try{
        const decrypt = readSession(account)
        console.log(decrypt)
      } catch (e) {
        console.log(e)
        window.localStorage.clear()
      }
    })
  } 

  useEffect(() => {
    getBestRpcNode().then(() => {
      getTrendingTagsRequest()
      getSavedUserRequest().then(() => {
        setInit(true)
      })
    })
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
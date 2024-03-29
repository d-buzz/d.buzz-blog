import React from 'react'
import { connect } from 'react-redux'
import { useLocation, Redirect } from 'react-router-dom'

const AuthGuard = (props) => {
  const { children, user, fromLanding } = props
  const { isAuthenticated } = user
  const location = useLocation()
  const { pathname } = location

  // const isGuardedRoute = () => {
  //   return pathname.match(/^(\/latest)/g) || pathname.match(/^(\/trending)/g)
  // }
  const isGuardedRoute = () => {
    return pathname.match(/^(\/following)/g)
  }
  
  return (
    <React.Fragment>
      {pathname && (
        <React.Fragment>
          {isAuthenticated && fromLanding && (
            <Redirect to={{ pathname: '/latest' }} />
          )}
          {!isAuthenticated && isGuardedRoute() && (
            <Redirect to={{ pathname: '/' }} />
          )}
          {children}
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

const mapStateToProps = (state) => ({
  user: state.auth.get('user'),
  fromLanding: state.auth.get('fromLanding'),
})

export default connect(mapStateToProps)(AuthGuard)
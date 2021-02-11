import React from 'react'
import { connect } from 'react-redux'

const Home = (props) => {
  const { user } = props
  const { isAuthenticated } = user

  return (
    <div>
      {isAuthenticated && (<h1>FEEDS</h1>)}
      {!isAuthenticated && (<h2> Landing</h2>)}
    </div>
  )
}

const mapStateToProps = (state) => ({
  user: state.auth.get('user'),
})

export default connect(mapStateToProps)(Home)
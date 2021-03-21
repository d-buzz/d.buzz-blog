import React from 'react'
import { connect } from 'react-redux'
import { Feeds, Landing } from 'components'

const Home = (props) => {
  const { user } = props
  const { isAuthenticated } = user

  return (
    <div>
      {isAuthenticated && <Feeds />}
      {!isAuthenticated && <Landing />}
    </div>
  )
}

const mapStateToProps = (state) => ({
  user: state.auth.get('user'),
})

export default connect(mapStateToProps)(Home)
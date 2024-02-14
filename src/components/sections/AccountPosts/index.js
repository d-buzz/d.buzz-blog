import React, { useCallback } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { pending } from 'redux-saga-thunk'
import { InfiniteList } from 'components'
import { getAccountPostRequest } from 'store/profile/actions'

const AccountPosts = (props) => {
  const {
    items = [],
    loading,
    getAccountPostRequest,
    author,
    last,
    user,
    // mutelist,
  } = props

  const loadMorePosts =  useCallback(() => {
    try {
      const { permlink, author: start_author } = last
      getAccountPostRequest(author, permlink, start_author)
    } catch(e) { }
    // eslint-disable-next-line
  }, [last])
  return (
    <React.Fragment>
      <React.Fragment>
        <InfiniteList disableOpacity={true} loading={loading} items={items} onScroll={loadMorePosts} unguardedLinks={!user.isAuthenticated}/>
        {(!loading && items.length === 0) &&
        (<center><br/><h6>No Post from @{author}</h6></center>)}
      </React.Fragment>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => ({
  items: state.profile.get('post'),
  loading: pending(state, 'GET_ACCOUNT_POSTS_REQUEST'),
  last: state.profile.get('last_post'),
  user: state.auth.get('user'),
  mutelist: state.auth.get('mutelist'),
})

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({
    getAccountPostRequest,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountPosts)

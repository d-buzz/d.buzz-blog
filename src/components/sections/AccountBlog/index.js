import React, { useCallback } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { pending } from 'redux-saga-thunk'
import { InfiniteList } from 'components'
import { getAccountBlogRequest } from 'store/profile/actions'

const AccountBlog = (props) => {
  const {
    items = [],
    loading,
    getAccountBlogRequest,
    author,
    last,
    user,
    // mutelist,
  } = props

  const loadMorePosts =  useCallback(() => {
    try {
      const { permlink, author: start_author } = last
      getAccountBlogRequest(author, permlink, start_author)
    } catch(e) { }
    // eslint-disable-next-line
  }, [last])

  return (
    <React.Fragment>
      {/* {!muted && ( */}
      <React.Fragment>
        <InfiniteList disableOpacity={true} loading={loading} items={items} onScroll={loadMorePosts} unguardedLinks={!user.isAuthenticated}/>
        {(!loading && items.length === 0) &&
        (<center><br/><h6>No Blog from @{author}</h6></center>)}
      </React.Fragment>
      {/* )} */}
      {/* {muted && <center><br /><h6>This user is on your mutelist, unmute this user to view their buzzes</h6></center>} */}
    </React.Fragment>
  )
}

const mapStateToProps = (state) => ({
  items: state.profile.get('blog'),
  loading: pending(state, 'GET_ACCOUNT_POSTS_REQUEST'),
  last: state.profile.get('last'),
  user: state.auth.get('user'),
  mutelist: state.auth.get('mutelist'),
})

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({
    getAccountBlogRequest,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountBlog)

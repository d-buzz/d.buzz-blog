import React, { useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  getForsalePostsRequest,
  setForsaleIsVisited,
  setHomeIsVisited,
  setTrendingIsVisited,
  clearHomePosts,
  clearTrendingPosts,
  clearTagsPost,
  setTagsIsVisited,
  setPageFrom,
  clearLastSearchTag,
  clearSearchPosts,
  clearAppendReply,
  clearReplies,
} from 'store/posts/actions'
import {
  setProfileIsVisited,
  clearAccountBlog,
  clearAccountReplies,
} from 'store/profile/actions'
import { pending } from 'redux-saga-thunk'
import { anchorTop } from 'services/helper'
import { InfiniteList, HelmetGenerator } from 'components'
import { clearScrollIndex } from 'store/interfaces/actions'

const Forsale = (props) => {
  const {
    getForsalePostsRequest,
    setForsaleIsVisited,
    isVisited,
    setHomeIsVisited,
    setTrendingIsVisited,
    clearHomePosts,
    clearTrendingPosts,
    setProfileIsVisited,
    clearAccountBlog,
    clearAccountReplies,
    items,
    last,
    loading,
    clearTagsPost,
    setTagsIsVisited,
    setPageFrom,
    clearLastSearchTag,
    clearSearchPosts,
    clearAppendReply,
    clearReplies,
    clearScrollIndex,
  } = props

  useEffect(() => {
    setPageFrom('hive')
    if(!isVisited) {
      anchorTop()
      clearHomePosts()
      clearScrollIndex()
      clearTrendingPosts()
      setForsaleIsVisited()
      getForsalePostsRequest()
      setHomeIsVisited(false)
      setTrendingIsVisited(false)
    }
    clearAppendReply()
    clearSearchPosts()
    clearLastSearchTag()
    clearAccountBlog()
    clearAccountReplies()
    clearTagsPost()
    clearReplies()
    setTagsIsVisited(false)
    setProfileIsVisited(false)
    //eslint-disable-next-line
  }, [])


  const loadMorePosts =  useCallback(() => {
    const { permlink, author } = last
    getForsalePostsRequest(permlink, author)
    // eslint-disable-next-line
  }, [last])

  return (
    <React.Fragment>
      <HelmetGenerator page='Forsale' />
      <InfiniteList loading={loading} items={items} onScroll={loadMorePosts}/>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => ({
  loading: pending(state, 'GET_FORSALE_POSTS_REQUEST'),
  items: state.posts.get('forsale'),
  isVisited: state.posts.get('isForsaleVisited'),
  last: state.posts.get('lastForsale'),
  mutelist: state.auth.get('mutelist'),
})

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({
    getForsalePostsRequest,
    setForsaleIsVisited,
    setHomeIsVisited,
    setTrendingIsVisited,
    clearHomePosts,
    clearTrendingPosts,
    setProfileIsVisited,
    clearAccountBlog,
    clearAccountReplies,
    clearTagsPost,
    setTagsIsVisited,
    setPageFrom,
    clearLastSearchTag,
    clearSearchPosts,
    clearAppendReply,
    clearReplies,
    clearScrollIndex,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Forsale)

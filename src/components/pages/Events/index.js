import React, { useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  getEventsPostsRequest,
  setEventsIsVisited,
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

const Events = (props) => {
  const {
    getEventsPostsRequest,
    setEventsIsVisited,
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
      setEventsIsVisited()
      getEventsPostsRequest()
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
    getEventsPostsRequest(permlink, author)
    // eslint-disable-next-line
  }, [last])

  return (
    <React.Fragment>
      <HelmetGenerator page='Events' />
      <InfiniteList loading={loading} items={items} onScroll={loadMorePosts}/>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => ({
  loading: pending(state, 'GET_EVENTS_POSTS_REQUEST'),
  items: state.posts.get('events'),
  isVisited: state.posts.get('isEventsVisited'),
  last: state.posts.get('lastEvents'),
  mutelist: state.auth.get('mutelist'),
})

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({
    getEventsPostsRequest,
    setEventsIsVisited,
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

export default connect(mapStateToProps, mapDispatchToProps)(Events)

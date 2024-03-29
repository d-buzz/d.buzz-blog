import React, { useEffect, useCallback } from 'react'
import { pending } from 'redux-saga-thunk'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  getTrendingPostsRequest,
  setTrendingIsVisited,
  setHomeIsVisited,
  setLatestIsVisited,
  clearHomePosts,
  clearLatestPosts,
  clearTagsPost,
  setTagsIsVisited,
  setPageFrom,
  clearLastSearchTag,
  clearSearchPosts,
} from 'store/posts/actions'
import {
  setProfileIsVisited,
  clearAccountBlog,
  clearAccountReplies,
} from 'store/profile/actions'
import { anchorTop } from 'services/helper'
import { InfiniteList, HelmetGenerator } from 'components'
import { clearScrollIndex } from 'store/interfaces/actions'

const Trending = (props) => {
  const {
    isVisited,
    loading,
    items,
    last,
    unguardedLinks,
    getTrendingPostsRequest,
    setTrendingIsVisited,
    setHomeIsVisited,
    clearHomePosts,
    clearLatestPosts,
    setLatestIsVisited,
    setProfileIsVisited,
    clearAccountBlog,
    clearAccountReplies,
    clearTagsPost,
    setTagsIsVisited,
    setPageFrom,
    clearLastSearchTag,
    clearSearchPosts,
    clearScrollIndex,
  } = props

  useEffect(() => {
    setPageFrom('trending')
    if (!isVisited) {
      anchorTop()
      clearScrollIndex()
      clearHomePosts()
      clearLatestPosts()
      getTrendingPostsRequest()
      setTrendingIsVisited()
      setHomeIsVisited(false)
      setLatestIsVisited(false)
    }
    clearSearchPosts()
    clearLastSearchTag()
    clearAccountBlog()
    clearAccountReplies()
    clearTagsPost()
    setTagsIsVisited(false)
    setProfileIsVisited(false)
  // eslint-disable-next-line
  }, [])

  const loadMorePosts =  useCallback(() => {
    const { permlink, author } = last
    getTrendingPostsRequest(permlink, author)
    // eslint-disable-next-line
  }, [last])

  return (
    <React.Fragment>
      <HelmetGenerator page='Trending' />
      <InfiniteList unguardedLinks={unguardedLinks} loading={loading} items={items} onScroll={loadMorePosts} />
    </React.Fragment>
  )
}

const mapStateToProps = (state) => ({
  loading: pending(state, 'GET_TRENDING_POSTS_REQUEST'),
  isVisited: state.posts.get('isTrendingVisited'),
  items: state.posts.get('trending'),
  last: state.posts.get('lastTrending'),
  mutelist: state.auth.get('mutelist'),
})

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({
    getTrendingPostsRequest,
    setTrendingIsVisited,
    setHomeIsVisited,
    clearHomePosts,
    setLatestIsVisited,
    clearLatestPosts,
    setProfileIsVisited,
    clearAccountBlog,
    clearAccountReplies,
    clearTagsPost,
    setTagsIsVisited,
    setPageFrom,
    clearLastSearchTag,
    clearSearchPosts,
    clearScrollIndex,
  },dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Trending)

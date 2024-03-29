import React, { useEffect } from 'react'
import { Trending, HelmetGenerator } from 'components'
import { createUseStyles } from 'react-jss'
import {
  clearSearchPosts,
  clearLastSearchTag,
  clearTrendingPosts,
  clearLatestPosts,
  clearTagsPost,
  clearHomePosts,
  setHomeIsVisited,
  setTrendingIsVisited,
  setLatestIsVisited,
  setTagsIsVisited,
  clearAppendReply,
  clearReplies,
} from 'store/posts/actions'
import {
  clearAccountBlog,
  clearAccountReplies,
} from 'store/profile/actions'
import { setFromLanding } from 'store/auth/actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const useStyles = createUseStyles(theme => ({
  title: {
    marginLeft: 10,
    ...theme.font,
  },
  trendingWrapper: {
    width: '100%',
    marginTop: 20,
    minHeight: '100vh',
  },
  headerWrapper: {
    width: '98%',
    margin: '0 auto',
  },
}))

const Landing = (props) => {
  const classes = useStyles()
  const {
    clearSearchPosts,
    clearLastSearchTag,
    clearTrendingPosts,
    clearLatestPosts,
    clearTagsPost,
    clearHomePosts,
    setHomeIsVisited,
    setTrendingIsVisited,
    setLatestIsVisited,
    setTagsIsVisited,
    clearAccountBlog,
    clearAccountReplies,
    clearAppendReply,
    clearReplies,
    setFromLanding,
  } = props

  useEffect(() => {
    clearAppendReply()
    clearSearchPosts()
    clearLastSearchTag()
    clearTrendingPosts()
    clearLatestPosts()
    clearTagsPost()
    clearHomePosts()
    clearAccountBlog()
    clearAccountReplies()
    clearReplies()
    setHomeIsVisited(false)
    setTrendingIsVisited(false)
    setLatestIsVisited(false)
    setTagsIsVisited(false)
    setFromLanding(true)
    // eslint-disable-next-line
  }, [])
  
  return (
    <React.Fragment>
      <div className={classes.trendingWrapper}>
        <HelmetGenerator page='Home' />
        <Trending unguardedLinks={true} />
      </div>
    </React.Fragment>
  )
}

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({
    clearSearchPosts,
    clearLastSearchTag,
    clearTrendingPosts,
    clearLatestPosts,
    clearTagsPost,
    clearHomePosts,
    setHomeIsVisited,
    setTrendingIsVisited,
    setLatestIsVisited,
    setTagsIsVisited,
    clearAccountBlog,
    clearAccountReplies,
    clearAppendReply,
    clearReplies,
    setFromLanding,
  }, dispatch),
})

export default connect(null, mapDispatchToProps)(Landing)
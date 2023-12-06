import React, { useState, useEffect } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { ProfileSkeleton, HelmetGenerator } from 'components'
import { Avatar } from 'components/elements'
import { useLocation, useHistory } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import Chip from '@material-ui/core/Chip'
import classNames from 'classnames'
import { createUseStyles } from 'react-jss'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  getProfileRequest,
  getAccountBlogRequest,
  setProfileIsVisited,
  getAccountRepliesRequest,
  getAccountCommentsRequest,
  clearAccountBlog,
  clearAccountReplies,
  getFollowersRequest,
  clearProfile,
  getFollowingRequest,
  clearAccountFollowers,
  clearAccountFollowing,
  clearAccountComments,
} from 'store/profile/actions'
import {
  followRequest,
  unfollowRequest,
  setPageFrom,
} from 'store/posts/actions'
import queryString from 'query-string'
import { anchorTop } from 'services/helper'
import { clearScrollIndex, broadcastNotification, openMuteDialog } from 'store/interfaces/actions'
import { pending } from 'redux-saga-thunk'
import { useWindowDimensions } from 'services/helper'
import { isMobile } from 'react-device-detect'

const useStyles = createUseStyles(theme => ({
  cover: {
    height: 280,
    width: '100%',
    overFlow: 'hidden',
    '& img': {
      borderRadius: '5px 5px 0 0',
      height: '100%',
      width: '100%',
      objectFit: 'cover',
      overFlow: 'hidden',
    },
  },
  wrapper: {
    margin: '0 auto',
    height: 'max-content',
    borderRadius: '5px', 
    paddingBottom: 15,
    backgroundColor: theme.background.secondary,
  },
  mobileWrapper: {
    margin: '0 auto',
    height: 'max-content',
    borderRadius: '5px', 
    paddingBottom: 15,
    textAlign: 'center',
    backgroundColor: theme.background.secondary,
  },
  avatar: {
    marginTop: -90,
  },
  tabContainer: {
    '& span.MuiTabs-indicator': {
      backgroundColor: '#e53935 !important',
    },
  },
  paragraph: {
    padding: 0,
    margin: 0,
    fontSize: 14,
    ...theme.font,
  },
  weblink: {
    wordWrap: 'break-word',
    // color: '#d32f2f',
    '&:hover': {
      // color: '#d32f2f',
    },
  },
  fullName: {
    fontSize: '18px !important',
    fontWeight: 'bold',
    padding: 0,
    fontFamily: 'Segoe-Bold !important',
    ...theme.font,
  },
}))


const Profile = (props) => {
  const classes = useStyles()
  const history = useHistory()
  const location = useLocation()
  const { width } = useWindowDimensions()
  const [mainWidth, setMainWidth] = useState(400)
  const { pathname } = location
  const {
    match, 
    route,
    // user,
    loading,
    profile,
    getProfileRequest,
    setPageFrom, 
    isVisited,
    clearProfile,
    clearAccountBlog,
    clearAccountReplies,
    clearAccountFollowers,
    clearAccountFollowing,
    clearAccountComments,
    setProfileIsVisited,
    getAccountBlogRequest, 
    getAccountCommentsRequest,
    getAccountRepliesRequest,
  } = props

  useEffect(() => {
    if (width <= 360 ) {
      setMainWidth(340)
    } else if (width <= 390) {
      setMainWidth(370)
    } else {
      setMainWidth(400)
    }
  }, [width])

  useEffect(() => {
    console.log(profile)
  }, [profile])
  
  // const { username: loginuser, isAuthenticated } = user
  
  const [index, setIndex] = useState(0)
  // const [hasRecentlyFollowed, setHasRecentlyFollowed] = useState(false)
  // const [hasRecentlyUnfollowed, setHasRecentlyUnfollowed] = useState(false)


  const onChange = (e, index) => {
    setIndex(index)
  }

  const handleTabs = (index) => () => {
    let tab = 'blog'

    if(index === 1) {
      tab = 'comments'
    } else if (index === 2) {
      tab = 'replies'
    }

    history.push(`/@${username}/t/${tab}/`)
  }

  const { params } = match
  const { username } = params

  useEffect(() => {
    setPageFrom(null)
    const params = queryString.parse(location.search)

    if (!isVisited || (params.ref && (params.ref === 'replies' || params.ref === 'nav')) || username) {
      anchorTop()
      clearScrollIndex()
      clearProfile()
      clearAccountBlog()
      clearAccountReplies()
      clearAccountFollowers()
      clearAccountFollowing()
      clearAccountComments()
      setProfileIsVisited()
      getProfileRequest(username)
      getAccountBlogRequest(username)
      getAccountCommentsRequest(username)
      getAccountRepliesRequest(username)
      getFollowersRequest(username)
      getFollowingRequest(username)
    }
    // eslint-disable-next-line
  }, [username])

  useEffect(() => {
    if(pathname.match(/(\/t\/blog\/)$|(\/t\/blog)$/m)) {
      setIndex(0)
    } else if(pathname.match(/(\/t\/comments\/)$|(\/t\/comments)$/m)) {
      setIndex(1)
    } else if(pathname.match(/(\/t\/replies\/)$|(\/t\/replies)$/m)) {
      setIndex(2)
    } else {
      setIndex(0)
    }
  }, [pathname])

  const { metadata, stats, hivepower } = profile || ''
  const { profile: profileMeta } = metadata || ''
  const { name, cover_image, website, about } = profileMeta || ''
  const { followers, following } = stats || 0

  const { 
    reputation = 0, 
    // isFollowed 
  } = profile

  // const followUser = () => {
  //   followRequest(username).then((result) => {
  //     if(result) {
  //       broadcastNotification('success', `Successfully followed @${username}`)
  //       setHasRecentlyFollowed(true)
  //       setHasRecentlyUnfollowed(false)
  //     } else {
  //       broadcastNotification('error', `Failed following @${username}`)
  //     }
  //   })
  // }

  // const unfollowUser = () => {
  //   unfollowRequest(username).then((result) => {
  //     if(result) {
  //       broadcastNotification('success', `Successfully Unfollowed @${username}`)
  //       setHasRecentlyFollowed(false)
  //       setHasRecentlyUnfollowed(true)
  //     } else {
  //       broadcastNotification('error', `Failed Unfollowing @${username}`)
  //     }
  //   })
  // }

  return (
    <React.Fragment>
      <HelmetGenerator page='Profile' />
      <Container>
        <ProfileSkeleton loading={loading} />
        {!loading && (
          <React.Fragment>
            {isMobile && (
              <React.Fragment>
                <Row className={classes.mobileWrapper} >
                  <div style={{ width: mainWidth }}>
                    <div className={classes.cover}>
                      {cover_image !== '' && (<img src={`https://images.hive.blog/0x0/${cover_image}`} alt="cover"/>)}
                    </div>
                    <Col>
                      <div className={classes.avatar}>
                        <Avatar border={true} height="140" author={username} size="medium" />
                      </div>
                      <Col xs="auto" style={{ paddingTop: 10 }}>
                        <p className={classNames(classes.paragraph, classes.fullName)}>
                          {name || username}&nbsp;
                          <Chip component="span"  size="small" label={`${reputation} Rep`} />&nbsp;
                          <Chip component="span"  size="small" label={`${parseFloat(hivepower).toFixed(2)} HP`} />
                        </p>
                      </Col>
                      <Row>
                        <Col xs="auto">
                          <p className={classes.paragraph}>
                            {about}
                          </p>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs="auto">
                          <p className={classes.paragraph}>
                            <a href={website} target="_blank" rel="noopener noreferrer" className={classes.weblink}>
                              {website}
                            </a>
                          </p>
                        </Col>
                      </Row>
                      <Row style={{ paddingTop: 10, paddingLeft: '30%' }}>
                        <Col xs="auto">
                          <p className={classes.paragraph}>
                            {/* <Link className={classes.followLinks} to={`/@${username}/follow/following`}> */}
                            <b>{following}</b> Following
                            {/* </Link>  */}
                            &nbsp;
                            {/* <Link className={classes.followLinks} to={`/@${username}/follow/followers`}> */}
                            <b>{followers}</b> Follower
                            {/* </Link>  */}
                            &nbsp;
                          </p>
                        </Col>
                      </Row>
                      <br />
                      <Tabs
                        value={index}
                        centered
                        onChange={onChange}
                        className={classes.tabContainer}
                      >
                        <Tab disableTouchRipple onClick={handleTabs(0)} className={classes.tabs} label="Blog" />
                        <Tab disableTouchRipple onClick={handleTabs(1)} className={classes.tabs} label="Comments" />
                        <Tab disableTouchRipple onClick={handleTabs(2)} className={classes.tabs} label="Replies" />
                      </Tabs>
                    </Col> 
                  </div> 
                </Row>  
              </React.Fragment>
            )}
            {!isMobile && (
              <React.Fragment>
                <Row className={classes.wrapper}>

                  <div className={classes.cover}>
                    {cover_image !== '' && (<img src={`https://images.hive.blog/0x0/${cover_image}`} alt="cover"/>)}
                  </div>
                  <Col>
                    <div className={classes.avatar}>
                      <Avatar border={true} height="140" author={username} size="medium" />
                    </div>
                    <Col xs="auto">
                      <p className={classNames(classes.paragraph, classes.fullName)}>
                        {name || username}&nbsp;
                        <Chip component="span"  size="small" label={`${reputation} Rep`} />&nbsp;
                        <Chip component="span"  size="small" label={`${parseFloat(hivepower).toFixed(2)} HP`} />
                      </p>
                    </Col>
                    <Row>
                      <Col xs="auto">
                        <p className={classes.paragraph}>
                          {about}
                        </p>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="auto">
                        <p className={classes.paragraph}>
                          <a href={website} target="_blank" rel="noopener noreferrer" className={classes.weblink}>
                            {website}
                          </a>
                        </p>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="auto">
                        <p className={classes.paragraph}>
                          {/* <Link className={classes.followLinks} to={`/@${username}/follow/following`}> */}
                          <b>{following}</b> Following
                          {/* </Link>  */}
                          &nbsp;
                          {/* <Link className={classes.followLinks} to={`/@${username}/follow/followers`}> */}
                          <b>{followers}</b> Follower
                          {/* </Link>  */}
                          &nbsp;
                        </p>
                      </Col>
                    </Row>
                    <br />
                    <Tabs
                      value={index}
                      centered
                      onChange={onChange}
                      className={classes.tabContainer}
                    >
                      <Tab disableTouchRipple onClick={handleTabs(0)} className={classes.tabs} label="Blog" />
                      <Tab disableTouchRipple onClick={handleTabs(1)} className={classes.tabs} label="Comments" />
                      <Tab disableTouchRipple onClick={handleTabs(2)} className={classes.tabs} label="Replies" />
                    </Tabs>
                  </Col>
                </Row>
              </React.Fragment>
            )}
            <Row>
              <Col sm={2} />
              <Col sm={8} xs="true" style={{ marginTop: '1%'}}>
                <React.Fragment>
                  {renderRoutes(route.routes, { author: username })}
                </React.Fragment>
              </Col>
              <Col sm={2} />
            </Row>
          </React.Fragment>
        )}
      </Container>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => ({
  user: state.auth.get('user'),
  loading: pending(state, 'GET_PROFILE_REQUEST'),
  profile: state.profile.get('profile'),
  isVisited: state.profile.get('isProfileVisited'),
})

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({
    getProfileRequest,
    getAccountBlogRequest,
    setProfileIsVisited,
    getAccountRepliesRequest,
    clearAccountBlog,
    getFollowersRequest,
    clearProfile,
    clearAccountReplies,
    getFollowingRequest,
    clearAccountFollowers,
    clearAccountFollowing,
    setPageFrom,
    followRequest,
    unfollowRequest,
    broadcastNotification,
    clearScrollIndex,
    openMuteDialog,
    getAccountCommentsRequest,
    clearAccountComments,
  }, dispatch),
})
export default connect(mapStateToProps, mapDispatchToProps)(Profile)
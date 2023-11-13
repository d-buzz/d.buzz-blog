import React, { useState, useEffect } from 'react'
import { bindActionCreators } from 'redux'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useLastLocation } from 'react-router-last-location'
// import CreateIcon from '@material-ui/icons/Create'
import { pending } from 'redux-saga-thunk'
import queryString from 'query-string'
import { searchRequest, clearSearchPosts, publishPostRequest } from 'store/posts/actions'
import HomeIcon from '@material-ui/icons/Home'
import TrendingUpIcon from '@material-ui/icons/TrendingUp'
import UpdateIcon from '@material-ui/icons/Update'
import SettingsIcon from '@material-ui/icons/Settings'
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount'
import Badge from '@material-ui/core/Badge'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone'
import { pollNotifRequest } from 'store/polling/actions'
import { signupHiveOnboard } from 'services/helper'
import { signoutUserRequest } from 'store/auth/actions'
import { 
  Avatar,
  WriteIcon,
  BrandIcon, 
  BrandDarkIcon, 
  BackArrowIcon,  
  SearchIcon,
} from 'components/elements'
import {
  Menu,
  MenuList,
  MenuButton,
  MenuLink,
} from '@reach/menu-button'
import { SearchField, LoginModal, BuzzFormModal, UserSettingModal, SwitchAccountModal } from 'components'
import { 
  Button, 
  IconButton,
} from '@material-ui/core'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import { createUseStyles } from 'react-jss'
import { renderRoutes } from 'react-router-config'
import { useLocation, useHistory, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { isMobile } from 'react-device-detect'
import { useWindowDimensions } from 'services/helper'

const useStyles = createUseStyles(theme => ({
  main: {
    minHeight: '100vh',
    margin: '0 auto',
  },
  mobileNav: {
    height: 55,
    backgroundColor: theme.nav.background,
    borderBottom: theme.border.primary,
  },
  backButton: {
    display: 'inline-block',
    ...theme.icon,
  },
  clearPadding: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  menulistWrapper: {
    display: 'block',
    whiteSpace: 'nowrap',
    borderRadius: 5,
    background: 'hsla(0, 100%, 100%, 0.99)',
    outline: 'none',
    padding: '1rem 0',
    fontSize: '85%',
    cursor: 'pointer',
    '& a': {
      display: 'block',
      color: 'inherit',
      font: 'inherit',
      textDecoration: 'initial',
      padding: '5px 20px',
      '&:hover': {
        backgroundColor: '#f5f8fa',
      },
    },
  },
}))

const MobileAppFrame = (props) => {
  const { 
    route, 
    theme,
    user,
    signoutUserRequest,
    loadingAccount, 
    pollNotifRequest, 
    searchRequest,
    postContent,
    publishPostRequest,
    clearSearchPosts,
    count = 0,
  } = props
  const { width } = useWindowDimensions()
  const { username, isAuthenticated } = user
  const { mode } = theme
  const lastLocation = useLastLocation()
  const history = useHistory()
  const classes = useStyles()
  const location = useLocation()
  const { pathname } = location
  const params = queryString.parse(location.search) || ''
  const query = params.q === undefined ? '' : params.q
  const [open, setOpen] = useState(false)
  const [openBuzzModal, setOpenBuzzModal] = useState(false)
  const [openSwitchAccountModal, setOpenSwitchAccountModal] = useState(false)
  const [openUserSettingsModal, setOpenUserSettingsModal] = useState(false)
  const [disableSearchTips, setDisableSearchTips] = useState(false)
  const [searchkey, setSearchkey] = useState(query)
  const [mainWidth, setMainWidth] = useState(400)
  let isProfileRoute = false
  let isContentRoute = false
  const [posting, setPosting] = useState(false)

  useEffect(() => {
  },[postContent])

  const postNow = () => {
    setPosting(true)
    const buzzTitle = postContent.title
    const buzzContent = postContent.content
    const tags = postContent.tags
    const payout = postContent.payout
    const buzzPermlink = postContent.buzzPermlink
    publishPostRequest(buzzTitle,buzzContent, tags, payout, buzzPermlink)
      .then((data) => {
        if (data.success) {
          const {author, permlink} = data
          // if (!isThread) {
          history.push(`/@${author}/c/${permlink}`)
          // }
          setPosting(false)

        } else {
          console.log('error')
          setPosting(false)
        }
      })
  }


  useEffect(() => {
    if (width <= 360 ) {
      setMainWidth(340)
    } else if (width <= 390) {
      setMainWidth(370)
    } else {
      setMainWidth(400)
    }
  }, [width])

  const handleClickOpenBuzzModal = () => {
    history.replace('/create-post')
    // window.location.replace('/#/create-post')
  }

  const handleClickCloseBuzzModal = () => {
    setOpenBuzzModal(false)
  }

  const handleClickBackButton = () => {
    if(!lastLocation) {
      history.replace('/')
    } else {
      history.goBack()
    }
  }

  const handleClickSearchButton = () => {
    history.push(`/search/posts?q=`)
  }

  const handleSearchKey = (e) => {
    if(e.key === 'Enter') {
      clearSearchPosts()
      searchRequest(searchkey)
      setDisableSearchTips(true)
      history.push(`/search/posts?q=${encodeURIComponent(searchkey)}`)
    }
  }

  const onChangeSearch = (e) => {
    const { target } = e
    const { value } = target
    setSearchkey(value)
  }

  const handleClickOpenUserSettingsModal = () => {
    setOpenUserSettingsModal(true)
  }

  const handleClickCloseUserSettingsModal = () => {
    setOpenUserSettingsModal(false)
  }

  const handleClickOpenSwitchAccountModal = () => {
    setOpenSwitchAccountModal(true)
  }

  const handleClickCloseSwitchAccountModal = () => {
    setOpenSwitchAccountModal(false)
  }

  const handleClickLogout = () => {
    signoutUserRequest()
  }

  const handleClickOpenLoginModal = () => {
    setOpen(true)
  }

  const handleClickCloseLoginModal = () => {
    setOpen(false)
  }

  const handleSignupOnHive = () => {
    signupHiveOnboard()
  }

  useEffect(() => {
    if (!loadingAccount) {
      setOpen(false)
    }
  }, [loadingAccount])

  useEffect(() => {
    pollNotifRequest()
    // eslint-disable-next-line
  }, [])

  if (!pathname.match(/(\/c\/)/) && pathname.match(/^\/@/)) {
    isProfileRoute = true
  } else if (pathname.match(/(\/c\/)/) && pathname.match(/^\/@/)) {
    isContentRoute = true
  }

  let title = 'Home'

  if(pathname.match(/(\/c\/)/)) {
    title = 'Buzz'
  }

  if(pathname.match(/^\/trending/)) {
    title = 'Trending'
  }

  if(pathname.match(/^\/latest/)) {
    title = 'Latest'
  }

  if(!pathname.match(/(\/c\/)/) && pathname.match(/^\/@/)) {
    title = 'Profile'
  }

  if(pathname.match(/(\/notifications)/)) {
    title = 'Notifications'
  }

  if(pathname.match(/(\/tags?)/)) {
    title = 'Tags'
  }

  if(pathname.match(/(\/search?)/)) {
    title = 'Search'
  }
  
  return (
    <React.Fragment>
      {isMobile && (
        <React.Fragment>
          <div style={{ width: mainWidth }}>
            <Navbar fixed="top" className={classes.mobileNav}>
              <Container>
                <Navbar.Brand>
                  {title !== 'Home' && title !== 'Trending' && title !== 'Latest' && (
                    <React.Fragment>
                      <IconButton className={classes.backButton} onClick={handleClickBackButton} size="small">
                        <BackArrowIcon />
                      </IconButton>
                      &nbsp;
                    </React.Fragment>
                  )}
                  <Link to="/">
                    <React.Fragment>
                      {mode === 'light' && (<BrandIcon height={40} top={-3} />)}
                      {(mode === 'darknight' || mode === 'grayscale') && (<BrandDarkIcon height={40} top={-3} />)}
                    </React.Fragment>
                  </Link>
                </Navbar.Brand>
                <div>
                  {title !== 'Search' && isAuthenticated && (
                    <React.Fragment>
                      <IconButton size="medium" aria-label="write" onClick={handleClickOpenBuzzModal}>
                        {pathname !== '/create-post' && (
                          <WriteIcon size={25} />
                        )}
                        {pathname === '/create-post' && (
                          <button onClick={postNow} disabled={postContent.content || posting?false:true}  className='btn btn-success' md>{posting?'Posting':'Post'}</button>
                        )}
                      </IconButton>
                      <IconButton onClick={handleClickSearchButton} size="medium">
                        <SearchIcon/>
                      </IconButton>
                    </React.Fragment>
                  )}
                  <Menu>
                    {title === 'Search' && isAuthenticated && (
                      <div className={classes.searchDiv}>
                        <SearchField
                          disableTips={disableSearchTips}
                          iconTop={-2}
                          searchWrapperClass={classes.searchWrapper}
                          style={{ fontSize: 16, height: 35 }}
                          value={searchkey}
                          onKeyDown={handleSearchKey}
                          onChange={onChangeSearch}
                          placeholder="Search Posts"
                          autoFocus
                        />
                      </div>
                    )}
                    {title !== 'Search' && isAuthenticated && (
                      <React.Fragment>
                        <MenuButton style={{ border: 'none', backgroundColor: 'transparent' }}>
                          <Avatar height={33} author={username} />
                        </MenuButton>
                        <MenuList style={{ width: 'auto' }} className={classes.menulistWrapper}>
                          <MenuLink  
                            style={{ padding: 'auto', '&: hover':{ backgroundColor: 'red' } }}
                            as={Link}
                            to={`/@${username}`}
                          >
                            <div>
                              <Avatar height={40} author={username} style={{ marginBottom: -10 }} />
                              <strong style={{ paddingLeft: 30, marginBottom: 0, fontSize: 15 }}>Profile</strong>
                              <div style={{ marginTop: -15, paddingLeft: 50, paddingBottom: 5 }}>
                                <span style={{ fontSize: 13 }}>See your Profile</span>
                              </div>
                            </div>
                          </MenuLink>
                          <MenuLink
                            as={Link}
                            to="/"
                          >
                            <HomeIcon /><label style={{ paddingLeft: 15, marginBottom: 0, fontSize: 15 }}>Home</label>
                          </MenuLink>
                          <MenuLink 
                            as={Link}
                            to="/trending"
                          >
                            <TrendingUpIcon /><label style={{ paddingLeft: 15, marginBottom: 0, fontSize: 15 }}>Trending</label>
                          </MenuLink>
                          <MenuLink 
                            as={Link}
                            to="/latest"
                          >
                            <UpdateIcon /><label style={{ paddingLeft: 15, marginBottom: 0, fontSize: 15 }}>Latest</label>
                          </MenuLink>
                          <MenuLink 
                            as={Link}
                            to="/notifications"
                          >
                            <Badge badgeContent={count.unread || 0} color="secondary"><NotificationsNoneIcon classes={{ root: classes.root }} /></Badge>
                            <label style={{ paddingLeft: 15, marginBottom: 0, fontSize: 15 }}>Notifications</label>
                          </MenuLink>
                          <MenuLink 
                            onSelect={handleClickOpenUserSettingsModal}
                          >
                            <SettingsIcon /><label style={{ paddingLeft: 15, marginBottom: 0, fontSize: 15 }}>User Settings</label>
                          </MenuLink>
                          <MenuLink 
                            onSelect={handleClickOpenSwitchAccountModal}
                          >
                            <SupervisorAccountIcon /><label style={{ paddingLeft: 15, marginBottom: 0, fontSize: 15 }}>Switch Account</label>
                          </MenuLink>
                          <MenuLink 
                            onSelect={handleClickLogout}
                          > 
                            <ExitToAppIcon /><label style={{ paddingLeft: 15, marginBottom: 0, fontSize: 15 }}>Signout</label>
                          </MenuLink>
                        </MenuList>
                      </React.Fragment>
                    )}
                    
                  </Menu>
                </div>
                {!isAuthenticated && (
                  <div className={classes.buttons}>
                    <Button variant="outlined" color="secondary" onClick={handleClickOpenLoginModal}>
                      Sign in
                    </Button>
                    &nbsp;
                    <Button p={1} variant="contained" color="secondary" disableElevation onClick={handleSignupOnHive}>
                      Sign up
                    </Button>
                  </div>
                )}
              </Container>
              <BuzzFormModal show={openBuzzModal} onHide={handleClickCloseBuzzModal} />
              <LoginModal show={open} onHide={handleClickCloseLoginModal} />
              <BuzzFormModal show={openBuzzModal} onHide={handleClickCloseBuzzModal} />
              <UserSettingModal show={openUserSettingsModal} onHide={handleClickCloseUserSettingsModal} />
              <SwitchAccountModal show={openSwitchAccountModal} onHide={handleClickCloseSwitchAccountModal} />
            </Navbar>
          
            <Row>
              {!isProfileRoute && !isContentRoute && (
                <Col className={classes.clearPadding}>
                  <div style={{ paddingTop: 60, marginTop: 20, paddingLeft: 10, backgroundColor: 'white', borderRadius: 5, marginBottom: 15 }} className={classes.main}>
                    <React.Fragment>
                      {renderRoutes(route.routes)}
                    </React.Fragment>
                  </div>
                </Col>
              )}
              {isProfileRoute && (
                <Col className={classes.clearPadding}>
                  <div style={{ paddingTop: 60, marginTop: 20, paddingLeft: 10, backgroundColor: 'white', borderRadius: 5, marginBottom: 15 }} className={classes.main}>
                    <React.Fragment>
                      {renderRoutes(route.routes)}
                    </React.Fragment>
                  </div>
                </Col>
              )}
              {isContentRoute && (
                <Col className={classes.clearPadding}>
                  <div style={{ paddingTop: 60, marginTop: 20 }} className={classes.main}>
                    <React.Fragment>
                      {renderRoutes(route.routes)}
                    </React.Fragment>
                  </div>
        
                </Col>
              )}
            </Row>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

const mapStateToProps = (state) => ({
  theme: state.settings.get('theme'),
  user: state.auth.get('user'),
  count: state.polling.get('count'),
  postContent: state.posts.get('postContent'),
  loadingAccount: pending(state, 'AUTHENTICATE_USER_REQUEST'),
})

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({
    signoutUserRequest,
    pollNotifRequest, 
    publishPostRequest,
    searchRequest,
    clearSearchPosts,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps) (MobileAppFrame)
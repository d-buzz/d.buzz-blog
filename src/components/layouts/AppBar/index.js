import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Badge from '@material-ui/core/Badge'
import classNames from 'classnames'
import CreateIcon from '@material-ui/icons/Create'
import queryString from 'query-string'
import { 
  Avatar,
  BrandIcon, 
  BrandDarkIcon, 
  BackArrowIcon,  
  SearchIcon,
} from 'components/elements'
import { createUseStyles } from 'react-jss'
import { SearchField, LoginModal, BuzzFormModal, UserSettingModal, SwitchAccountModal } from 'components'
import { signupHiveOnboard } from 'services/helper'
import { useLocation, useHistory, Link } from 'react-router-dom'
import { isMobile } from 'react-device-detect'
import { connect } from 'react-redux'
import { 
  Button, 
  Hidden,
  IconButton,
} from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import TrendingUpIcon from '@material-ui/icons/TrendingUp'
import UpdateIcon from '@material-ui/icons/Update'
import SettingsIcon from '@material-ui/icons/Settings'
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount'
import {
  Menu,
  MenuList,
  MenuButton,
  MenuLink,
} from '@reach/menu-button'
// import AddIcon from '@material-ui/icons/Add'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { bindActionCreators } from 'redux'
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone'
import { signoutUserRequest } from 'store/auth/actions'
import { useLastLocation } from 'react-router-last-location'
import { pending } from 'redux-saga-thunk'
import { pollNotifRequest } from 'store/polling/actions'
import { searchRequest, clearSearchPosts, publishPostRequest } from '../../../store/posts/actions'
import { WriteIcon } from 'components/elements'
const useStyles = createUseStyles(theme => ({
  nav: {
    height: 65,
    backgroundColor: theme.nav.background,
    borderBottom: theme.border.primary,
  },
  mobileNav: {
    height: 55,
    backgroundColor: theme.nav.background,
    borderBottom: theme.border.primary,
  },
  search: {
    width: '60%',
    paddingLeft: 5,
    marginBottom: 5,
    marginTop: 5,
    backgroundColor: '#e6ecf0',
  },
  search2: {
    width: '60%',
    paddingLeft: 5,
    marginBottom: 5,
    marginTop: 5,
    backgroundColor: '#F9F9F9',
  },
  box2:{
    border: '1px solid #F9F9F9',
    borderRadius: 20,
  },
  backButton: {
    display: 'inline-block',
    ...theme.icon,
  },
  buttons: {
    display: 'inline-block',
    whiteSpace: 'nowrap',
    paddingLeft: 15,
  },
  leftAdjust: {
    marginLeft: 7,
  },
  profileButton: {
    height: 'max-content',
    borderRadius: 50,
    cursor: 'pointer',
    transitionDuration: '0.3s',
    transitionProperty: 'background-color',
    ...theme.nav.profile.wrapper,
    backgroundColor: 'white !important',
  },
  profileUsername: {
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
  },
  avatarWrapper: {
    minHeight: 35,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 5,
  },
  mobileProfileAvatar: {
    display: 'table-cell', 
    width: 'auto', 
    height: '100%', 
    border: 'none',
  },
  buzzButton: {
    borderRadius: 35,
    margin: 'auto',
    transitionDuration: '0.3s',
    transitionProperty: 'background-color',
    cursor: 'pointer',
    ...theme.nav.buzz.wrapper,
  },
  buzzWrapper: {
    height: 45,
    width: 45,
    padding: 10,
    alignItems: 'center',
  },
  notificationButton: {
    borderRadius: 35,
    border: 'none',
    margin: 'auto',
    transitionDuration: '0.3s',
    transitionProperty: 'background-color',
    ...theme.nav.notification.wrapper,
    backgroundColor: 'white !important',
  },
  notificationWrapper: {
    height: 45,
    width: 45,
    padding: 10,
    alignItems: 'center',
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
  marginLeft0:{
    marginLeft: 0,
  },
  marginRight0:{
    marginRight: 0,
  },
  displayFlex:{
    display: 'flex',
  },
  justifyContentCenter:{
    justifyContent: 'center',
  },
  alignItemsCenter:{
    alignItems: 'center',
  },
  minWidth100:{
    minWidth: '100%',
  },
  root: {
    fill: 'black !important',
  },
  textWhite:{
    color: 'white',
  },
  textBlack:{
    color: 'black',
  },
  transitionOpacity:{
    transition: 'opacity 0.5s',
  },
  opacity0:{
    opacity: 0,
  },
  opacity1:{
    opacity: 1,
  },
  width60:{
    width: "60px",
  },
  marginRight10:{
    marginRight:'10px',
  },
  padding0:{
    padding: 0,
  },
}))

const AppBar = (props) => {
  const classes = useStyles()
  const lastLocation = useLastLocation()
  const { 
    theme, 
    user, 
    signoutUserRequest, 
    loadingAccount, 
    pollNotifRequest, 
    searchRequest,
    clearSearchPosts,
    publishPostRequest,
    postContent,
    count = 0,
    images,
  } = props
  const { isAuthenticated } = user
  const { mode } = theme
  const history = useHistory()
  const location = useLocation()
  const { pathname } = location
  const { username } = user
  const params = queryString.parse(location.search) || ''
  const query = params.q === undefined ? '' : params.q
  const [isCreatePostPage, setIsCreatePostPage] = useState(false)
  const minify = false // set value for testing...
  const [open, setOpen] = useState(false)
  const [openBuzzModal, setOpenBuzzModal] = useState(false)
  const [openUserSettingsModal, setOpenUserSettingsModal] = useState(false)
  const [openSwitchAccountModal, setOpenSwitchAccountModal] = useState(false)
  const [disableSearchTips, setDisableSearchTips] = useState(false)
  const [posting, setPosting] = useState(false)
  const [searchkey, setSearchkey] = useState(query)
  
  let navbarContainer = classes.nav

  if (isMobile) {
    navbarContainer = classes.mobileNav
  }


  const [tagError, settagError] = useState(false)

  useEffect(() => {
    let tagspec = false
    if (postContent.tags) {
      postContent.tags.map((tagCheck) => {
        // console.log('tag update', tag)
        // var format = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
        // var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        var format = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/
  
        if(format.test(tagCheck) ){
          tagspec = true
        }

        return true
  
      })
     
      if (tagspec) {
        settagError(true)
      }else{
        settagError(false)
      }

    }
   
  },[postContent,tagError])
  useEffect(() => {
    pollNotifRequest()
    if (pathname === '/create-post') {
      setIsCreatePostPage(true)
    }
    // eslint-disable-next-line
  }, [])

  const handleClickBackButton = () => {
    if(!lastLocation) {
      history.replace('/')
    } else {
      history.goBack()
    }
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

  const handleClickLogout = () => {
    signoutUserRequest()
  }

  const handleClickOpenBuzzModal = () => {
    setOpenBuzzModal(true)
  }
  
  const handleClickCloseBuzzModal = () => {
    setOpenBuzzModal(false)
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

  useEffect(() => {
    if (!loadingAccount) {
      setOpen(false)
    }
  }, [loadingAccount])

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
  const [isTop, setIstop] = useState(true)

  const handleScroll = () => {
    const scrollPosition = window.scrollY // => scroll position
    if (scrollPosition <= 50) {
      setIstop(true)
    }else{
      setIstop(false)
    }
    // console.log(scrollPosition);
  }
  useEffect(() => {
    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])
  const extractAllHashtags = (value) => {
    let hashtags = value.match(/(?![^()]*\))(?![^[\]]*])#([\w\d!@%^&*)(+=._-]+)/gi)

    if (hashtags === null) {
      hashtags = []
    } else {
      hashtags = hashtags.map((item) => item.replace("#", '').toLowerCase())
    }

    return hashtags
  }
  const postNow =  async () => {
    setPosting(true)
    const buzzTitle = postContent.title
    let buzzContent = postContent.content 
    buzzContent = images.length >= 1 ? buzzContent + '\n' + images.toString().replace(/,/gi, ' ') : buzzContent
    const payout = postContent.payout
    const buzzPermlink = postContent.buzzPermlink
    const tagsfromcontent = await extractAllHashtags(postContent.content)
    const tags = [...postContent.tags, ...tagsfromcontent]
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
  },[images])

  return (
    <React.Fragment>
      <Navbar fixed="top" className={classNames(navbarContainer, isTop?classes.opacity1:classes.opacity0, classes.transitionOpacity)}>
        <Container className={classNames(!isCreatePostPage?classes.marginLeft0:'', !isCreatePostPage?classes.marginRight0:'', !isCreatePostPage?classes.minWidth100:'')}>
          <div className={classNames(classes.displayFlex, classes.justifyContentCenter, classes.alignItemsCenter)}>
            <Navbar.Brand>
              {title !== 'Home' && title !== 'Trending' && title !== 'Latest' && (
                <React.Fragment>
                  <IconButton className={classes.backButton} onClick={handleClickBackButton} size="small">
                    <BackArrowIcon />
                  </IconButton>
                  &nbsp;
                </React.Fragment>
              )}
              <a href="/">
                {!isMobile && (
                  <React.Fragment>
                    {mode === 'light' && (<BrandIcon height={30} top={-3} />)}
                    {(mode === 'darknight' || mode === 'grayscale') && (<BrandDarkIcon height={30} top={-3} />)}
                  </React.Fragment>
                )}
                {isMobile && (
                  <React.Fragment>
                    {mode === 'light' && (<BrandIcon height={30} top={-3} />)}
                    {(mode === 'darknight' || mode === 'grayscale') && (<BrandDarkIcon height={30} top={-3} />)}
                  </React.Fragment>
                )}
              </a>
            </Navbar.Brand>
            <Hidden only="xs">
              <SearchField className={classNames(classes.search2, classes.box2)} disableTips={true} />
            </Hidden>   
          </div>
          
          {!isMobile && (
            <React.Fragment>
                      
              {isAuthenticated && (
                <React.Fragment>
                  {!minify && (
                    <React.Fragment>
                      <div style={{ display: 'inline-flex', width:pathname === '/create-post'?'200px':'220px' }}>
                        {/* &nbsp;
                        <div className={classes.buzzButton}>
                          <div className={classes.buzzWrapper} onClick={handleClickOpenBuzzModal}>
                            <AddIcon />
                          </div>
                        </div> */}
                        <div className={classNames(classes.notificationButton, classes.notificationWrapper, pathname === '/create-post'?classes.width60:'', pathname === '/create-post' || posting?classes.marginRight10:classes.marginRight10, pathname === '/create-post'?classes.padding0:'')}>

                          {pathname === '/create-post' && (
                            <Menu>
                              <button onClick={postNow} disabled={!tagError && (postContent.title || postContent.content || posting)?false:true} className='btn btn-success'>{posting?'Posting':'Post'}</button>
                            </Menu>
                          )}
                          {pathname !== '/create-post' && (
                            <Menu>
                              <MenuLink 
                                as={Link}
                                to="/create-post"
                              >
                                <div style={{display:'flex', justifyContent:'space-evenly', alignItems:'center', width:'75px'}}>
                                  <WriteIcon size={17}/>
                                  <label style={{margin:'0'}} className={classes.textBlack}>Write</label>
                                </div>
                                
                                {/* <Badge badgeContent={count.unread || 0} color="secondary"><NotificationsNoneIcon classes={{ root: classes.root }} /></Badge> */}
                              </MenuLink>
                            </Menu>
                          )}
                        </div>
                        
                        <div className={classNames(classes.notificationButton, classes.notificationWrapper)}>
                          <Menu>
                            <MenuLink 
                              as={Link}
                              to="/notifications"
                            >
                              <Badge badgeContent={count.unread || 0} color="secondary"><NotificationsNoneIcon classes={{ root: classes.root }} /></Badge>
                            </MenuLink>
                          </Menu>
                        </div>
                        
                        {/* will be added on beta~release
                        <Menu>
                          <MenuButton
                            className={classNames(classes.notificationButton, classes.notificationWrapper)}
                          >
                            <NotificationsNoneIcon />
                          </MenuButton>
                          <MenuList className={classes.menulistWrapper}>
                            <MenuLink>Notifications 1</MenuLink>
                            <MenuLink>Notifications 2</MenuLink>
                            <MenuLink>Notifications 3</MenuLink>
                            <MenuLink>Notifications 4</MenuLink>
                          </MenuList>
                        </Menu> */}
                        <Menu>
                          <MenuButton
                            className={classNames(classes.profileButton, classes.avatarWrapper)}
                            style={{ display: 'table-cell', width: 'auto', height: '100%', border: 'none' }}
                          >
                            <div style={{ display: 'inline-flex', top: '50%', bottom: '50%' }}>
                              <Avatar author={username} />
                              {/* <h6 className={classes.profileUsername}>@{username}</h6> */}
                            </div>
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
                        </Menu>
                      </div>
                      
                    </React.Fragment>
                  )}
                </React.Fragment>
              )}
              
            </React.Fragment>
          )}
          {isMobile && isAuthenticated && (
            <div>
              {title !== 'Search' && (
                <React.Fragment>
                  <IconButton size="medium" aria-label="write" onClick={handleClickOpenBuzzModal}>
                    <CreateIcon fontSize="medium" />
                  </IconButton>
                  <IconButton onClick={handleClickSearchButton} size="medium">
                    <SearchIcon/>
                  </IconButton>
                </React.Fragment>
              )}
              <Menu>
                {title === 'Search' && (
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
                {title !== 'Search' && (
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
              
          )}
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
        
        <LoginModal show={open} onHide={handleClickCloseLoginModal} />
        <BuzzFormModal show={openBuzzModal} onHide={handleClickCloseBuzzModal} />
        <UserSettingModal show={openUserSettingsModal} onHide={handleClickCloseUserSettingsModal} />
        <SwitchAccountModal show={openSwitchAccountModal} onHide={handleClickCloseSwitchAccountModal} />
      </Navbar>
    </React.Fragment>
  )
}
const mapStateToProps = (state) => ({
  theme: state.settings.get('theme'),
  user: state.auth.get('user'),
  postContent: state.posts.get('postContent'),
  count: state.polling.get('count'),
  loadingAccount: pending(state, 'AUTHENTICATE_USER_REQUEST'),
  images: state.posts.get('images'),
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

export default connect(mapStateToProps, mapDispatchToProps)(AppBar)
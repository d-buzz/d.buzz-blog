// import React, { useState, useEffect } from 'react'
// import { SideBarLeft, SideBarRight, SearchField } from 'components'
// import { Sticky } from 'react-sticky'
// import { useHistory } from 'react-router-dom'
// import { BackArrowIcon } from 'components/elements'
// import { createUseStyles } from 'react-jss'
// import { renderRoutes } from 'react-router-config'
// import IconButton from '@material-ui/core/IconButton'
// import Navbar from 'react-bootstrap/Navbar'
// import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'
// import queryString from 'query-string'
// // import { clearNotificationsRequest } from 'store/profile/actions'
// import { broadcastNotification } from 'store/interface/actions'
// import { searchRequest, clearSearchPosts } from 'store/posts/actions'
// import { ContainedButton } from 'components/elements'
// import { useLocation } from 'react-router-dom'
// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
// import { useLastLocation } from 'react-router-last-location'
// import { useWindowDimensions } from 'services/helper'
// import { pending } from 'redux-saga-thunk'

// const useStyles = createUseStyles(theme => ({
//   main: {
//     minHeight: '100vh',
//     borderLeft: theme.border.primary,
//     borderRight: theme.border.primary,
//   },
//   nav: {
//     borderBottom: theme.border.primary,
//     borderLeft: theme.border.primary,
//     borderRight: theme.border.primary,
//     backgroundColor: theme.background.primary,
//     zIndex: 2,
//     overflow: 'hidden',
//     width: '100%',
//   },
//   navTitle: {
//     fontFamily: 'Roboto, sans-serif',
//     display: 'inline-block',
//     verticalAlign: 'top',
//     ...theme.navbar.icon,
//   },
//   trendingWrapper: {
//     width: '100%',
//     minHeight: '100vh',
//     border: '1px solid #e6ecf0',
//   },
//   clearPadding: {
//     paddingLeft: 0,
//     paddingRight: 0,
//   },
//   title: {
//     display: 'inline-block',
//     marginLeft: 5,
//     fontFamily: 'Segoe-Bold',
//     fontSize: 18,
//     color: theme.font.color,
//   },
//   searchWrapper: {
//     padding: 0,
//     margin: 0,
//   },
//   walletButton: {
//     marginTop: 5,
//     float: 'right',
//   },
//   searchDiv: {
//     display: 'inline-block',
//     verticalAlign: 'top',
//     width: '100%',
//   },
// }))

// const GuardedAppFrame = (props) => {
//   const {
//     route,
//     pathname,
//     searchRequest,
//     clearSearchPosts,
//     clearNotificationsRequest,
//     broadcastNotification,
//     loading,
//     count,
//   } = props

//   const classes = useStyles()
//   const history = useHistory()
//   const location = useLocation()
//   const lastLocation = useLastLocation()
//   const params = queryString.parse(location.search) || ''
//   const [search, setSearch] = useState(params.q)
//   const [mainWidth, setMainWidth] = useState(8)
//   const [hideRightSideBar, setHideRightSideBar] = useState(false)
//   const [minify, setMinify] = useState(false)
//   const { width } = useWindowDimensions()

//   useEffect(() => {
//     if (width < 800) {
//       setMainWidth(12)
//       setHideRightSideBar(true)
//     } else {
//       setMainWidth(8)
//       setHideRightSideBar(false)
//     }
//   }, [width])


//   let title = 'Home'

//   if(pathname.match(/(\/c\/)/)) {
//     title = 'Buzz'
//   }

//   if(pathname.match(/^\/trending/)) {
//     title = 'Trending'
//   }

//   if(pathname.match(/^\/latest/)) {
//     title = 'Latest'
//   }

//   if(!pathname.match(/(\/c\/)/) && pathname.match(/^\/@/)) {
//     title = 'Profile'
//   }

//   if(pathname.match(/(\/notifications)/)) {
//     title = 'Notifications'
//   }

//   if(pathname.match(/(\/tags?)/)) {
//     title = 'Tags'
//   }

//   if(pathname.match(/(\/search?)/)) {
//     title = 'Search'
//   }


//   if(pathname.match(/\/follow\/followers/g) || pathname.match(/\/follow\/following/g)) {
//     const items = pathname.split('/')
//     title = `Profile / ${items[1]}`
//   }

//   const handleClickBackButton = () => {
//     if(!lastLocation) {
//       history.replace('/')
//     } else {
//       history.goBack()
//     }
//   }

//   const onChange = (e) => {
//     const { target } = e
//     const { value } = target
//     setSearch(value)
//   }

//   const handleSearchKey = (e) => {
//     if(e.key === 'Enter') {
//       clearSearchPosts()
//       searchRequest(search)
//       history.push(`/search/posts?q=${encodeURIComponent(search)}`)
//     }
//   }


//   const handleClearNotification = () => {
//     clearNotificationsRequest()
//       .then(result => {
//         if(result.success) {
//           broadcastNotification('success', 'Successfully marked all your notifications as read')
//         } else {
//           broadcastNotification('error', 'Failed marking all notifications as read')
//         }
//       })
//   }

//   // useEffect(() => {
//   //   if(typeof params === 'object') {
//   //     setSearch(params.q)
//   //   }
//   // }, [params])

//   return (
//     <React.Fragment>
//       <Row style={{ padding: 0, margin: 0 }}>
      
        
//       </Row>
//     </React.Fragment>
//   )
// }

// const mapStateToProps = (state) => ({
//   loading: pending(state, 'CLEAR_NOTIFICATIONS_REQUEST'),
//   count: state.polling.get('count'),
// })

// const mapDispatchToProps = (dispatch) => ({
//   ...bindActionCreators({
//     searchRequest,
//     clearSearchPosts,
//     clearNotificationsRequest,
//     broadcastNotification,
//   }, dispatch),
// })

// export default connect(mapStateToProps, mapDispatchToProps)(GuardedAppFrame)

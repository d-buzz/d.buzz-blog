import React, { useEffect, useState, useRef } from 'react'
import { isMobile } from 'react-device-detect'
// import Chip from '@material-ui/core/Chip'

import { connect } from 'react-redux'
import {
  getContentRequest,
  getRepliesRequest,
  clearReplies,
  clearAppendReply,
  publishReplyRequest,
  upvoteRequest,
} from 'store/posts/actions'
// import {broadcastNotification,saveScrollIndex} from '../../../store/interfaces/actions'
import { broadcastNotification, saveScrollIndex } from 'store/interfaces/actions'

// import { broadcastNotification, saveScrollIndex } from 'store/interfaces/actions'
// import { upvoteRequest } from 'store/posts/actions'

import {
  checkHasUpdateAuthorityRequest,
} from 'store/auth/actions'
import { createUseStyles } from 'react-jss'
import { Avatar, CommentTwoIcon,CloseIcon,HeartIcon, HeartIconRed,
  // HiveIcon,
  // BurnIcon,
  ContainedButton,
  Spinner,
} from 'components/elements'
import {
  MarkdownViewer,
  PostTags,
  // UserDialog,
  LoginModal,
} from 'components'
import { bindActionCreators } from 'redux'
import { pending } from 'redux-saga-thunk'
import { anchorTop, calculatePayout } from 'services/helper'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import moment from 'moment'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import {
  ContentSkeleton,
  // ReplylistSkeleton,
  HelmetGenerator,
  // UpdateFormModal,
} from 'components'
import Chip from '@material-ui/core/Chip'
import { useHistory } from 'react-router-dom'
import ReplyContent from '../../sections/ReplyContent'
import { withStyles } from '@material-ui/core/styles'
import Slider from '@material-ui/core/Slider'

const PrettoSlider = withStyles({
  root: {
    color: '#e53935',
    height: 5,
    '& .MuiSlider-markLabel': {
      fontSize: 12,
      // color: '#d32f2f',
    },
  },
  thumb: {
    height: 15,
    width: 15,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -5,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 5,
    borderRadius: 4,
  },
  rail: {
    height: 5,
    borderRadius: 4,
  },
})(Slider)


const marks = [
  {
    value: 0,
    label: '0',
  },
  {
    value: 10,
    label: '10',
  },
  {
    value: 20,
    label: '20',
  },
  {
    value: 30,
    label: '30',
  },
  {
    value: 40,
    label: '40',
  },
  {
    value: 50,
    label: '50',
  },
  {
    value: 60,
    label: '60',
  },
  {
    value: 70,
    label: '70',
  },
  {
    value: 80,
    label: '80',
  },
  {
    value: 90,
    label: '90',
  },
  {
    value: 100,
    label: '100',
  },
]

const useStyles = createUseStyles(theme => ({
  cursorPointer:{
    cursor: 'pointer',
  },
  borderTopGrey: {
    borderTop: '1px solid rgb(242, 242, 242)',
  },
  borderBottomGrey: {
    borderBottom: '1px solid rgb(242, 242, 242)',
  },
  padding38:{
    padding: '3px 8px',
  },
  padding1010:{
    padding: '10px 10px',
  },
  margin22:{
    margin: '22px 0px',
  },
  wrapper: {
    width: '70%',
    backgroundColor: theme.backgroundColor,
    padding: '2%',
    borderRadius: 5,
    margin: '0 auto',
    marginTop: 0,
    borderBottom: theme.border.primary,
    '& img': {
      borderRadius: 5,
    },
    '& iframe': {
      borderRadius: 5,
    },
    '@media screen and (max-width: 500px)': {
      fontWidth: 15,
      width: '90%',
    },
    '@media screen and (max-width: 650px )': {
      width: '90%',
    },
    '@media screen and (max-width: 750px )': {
      width: '90%',
    },
  },
  full: {
    width: '100%',
    marginTop: 5,
    borderBottom: theme.border.primary,
  },
  inner: {
    width: '95%',
    margin: '0 auto',
  },
  name: {
    fontWeight: 'bold',
    paddingRight: 5,
    paddingBottom: 0,
    marginBottom: 0,
    fontSize: 14,
    ...theme.font,
  },
  username: {
    marginTop: -30,
    color: '#657786',
    paddingBottom: 0,
    fontSize: 14,
  },
  meta: {
    color: 'rgb(101, 119, 134)',
    fontSize: 14,
    marginRight: 15,
  },
  strong: {
    ...theme.font,
  },
  link: {
    color: 'black',
    fontSize: 14,
    '&:hover': {
      color: 'black',
    },
  },
  context: {
    minHeight: 120,
    width: '100%',
    ...theme.context.view,
    paddingBottom: 10,
    borderRadius: '16px 16px',
    marginBottom: 20,
    fontFamily: 'Segoe-Bold',
  },
  contextWrapper: {
    width: '95%',
    height: '100%',
    margin: '0 auto',
    '& a': {
      // color: '#d32f2f',
    },
    paddingTop: 10,
    paddingBottom: 2,
  },
  threeDotWrapper: {
    height: '100%',
    width: 'auto',
  },
  icon: {
    ...theme.icon,
    ...theme.font,
  },
  iconCursor: {
    cursor: 'pointer',
  },
  iconButton: {
    ...theme.iconButton.hover,
  },
  // chip: {
  //   marginTop: 5,
  //   marginBottom: 5,
  // },
  left100per:{
    left: '100%',
  },
  left110per:{
    left: '110%',
  },
  visibilityVisible: {
    visibility: 'visible',
  },
  transformtranslateX414Neg:{
    transform:'translateX(-414px)',
  },
  transformtranslateX414:{
    transform:'translateX(414px)',
  },
  transition1:{
    transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1) 0s, opacity 0.6s cubic-bezier(0.23, 1, 0.32, 1) 0s',
  },
  boxShadow1:{
    boxShadow: 'rgba(0, 0, 0, 0.15) 0px 4px 12px',
  },
 
  overflowAuto:{
    overflow: 'auto',
  },
  backgroundColorWhite:{
    backgroundColor: 'white',
  },
  width414:{
    width:414,
  },
  zIndex1111:{
    zIndex: 1111,
  },
  top0:{
    top: 0,
  },
  opacity1:{
    opacity: 1,
  },
  positionFixed:{
    position: 'fixed',
  },
  boxSizingBorderBox:{
    boxSizing: 'border-box',
  },
  height100:{
    height: '100%',
  },
  padding24:{
    padding: 24,
  },
  flexDirectionRow:{
    flexDirection: 'row',
  },
  justifyContentSpaceBetween:{
    justifyContent: 'space-between',
  },
  displayFlex:{
    display: 'flex',
  },
  fontSize20:{
    fontSize: 20,
  },
  fontWeight500:{
    fontWeight: 500,
  },
  lineHeight0:{
    lineHeight:0,
  },
  lineHeight24:{
    lineHeight: 24,
  },
  letterSpacing0:{
    letterSpacing: 0,
  },
  color242424:{
    color: '#242424',
  },
  fontFamilySohe:{
    fontFamily: 'sohne, "Helvetica Neue", Helvetica, Arial, sans-serif',
  },
  fontSize14:{
    fontSize: 14,
  },
  lineHeight20:{
    lineHeight: 20,
  },
  fontWeight400:{
    fontWeight: 400,
  },
  marginBottom20:{
    marginBottom: 20,
  },
  padding024:{
    padding: '0 24px',
  },
  displayBlock:{
    display:'block',
  },
  paddingBottom14:{
    paddingBottom: 14,
  },
  paddingTop14:{
    paddingTop: 14,
  },
  transition2:{
    transition: 'padding-top 400ms ease 0s, padding-bottom 400ms ease 0s',
  },
  boxShadow2:{
    boxShadow: 'rgba(0, 0, 0, 0.12) 0px 2px 8px',
  },
  flexDirectionColumn:{
    flexDirection:'column',
  },
  borderRadius4:{
    borderRadius: 4,
  },
  marginBottom6:{
    marginBottom: 6,
  },
  transition3:{
    transition: 'opacity 400ms ease 0s, max-height 400ms ease 0s, margin-bottom 400ms ease 0s',
  },
  maxHeight100:{
    maxHeight: 100,
  },
  padding014:{
    padding: '0px 14px',
  },
  positionRelative:{
    position: 'relative',
  },
  alignItemsCenter: {
    alignItems: 'center',
  },
  backgroundColorf2f2f2:{
    backgroundColor: '#F2F2F2',
  },
  width32:{
    width:32,
  },
  height32:{
    height: 32,
  },
  borderRadius50per:{
    borderRadius:'50%',
  },
  alignItemsFlexStart:{
    alignItems:'flex-start',
  },
  justifyContentCenter:{
    justifyContent: 'center',
  },
  marginLeft12:{
    marginLeft:12,
  },
  marginBottom0:{
    marginBottom:0,
  },
  minHeight100:{
    minHeight: 100,
  },
  transition4:{
    transition: 'min-height 400ms ease 0s',
  },
  margin10:{
    margin:10,
  },
  borderRadius20:{
    borderRadius:20,
  },
  borderNone:{
    border:'none',
  },
  borderBottomSolidGray:{
    borderBottom:'1px solid rgb(242, 242, 242)',
  },
  marginRight24:{
    marginRight:24,
  },
  marginLeft24:{
    marginLeft:24,
  },
  width100:{
    width:'100%',
  },
  paddingBottom25:{
    paddingBottom: 25,
  },
  paddingTop25:{
    paddingTop: 25,
  },
  paddingLeft12:{
    paddingLeft:12,
  },
  margin0:{
    margin: 0,
  },
  padding0:{
    padding:0,
  },
  textDecorationNone:{
    textDecoration:'none',
  },
  widthMaxContent:{
    width:'max-content',
  },
  colorGray:{
    color:'gray',
  },
  colorBlack:{
    color:'black',
  },
  marginTop5:{
    marginTop: 5,
  },
  wordBreakBreakWord:{
    wordBreak:'break-word',
  },
  whiteSpacePreWrap:{
    whiteSpace:'pre-wrap',
  },
  padding050:{
    padding:'5px 0px',
  },
  colorGreen:{
    color:'#1A8917',
  },
  marginTop24:{
    marginTop:24,
  },
  marginLeft5:{
    marginLeft:"5px",
  },
  paddingTop3:{
    paddingTop: '3px',
  },
  borderLeft3SolidGray:{
    borderLeft: '3px solid rgb(242, 242, 242)',
  },
  marginBottom24:{
    marginBottom: '24px',
  },
  marginLeft8:{
    marginLeft: '8px',
  },
  padding8:{
    padding: '8px',
  },
  sliderWrapper: {
    width: '98%',
    paddingRight: 30,
  },
  button: {
    height: 33,
    fontSize: 14,
  },
  chip: {
    border: 'none !important',
    float: 'right !important',
    fontFamily: 'inherit !important',
    fontSize: 'inherit !important',
    '& span': {
      fontFamily: 'inherit !important',
      fontSize: 'inherit !important',
      marginTop: -5,
    },
  },
}))

const Content = (props) => {
  const {
    getContentRequest,
    getRepliesRequest,
    publishReplyRequest,
    modalData,
    append,
    // voteCount,
    broadcastNotification,
    // hasUpvoted = false,
    // saveScrollIndex,
    recentUpvotes,
    upvoteRequest,
    recomputeRowIndex = () => {},
    scrollIndex = 0,
    match,
    content,
    loadingContent,
    clearReplies,
    user = {},
    replies,
    checkHasUpdateAuthorityRequest,
    censorList = [],
    clearAppendReply,
  } = props
  const { username, permlink } = match.params
  const [anchorEl, setAnchorEl] = useState(null)
  const [originalContent, setOriginalContent] = useState('')
  const classes = useStyles()
  const {username: userProfile} = user
  // const [open, setOpen] = useState(false)
  // const [openUpdateForm, setOpenUpdateForm] = useState(false)
  const [hasUpdateAuthority, setHasUpdateAuthority] = useState(false)
  const [isCensored, setIsCensored] = useState(false)
  const [reRenderReply, setreRenderReply] = useState(true)
  const [replying, setReplying] = useState(false)
  
  const [censorType, setCensorType] = useState(null)
  const popoverAnchor = useRef(null)
  const history = useHistory()

  const [contentReply, setcontentReply] = useState('')
  const [repliesList, setrepliesList] = useState([])
  const [replyRef] = useState('content')
  const [treeHistory] = useState(0)
  const [showSlider, setShowSlider] = useState(false)
  const [sliderValue, setSliderValue] = useState(1)
  // const [vote, setVote] = useState(voteCount)
  const [loading, setLoading] = useState(false)
  const [getupvoted, setUpvoted] = useState(false)
  const [openLoginModal, setOpenLoginModal] = useState(false)

  const { isAuthenticated } = user

  const handleClickShowSlider = () => {
    if(!isAuthenticated) {
      handleClickOpenLoginModal()
      return
    }
    if (!getupvoted) {
      setShowSlider(true)
      if (replyRef === 'list') {
        recomputeRowIndex(scrollIndex)
      }
    }
  }

  const handleClickOpenLoginModal = () => {
    setOpenLoginModal(true)
  }

  const handleClickCloseLoginModal = () => {
    setOpenLoginModal(false)
  }

  const handleChange = (e, value) => {
    setSliderValue(value)
  }

  const handleClickHideSlider = () => {
    setShowSlider(false)
    if (replyRef === 'list') {
      recomputeRowIndex(scrollIndex)
    }
  }
  const handleClickUpvote = () => {
    if (replyRef === 'list') {
      recomputeRowIndex(scrollIndex)
    }
    // setShowSlider(false)
    setLoading(true)
    setShowSlider(false)
    setTimeout(() => {
      
    }, 1000)
    upvoteRequest(author, permlink, sliderValue)
      .then(({ success, errorMessage }) => {
        console.log('success',success)
        if (success) {
          setLoading(false)
          setgetActiveVotes(getActiveVotes + 1)
          setUpvoted(true)
          broadcastNotification('success', `Succesfully upvoted @${author}/${permlink} at ${sliderValue}%`)
        } else {
          setUpvoted(false)
          broadcastNotification('error', errorMessage)
          setLoading(false)
        }
      })
  }
  useEffect(() => {
    if (recentUpvotes && permlink && recentUpvotes.includes(permlink)) {
      // setUpvoted(true)
      // hasUpvoted= true
    }
    // eslint-disable-next-line
  }, [recentUpvotes, permlink])
  useEffect(() => {
  },[modalData])

  useEffect(() => {
    if(append.hasOwnProperty('refMeta')) {
      const { refMeta } = append
      const { ref } = refMeta

      if (ref === 'content') {
        repliesList.unshift(append)
      }else{
        if (ref === 'replies') {
          // 
        }
      }
     
      setreRenderReply(false)
      setTimeout(() => {
        setreRenderReply(true)
      }, 500)
    }
  // eslint-disable-next-line
  }, [append])
  useEffect(() => {
    if (replies) {
      setrepliesList(replies)
    }
  // eslint-disable-next-line
  }, [replies])

  const [showReply, setshowReply] = useState(false)
  const updateReply = (boolean) => {
    if(boolean && !isAuthenticated) {
      handleClickOpenLoginModal()
      return
    }
    setshowReply(boolean)
  }
  const {
    author,
    json_metadata,
    created,
    children: replyCount = 0,
    active_votes,
    // profile = {},
    cashout_time,
    title,
    depth,
    root_author,
    root_title,
    root_permlink,
    parent_author = null,
    parent_permlink,
  } = content || ''

  console.log({depth})

  const { body } = content || ''

  let { max_accepted_payout } = content || '0.00'

  max_accepted_payout = `${max_accepted_payout}`.replace('HBD', '')
  const [getActiveVotes, setgetActiveVotes] = useState(0)
  let meta = {}
  let app = null
  // let upvotes = 0
  // let hasUpvoted = false
  let payout_at = cashout_time

  useEffect(() => {
    checkHasUpdateAuthorityRequest(username)
      .then((result) => {
        setHasUpdateAuthority(result)
      })
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if(censorList.length !== 0 && username && permlink) {
      const result = censorList.filter((item) => `${item.author}/${item.permlink}` === `${username}/${permlink}`)
      if(result.length !== 0) {
        setIsCensored(true)
        setCensorType(result[0].type)
      }
    }
  }, [censorList, username, permlink])

  useEffect(() => {
    if(body !== '' && body) {
      setOriginalContent(body
        .replace('<br /><br /> Posted via <a href="https://blog.d.buzz" data-link="promote-link">Blog D.Buzz</a>', '')
        .replace('<br /><br /> Posted via <a href="https://blog.d.buzz" data-link="promote-link">blog.d.buzz</a>', ''))
    }
  }, [body])

  // const handleClickCloseUpdateForm = () => {
  //   setOpenUpdateForm(false)
  // }

  const handleClickOpenUpdateForm = () => {
    setAnchorEl(null)
    // setOpenUpdateForm(true)
  }

  // const handleClickMore = (e) => {
  //   setAnchorEl(e.currentTarget)
  // }

  const hanldeCloseMore = () => {
    setAnchorEl(null)
  }

  // const onUpdateSuccess = (body) => {
  //   setOriginalContent(body) 
  // }

  if(!cashout_time) {
    const { payout_at: payday } = content
    payout_at = payday
  }

  let payout = calculatePayout(content)

  if(isNaN(payout)) {
    const { payout: pay } = content
    payout = pay
  }

  if(json_metadata) {
    try{
      meta = JSON.parse(json_metadata)
      app = meta.app.split('/')[0]
    } catch(e) {
      if(Object.keys(json_metadata).length !== 0 && json_metadata.constructor === Object) {
        app = json_metadata.app.split('/')[0]

        if(json_metadata.hasOwnProperty('tags')) {
          meta.tags = json_metadata.tags
        }
      }
    }

    if(app === 'dBuzz') {
      app = 'D.Buzz'
    }
    if(app === 'blogDBuzz') {
      app = 'blog.d.buzz'
    }
  }

  
  useEffect(() => {
    if(active_votes) {
      if(active_votes.length > 0) {
        
        if(active_votes[0].hasOwnProperty('weight')) {
          const upvotes = active_votes.filter((vote) => vote.weight >= 0).length
          console.log('if upvotes',upvotes)
          setgetActiveVotes(upvotes)
        } else {
          const upvotes = active_votes.length
          console.log('else upvotes',upvotes)
          setgetActiveVotes(upvotes)

        }
  
        if(isAuthenticated) {
          const gethasUpvoted = active_votes.filter((vote) => vote.voter === user.username).length !== 0
          setUpvoted(gethasUpvoted)
        }
      }
    }
  },[active_votes,isAuthenticated,user.username])

  useEffect(() => {
    console.log('getupvoted',getupvoted)
  },[getupvoted])

  useEffect(() => {
    anchorTop()
    clearReplies()
    clearAppendReply()
    getContentRequest(username, permlink)
      .then(({ children }) => {
        if(children !== 0) {
          getRepliesRequest(username, permlink)
        }
      })
  // eslint-disable-next-line
  }, [permlink])


  const generateAuthorLink = () => {
    const link = `/@${author}`
    return link
  }
  
  const generateParentLinks = (author, permlink) => {
    let link = `/@${author}`
    link = `${link}/c/${permlink}`

    return link
  }

  const openPopOver = (e) => {
    // setOpen(true)
  }

  const closePopOver = (e) => {
    // setOpen(false)
  }

  const handleClickContent = (e) => {
    try {
      const { target } = e
      let { href } = target
      const hostname = window.location.hostname

      e.preventDefault()
      if(href && !href.includes(hostname)) {
        window.open(href, '_blank')
      } else {
        const split = `${href}`.split('/')
        href = `/${split[3]}`
        if(href !== '/undefined') {
          history.push(href)
        }
      }
    } catch (e) {}
  }


  const submitReply = () => {
    setReplying(true)
    // console.log('author',author)
    // console.log('permlink',permlink)
    // console.log('contentReply',contentReply)
    // console.log('replyRef',replyRef)
    // console.log('treeHistory',treeHistory)
    publishReplyRequest(author, permlink, contentReply, replyRef, treeHistory)
      .then(({ success, errorMessage }) => {
        if(success) {
          setcontentReply('')
          // setLoading(false)
          // broadcastNotification('success', `Succesfully replied to @${author}/${permlink}`)
          // setReplyDone(true)
          // closeReplyModal()
          // getRepliesRequest()
          setReplying(false)
        } else {
          setReplying(false)
          // setLoading(false)
          // broadcastNotification('error', 'There was an error while replying to this buzz.')
        }
      })
  }

  let payoutAdditionalStyle = {}
  // let iconDetails = {}

  if (parseFloat(max_accepted_payout) === 0) {
    payoutAdditionalStyle = { textDecoration: 'line-through' }
    // iconDetails = <BurnIcon style={{ paddingLeft: 5 }}/>
  }else{
    // iconDetails = <HiveIcon style={{ paddingLeft: 5, color: '#000' }}/>
  }

  const getPayoutDate = (date) => {
    const semantic =  moment(`${date}Z`).local().fromNow()
    return semantic !== '51 years ago' ? semantic : ''
  }

  return (
    <React.Fragment>
      {!loadingContent && author && (
        <React.Fragment>
          <div className={classNames(classes.visibilityVisible, showReply? classes.transformtranslateX414Neg:classes.transformtranslateX414, classes.transition1, classes.boxShadow1, classes.overflowAuto, isMobile? classes.left110per:classes.left100per, classes.backgroundColorWhite, isMobile? classes.width100: classes.width414, classes.zIndex1111, classes.top0, classes.opacity1, classes.positionFixed, classes.boxSizingBorderBox, classes.height100)}>
            <div className={classNames(classes.padding24, classes.justifyContentSpaceBetween, classes.flexDirectionRow, classes.displayFlex)}>
              <div className={classNames(classes.flexDirectionRow, classes.displayFlex)}>
                <h2 className={classNames(classes.fontSize20,classes.fontWeight500,classes.letterSpacing0,classes.color242424,classes.fontFamilySohe)}>Responses ({replyCount})</h2>
              </div>
              <div onClick={() => updateReply(false)} className={classNames(classes.flexDirectionRow, classes.displayFlex, classes.cursorPointer)}>
                <CloseIcon  />
              </div>
            </div>
            <div className='div2'>
              <div className={classNames(classes.color242424,classes.fontSize14, classes.fontFamilySohe,classes.fontWeight400)}>
                <div className={classNames()}>
                  <div className={classNames(classes.marginBottom20,classes.padding024)}>
                    <div className={classNames(classes.paddingBottom14,classes.paddingTop14, classes.transition2, classes.boxShadow2, classes.backgroundColorWhite, classes.flexDirectionColumn, classes.borderRadius4,classes.displayFlex)}>
                      <div className={classNames(classes.marginBottom6,classes.transition3, classes.maxHeight100, classes.padding014,classes.opacity1, classes.positionRelative, classes.justifyContentSpaceBetween, classes.displayFlex, classes.alignItemsCenter)}>
                        {/* for avatar and name */}
                        <div className={classNames(classes.displayFlex, classes.alignItemsCenter)}>
                          <div className={classNames(classes.positionRelative, classes.displayBlock)}>
                            <div className={classNames(classes.positionRelative, classes.displayBlock)}>
                              {/*  */}
                              <Avatar author={userProfile} style={{ marginBottom: -10 }} />

                              {/* <img className={classNames(classes.backgroundColorf2f2f2, classes.boxSizingBorderBox,classes.width32, classes.height32, classes.borderRadius50per, classes.displayBlock)} src={`https://miro.medium.com/v2/resize:fill:32:32/0*2DvkmfGfMiWKkctJ.jpg`} alt="cover"/> */}
                            </div>
                          </div>
                          <div className={classNames(classes.flexDirectionColumn,classes.alignItemsFlexStart, classes.justifyContentCenter, classes.lineHeight0, classes.marginLeft12, classes.displayFlex)}>
                            <p className={classNames(classes.color242424,classes.fontSize14,classes.fontFamilySohe, classes.fontWeight400, classes.lineHeight0, classes.marginBottom0)}> {userProfile}</p>
                          </div>
                        </div>
                      </div>
                      <div className={classNames(classes.flexDirectionColumn, classes.displayFlex, classes.margin10)}>
                        <div className={classNames('text-area-content',classes.transition4, classes.minHeight100)}>
                          <textarea value={contentReply} onChange={(e) => setcontentReply(e.target.value)} placeholder='What are your thoughts?' className={classNames("form-control",classes.borderNone)} id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                        <div className={classNames(classes.displayFlex, classes.justifyContentSpaceBetween, classes.alignItemsCenter, classes.lineHeight0)}>
                          <div></div>
                          <div>
                            {/* <button className='btn btn-default'>Cancel</button> */}
                            <button disabled={replying || contentReply === ''?true:false} onClick={()=> submitReply()} className={classNames('btn btn-success', classes.borderRadius20)}>{replying? 'Responding':'Respond'}</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={classNames(classes.borderBottomSolidGray)}></div>
            <div className='div4'>
              <div>
                {reRenderReply && repliesList.map((reply, index )=>{
                  // console.log('reply',reply)
                  return (
                    <ReplyContent key={index} reply={reply} treeHistory={`${index}`}  match={match}/>
                  )})}
              </div>
            </div>
          </div>
          <div>
            <HelmetGenerator content={body} user={author} />
            <div className={classes.wrapper}>
              
              {/* <br /> */}
              <React.Fragment>
                <h1 style={{marginBottom:'25px', letterSpacing: "-0.011em", lineHeight: "52px", fontSize: "45px", fontWeight:"700", fontFamily:'"Helvetica Neue", Helvetica, Arial, sans-serif'}}><strong>{title}</strong></h1>
                {depth !== 0 && parent_author !== null && (
                  <Row>
                    <Col>
                      <div className={classes.context}>
                        <div className={classes.contextWrapper}>
                          <h6 style={{ paddingTop: 5 }}>You are viewing a single comment's thread from:</h6>
                          <h5>RE: {root_title}</h5>
                          <ul>
                            <li><Link to={generateParentLinks(root_author, root_permlink)}>View the full context</Link></li>
                            <li><Link to={generateParentLinks(parent_author, parent_permlink)}>View the direct parent</Link></li>
                          </ul>
                        </div>
                      </div>
                    </Col>
                  </Row>
                )}
                <Row>
                  <Col xs="auto" style={{ paddingRight: 0 }}>
                    <Avatar author={author} />
                  </Col>
                  <Col style={{ paddingLeft: 10 }}>
                    <div style={{ marginTop: 2 }}>
                      <Link
                        ref={popoverAnchor}
                        to={generateAuthorLink}
                        className={classes.link}
                        onMouseEnter={openPopOver}
                        onMouseLeave={closePopOver}
                      >
                        <p className={classes.name}>
                          {author}
                        </p>
                      </Link>

                      <br />
                      <p className={classes.username}>
                        {moment(`${created}Z`).local().fromNow()}
                      </p>
                    </div>
                  </Col>
                </Row>
                {/* add div here for comment */}
                {showSlider && (
                  <div className={classes.sliderWrapper}>
                    <Row>
                      <Col xs="auto">
                        <ContainedButton onClick={handleClickUpvote} fontSize={14} label={`Upvote (${sliderValue}%)`} className={classes.button} />
                      </Col>
                      <Col style={{ paddingLeft: 0 }}>
                        <ContainedButton
                          fontSize={14}
                          transparent={true}
                          label="Cancel"
                          className={classes.button}
                          onClick={handleClickHideSlider}
                        />
                      </Col>
                    </Row>
                    <div style={{ paddingLeft: 10 }}>
                      <PrettoSlider
                        marks={marks}
                        value={sliderValue}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                )}
                <div className={classNames(classes.displayFlex, classes.justifyContentSpaceBetween, classes.borderTopGrey, classes.borderBottomGrey, classes.padding1010, classes.margin22, classes.cursorPointer)}>
                  <div className={classNames(classes.displayFlex)}>
                    
                    <div onClick={handleClickShowSlider} className={classNames(classes.displayFlex, classes.marginRight24, classes.alignItemsCenter)}>
                      {!loading && getupvoted && (<HeartIconRed />)}
                      {!loading && !getupvoted && (<HeartIcon />)}
                      {loading && (<Spinner top={0} loading={true} size={20} style={{ display: 'inline-block', verticalAlign: 'top' }} />)}
                      <label className={classNames(classes.margin0, classes.marginLeft5)}>{getActiveVotes}</label>
                    </div>
                   
                    {!isMobile &&(
                      <div className={classNames(classes.displayFlex)}>
                        <div onClick={() => updateReply(true)} className={classNames(classes.displayFlex, classes.alignItemsCenter)}>
                          <CommentTwoIcon size={17} />  <label className={classNames(classes.margin0, classes.marginLeft5)}>{replyCount}</label>
                        </div>
                      </div>
                    )}
                  </div>
                  {isMobile &&(
                    <div className={classNames(classes.displayFlex)}>
                      <div onClick={() => updateReply(true)} className={classNames(classes.displayFlex, classes.alignItemsCenter)}>
                        <CommentTwoIcon size={17} />  <label className={classNames(classes.margin0, classes.marginLeft5)}>{replyCount}</label>
                      </div>
                    </div>
                  )}
                  <div className={classNames(classes.displayFlex)}>
                    <div className={classNames(classes.displayFlex, classes.marginRight24, classes.alignItemsCenter)}>
                      <span className={classes.payout} style={payoutAdditionalStyle}>
                        ${payout > 1 && parseFloat(max_accepted_payout) === 1 ? '1.00' : payout === '0' ? '0.00' : payout !== 0 ? payout : ''}&nbsp;
                        {!payout && !isMobile ? '0.00 in 7 days' : ''}&nbsp;
                        {!payout && isMobile ? '0.00' : ''}&nbsp;
                        {!isMobile && payout_at && payout ? getPayoutDate(payout_at) : ''}
                      </span>
                    </div>
                  </div>
                </div>
                <div onClick={handleClickContent} style={{ overflow: 'hidden'}}>
                  {isCensored && (
                    <Chip label={censorType} color="secondary" size="small" className={classes.chip} />
                  )}
                  <MarkdownViewer content={originalContent} minifyAssets={false} />
                </div>
                <PostTags meta={meta} />
                
                <div style={{ marginTop: 10 }}>
                  <label className={classes.meta}>
                    {moment(`${created}Z`).local().format('LTS • \nLL')}
                    {app && <React.Fragment> • Posted using <b className={classes.strong}>{app}</b></React.Fragment>}
                  </label>
                </div>
              </React.Fragment>
            </div>

            <div className={classes.wrapper}>
              {showSlider && (
                <div className={classes.sliderWrapper}>
                  <Row>
                    <Col xs="auto">
                      <ContainedButton onClick={handleClickUpvote} fontSize={14} label={`Upvote (${sliderValue}%)`} className={classes.button} />
                    </Col>
                    <Col style={{ paddingLeft: 0 }}>
                      <ContainedButton
                        fontSize={14}
                        transparent={true}
                        label="Cancel"
                        className={classes.button}
                        onClick={handleClickHideSlider}
                      />
                    </Col>
                  </Row>
                  <div style={{ paddingLeft: 10 }}>
                    <PrettoSlider
                      marks={marks}
                      value={sliderValue}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              )}
              <div className={classNames(classes.displayFlex, classes.justifyContentSpaceBetween, classes.cursorPointer)}>
                <div className={classNames(classes.displayFlex)}>
                  <div onClick={handleClickShowSlider}
                    className={classNames(classes.displayFlex, classes.marginRight24, classes.alignItemsCenter)}>
                    {!loading && getupvoted && (<HeartIconRed/>)}
                    {!loading && !getupvoted && (<HeartIcon/>)}
                    {loading && (<Spinner top={0} loading={true} size={20}
                      style={{display: 'inline-block', verticalAlign: 'top'}}/>)}
                    <label className={classNames(classes.margin0, classes.marginLeft5)}>{getActiveVotes}</label>
                  </div>
                  {!isMobile && (
                    <div className={classNames(classes.displayFlex)}>
                      <div onClick={() => updateReply(true)}
                        className={classNames(classes.displayFlex, classes.alignItemsCenter)}>
                        <CommentTwoIcon size={17}/> <label
                          className={classNames(classes.margin0, classes.marginLeft5)}>{replyCount}</label>
                      </div>
                    </div>
                  )}
                </div>
                {isMobile && (
                  <div className={classNames(classes.displayFlex)}>
                    <div onClick={() => updateReply(true)}
                      className={classNames(classes.displayFlex, classes.alignItemsCenter)}>
                      <CommentTwoIcon size={17}/> <label
                        className={classNames(classes.margin0, classes.marginLeft5)}>{replyCount}</label>
                    </div>
                  </div>
                )}
                <div className={classNames(classes.displayFlex)}>
                  <div className={classNames(classes.displayFlex, classes.marginRight24, classes.alignItemsCenter)}>
                    {/* <FavoritesIcon size={19}  />  */}
                    <span className={classes.payout} style={payoutAdditionalStyle}>
                      ${payout > 1 && parseFloat(max_accepted_payout) === 1 ? '1.00' : payout === '0' ? '0.00' : payout !== 0 ? payout : ''}&nbsp;
                      {!payout && !isMobile ? '0.00 in 7 days' : ''}&nbsp;
                      {!payout && isMobile ? '0.00' : ''}&nbsp;
                      {!isMobile && payout_at && payout ? getPayoutDate(payout_at) : ''}
                    </span>
                  </div>
                </div>
              </div>
              <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={hanldeCloseMore}
              >
                {hasUpdateAuthority && (
                  <React.Fragment>
                    <MenuItem onClick={handleClickOpenUpdateForm}>Edit</MenuItem>
                  </React.Fragment>
                )}
              </Menu>
              {/* {hasUpdateAuthority && (
                <UpdateFormModal onSuccess={onUpdateSuccess} author={author} permlink={permlink} body={originalContent} open={openUpdateForm} onClose={handleClickCloseUpdateForm} />
              )} */}
              <Row>
                <Col>
                  {/* <PostActions
                    disableExtraPadding={true}
                    body={body}
                    author={username}
                    permlink={permlink}
                    hasUpvoted={hasUpvoted}
                    hideStats={true}
                    voteCount={upvotes}
                    replyCount={replyCount}
                    payout={payout}
                    payoutAt={payout_at}
                    replyRef="content"
                    max_accepted_payout={max_accepted_payout}
                  /> */}
                </Col>
              </Row>
              {/* {!loadingReplies && !loadingContent &&  (
                <ReplyList replies={replies} expectedCount={replyCount} />
              )} */}
            </div>
          </div>
        </React.Fragment>
      )}
      <ContentSkeleton loading={loadingContent} />
      {/* {replyCount !== 0 && (
        <ReplylistSkeleton loading={loadingReplies || loadingContent} />
      )} */}
      <br />
      {/* <UserDialog
        open={open}
        anchorEl={popoverAnchor.current}
        onMouseEnter={openPopOver}
        onMouseLeave={closePopOver}
        profile={profile}
      /> */}
      <LoginModal show={openLoginModal} onHide={handleClickCloseLoginModal} />
    </React.Fragment>
  )
}

const mapStateToProps = (state) => ({
  loadingContent: pending(state, 'GET_CONTENT_REQUEST'),
  loadingReplies: pending(state, 'GET_REPLIES_REQUEST'),
  modalData: state.interfaces.get('replyModalData'),
  append: state.posts.get('appendReply'),
  replies: state.posts.get('replies'),
  content: state.posts.get('content'),
  user: state.auth.get('user'),
  censorList: state.auth.get('censorList'),
  recentUpvotes: state.posts.get('recentUpvotes'),
})

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({
    getContentRequest,
    publishReplyRequest,
    broadcastNotification,
    getRepliesRequest,
    clearReplies,
    checkHasUpdateAuthorityRequest,
    clearAppendReply,
    saveScrollIndex,
    upvoteRequest,
    // openReplyModal,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Content)

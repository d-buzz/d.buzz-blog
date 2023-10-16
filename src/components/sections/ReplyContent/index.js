import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import { createUseStyles } from 'react-jss'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  publishReplyRequest,
} from 'store/posts/actions'
import moment from 'moment'
import {
  MarkdownViewer,
  // UserDialog,
} from 'components'
import { CommentTwoIcon,HeartIcon } from 'components/elements'
import ReplyListTwo from '../ReplyListTwo'

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
      color: '#d32f2f',
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
  chip: {
    marginTop: 5,
    marginBottom: 5,
  },
  left100per:{
    left: '100%',
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
}))
const ReplyContent = (props) => {

  const {
    publishReplyRequest,
    append,
    match,
    reply,
    treeHistory,
  } = props
  const [replyRef] = useState('replies')
  const {
    author,
    permlink,
  } = reply
  const classes = useStyles()
  const [contentReply, setcontentReply] = useState('')
  const [replying, setReplying] = useState(false)
  const [replyNow, setreplyNow] = useState(false)
  const [replyList, setreplyList] = useState(reply.replies)


  const showReplyForm = () => {
    console.log('reply', reply)
    setreplyNow(true)
    // show form
  }
  const hideReplyForm = () => {
    console.log('reply', reply)
    setreplyNow(false)
    // show form
  }

  useEffect(() => {
    if(append.hasOwnProperty('refMeta')) {
      const { refMeta } = append
      const { ref } = refMeta
      if (ref === 'replies' && append.root_permlink === permlink) {
        setreplyList([...replyList, append])
      }
    }
  // eslint-disable-next-line
  }, [append])
  
  const submitReply = () => {
    setReplying(true)
    console.log('author',author)
    // console.log('permlink',permlink)
    console.log('contentReply',contentReply)
    console.log('replyRef',replyRef)
    console.log('treeHistory',treeHistory)
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

  return (
    <div className={classNames('main-comment-content',classes.marginRight24, classes.marginLeft24, classes.borderBottomSolidGray, classes.displayBlock)}>
      <div>
        <div className={classNames(classes.width100, classes.height100 )}>
          <div className={classNames(classes.paddingBottom25, classes.paddingTop25)}>
            {/* avatar */}
            <div className={classNames(classes.flexDirectionRow, classes.justifyContentSpaceBetween, classes.displayFlex)}>
              <div className={classNames(classes.flexDirectionRow, classes.displayFlex, classes.alignItemsCenter)}>
                <div className={classNames(classes.positionRelative, classes.displayBlock)}>
                  <div className={classNames(classes.positionRelative, classes.displayBlock)}>
                    <img className={classNames(classes.backgroundColorf2f2f2, classes.boxSizingBorderBox,classes.width32, classes.height32, classes.borderRadius50per, classes.displayBlock)} src={`https://images.hive.blog/u/${reply.author}/avatar/small`} alt="cover"/>
                  </div>
                </div>
                <div className={classNames(classes.paddingLeft12, classes.displayBlock, classes.widthMaxContent)}>
                  {/* name here */}
                  <div className={classNames(classes.displayFlex, classes.alignItemsCenter)}>
                    <a href='https://d.buzz/' className={classNames(classes.textDecorationNone, classes.colorBlack, classes.fontSize14)}>{reply.author}</a>
                  </div>
                  <a href='https://d.buzz/' className={classNames(classes.textDecorationNone, classes.colorGray, classes.fontSize14)}>{moment(`${reply.created}Z`).local().fromNow()}</a>
                </div>
              </div>
              <div></div>
            </div>

            {/* content */}
            <div className={classNames(classes.marginTop5, classes.wordBreakBreakWord, classes.displayBlock)}>
              <pre className={classNames(classes.whiteSpacePreWrap)}>
                <div className={classNames(classes.padding050, classes.displayBlock)}>
                  <div className={classNames(classes.color242424,classes.fontSize14, classes.fontFamilySohe,classes.fontWeight400)}>
                    <MarkdownViewer minifyAssets={false} content={reply.body} />
                  </div>
                </div>
              </pre>
            </div>

            {/* read more */}
            {/* <div>
              <button className={classNames('btn btn-default', classes.colorGreen, classes.padding0, classes.fontSize14)}>Read More</button>
            </div> */}

            {/* footer */}
            <div className={classNames(classes.marginTop24, classes.displayFlex, classes.justifyContentSpaceBetween, classes.alignItemsCenter)}>
              <div className={classNames(classes.displayFlex)}>
                <div className={classNames(classes.displayFlex, classes.alignItemsCenter)}> <HeartIcon /><label className={classNames(classes.marginLeft5,classes.marginBottom0)}>{reply.active_votes.length}</label></div>
                {reply.replyCount >= 0 && <div className={classNames(classes.marginLeft12, classes.displayFlex, classes.alignItemsCenter)}>  <CommentTwoIcon size='17' /><label className={classNames(classes.marginLeft5, classes.marginBottom0)}>{reply.replyCount}reply</label></div>}
              </div>
              <div onClick={showReplyForm} className={classNames(classes.cursorPointer, classes.fontSize14)}>Reply</div>
            </div>
          </div>
        </div>
      </div>
      {/* reply content */}
      {replyNow && (
        <>
          <div className={classNames(classes.borderLeft3SolidGray, classes.marginBottom24, classes.marginLeft8)} style={{width: '100%'}}>
            <div>
              <div className={classNames(classes.color242424, classes.fontSize14, classes.fontFamilySohe, classes.lineHeight20, classes.fontWeight400)}>
                <div className={classNames(classes.lineHeight24)}>
                  <div className={classNames(classes.marginBottom0, classes.padding024, classes.displayBlock)}>
                    <div className={classNames(classes.paddingBottom14, classes.paddingTop14, classes.transition2, classes.boxShadow2,classes.backgroundColorWhite, classes.flexDirectionColumn, classes.borderRadius4, classes.displayFlex)}>
                      <div className={classNames(classes.flexDirectionColumn, classes.displayFlex, classes.padding8)}>
                        <div className={classNames('text-area-content',classes.transition4, classes.minHeight100)}>
                          <textarea value={contentReply} onChange={(e) => setcontentReply(e.target.value)} placeholder='What are your thoughts?' className={classNames("form-control",classes.borderNone)} id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                        <div className={classNames(classes.displayFlex, classes.justifyContentSpaceBetween, classes.alignItemsCenter, classes.lineHeight0)}>
                          <div></div>
                          <div>
                            <button onClick={hideReplyForm} className='btn btn-default'>Cancel</button>
                            <button disabled={replying || contentReply === ''?true:false} onClick={()=> submitReply()} className={classNames('btn btn-success', classes.borderRadius20)}>{replying? 'Replying':'Reply'}</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {<ReplyListTwo replies={replyList}  match={match}/>}
    </div>
  )
}

const mapStateToProps = (state) => ({
  content: state.posts.get('content'),
  append: state.posts.get('appendReply'),
})
const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({
    publishReplyRequest,
  }, dispatch),
})

  
export default connect(mapStateToProps, mapDispatchToProps)(ReplyContent)

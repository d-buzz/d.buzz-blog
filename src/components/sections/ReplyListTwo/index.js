import classNames from 'classnames'
import React, { useEffect } from 'react'
import { createUseStyles } from 'react-jss'
import ReplyContent from '../ReplyContent'
import { connect } from 'react-redux'

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
const ReplyListTwo = ({replies, match, append}) => {
  const classes = useStyles()

 
  return (
    <>
    { replies.length > 0 && replies.map((reply, index) => {
        // console.log('reply',reply)
            return (
                <>
                <div className={classNames(classes.borderLeft3SolidGray, classes.marginBottom24, classes.marginLeft8)} style={{width: '100%'}}>
                    <div>
                        <ReplyContent key={index} reply={reply} treeHistory={`${index}`}  match={match}/>
                    </div>
                </div>
                </>
            )
        })
    }
    </>
  )
}

const mapStateToProps = (state) => ({
  append: state.posts.get('appendReply'),
})

export default connect(mapStateToProps)(ReplyListTwo)

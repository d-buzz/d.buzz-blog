import classNames from "classnames"
import React, { useState } from "react"
import Container from "react-bootstrap/Container"
import { createUseStyles } from 'react-jss'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { isMobile } from 'react-device-detect'
import { CloseIcon } from '../../elements'

import {
  setPostRequest,
} from 'store/posts/actions'
const useStyles = createUseStyles(theme => ({
  marginLeft0:{
    marginLeft: 0,
  },
  marginRight0:{
    marginRight: 0,
  },
  displayFlex:{
    display: 'flex',
  },
  displayNone:{
    display: 'none',
  },
  justifyContentCenter:{
    justifyContent: 'center',
  },
  justifyContentStart:{
    justifyContent: 'start',
  },
  alignItemsCenter:{
    alignItems: 'center',
  },
  alignItemsStart:{
    alignItems: 'start',
  },
  minWidth100:{
    minWidth: '100%',
  },
  backgroundColore5:{
    background: 'white',
  },
  borderNone: {
    border: 0,
  },
  fontSize21:{
    fontSize: 21,
  },
  lineHeight158: {
    lineHeight: '1.58',
  },
  fontWeight400:{
    fontWeight: '400',
  },
  marginTop10:{
    marginTop: 10,
  },
  letterSpacing3em:{
    letterSpacing: '-.003em',
  },
  paddingTop16: {
    paddingTop: 16,
  },
  fontSize42: {
    fontSize:42,
  },
 
  lineHeight125:{
    lineHeight:1.25,
  },
  width40: {
    width: 40,
  },
  height40: {
    height: 40,
  },
  border1: {
    border: '1px solid',
  },
  borderRadius50:{
    borderRadius:'50%',
  },
  marginRight20:{
    marginRight: 20,
  },
  margin10: {
    margin: '10px',
  },
  margin1x2:{
    margin: '1px 2px',
  },
  marginTop0: {
    marginTop: '0px',
  },
  width80:{
    width: '80px',
  },
  cursorPointer: {
    cursor: 'pointer',
  },
  flexDirectionRow:{
    flexDirection:"row",
  },
  flexGrow1:{
    flexGrow: 1,
  },
  marginBottom0:{
    marginBottom: '0 !important',
  },
  positionRelative:{
    position: 'relative',
  },
  maxWidthUnset:{
    maxWidth: 'unset',
  },
  backgroundColorfff:{
    backgroundColor: '#fff',
  },
  border1solidccc:{
    border: '1px solid #ccc',
  },
  padding4:{
    padding: '4px',
  },
  flexWrapWrap: {
    flexWrap: 'flex',
  },
  width100:{
    width: '100%',
  },
  lineHeight1em:{
    lineHeight: '1em',
  },
  margin0:{
    margin: 0,
  },
  padding0:{
    padding: 0,
  },
  listStyleTypeNone:{
    listStyleType: 'none',
  },
  bg999:{
    backgroundColor: '#999',
  },
  colorfff:{
    color: '#fff',
  },
  borderRadius2:{
    borderRadius: '2px',
  },
  padding3x5:{
    padding: '3px 5px',
  },
  fontSize085em:{
    fontSize: '.85em',
  },
  boxSizingBorderBox: {
    boxSizing: 'border-box',
  },
  borderColor999:{
    borderColor:'#999',
  },
  padding2:{
    padding: '2px',
  },
  padding2x5:{
    padding: '2px 5px',
  },
  marginLeft2:{
    marginLeft:"2px",
  },
  fontSize1p15em:{
    fontSize: '1.15em',
  },
  flex1x0xauto:{
    flex: '1 0 auto',
  },
  margin2:{
    margin: '2px',
  },
  fontSizep85em:{
    fontSize: '.85em',
  },
  minWidth100px:{
    minWidth: '100px',
  },
  color757575:{
    color: '#757575',
  },
  fontSize12:{
    fontSize: '12px',
  },
}))
const Post = (props) => {
  const {
    setPostRequest,
  } = props
  const classes = useStyles()
  const [showTitleButton, setShowTitleButton] = useState(false)
  const [showDescButton, setShowDescButton] = useState(true)
  const [postContent, setpostContent] = useState('')
  const [tags, setTags] = useState([])
  const [tag, setTag] = useState('')
  const updateFromDesc = () => {
    console.log('showTitleButton',showTitleButton)
    setShowTitleButton(false)
    setShowDescButton(true)
  }

  const onkeydownTags = (e) => {
    console.log('e.key', e.key)
    console.log('e.keyCode', e.keyCode)
    let newtags = []
    if ((e.keyCode === 13 || e.keyCode === 188 || e.keyCode === 32) && (tags.length < 10)) {
      const data = e.target.value.replace(/,*$/, '')
      setTags([...tags, data])
      newtags = [...tags, data]
      // setPostRequest(postContent,tags,payout,buzzPermlink)
      setTag("")
    }

    const payout = 1
    const buzzPermlink = null
    setPostRequest(postContent,newtags,payout,buzzPermlink)
    
   
  }
  const updateContent = (e) =>{
    console.log('e.target.value', e.target.value)
    setpostContent(e.target.value)
    const payout = 1
    const buzzPermlink = null
    setPostRequest(e.target.value,tags,payout,buzzPermlink)
  }
  return (
    <Container>
      <form>
        <div className={classNames(classes.displayFlex, classes.justifyContentStart, classes.alignItemsStart)}>
          {/* <label>Tell your story</label> */}
          <div   className={classNames( classes.cursorPointer, classes.width40, classes.height40, showDescButton?classes.border1:'', classes.borderRadius50, !isMobile? classes.marginRight20:'', isMobile? classes.margin10:'', isMobile?classes.marginTop0:'', isMobile?classes.width80:'', classes.displayFlex, classes.justifyContentCenter, classes.alignItemsCenter)}>{showDescButton?'+':''}</div>
          <textarea  onInput={(e) => updateContent(e)}  rows={10} cols={50} onFocus={() => updateFromDesc()} onClick={() => updateFromDesc()} autoFocus placeholder="Tell your story" className={classNames(classes.backgroundColore5, classes.borderNone, classes.fontSize21, classes.lineHeight158, classes.fontWeight400, classes.letterSpacing3em)} >{postContent}</textarea>
        </div>
      </form>
      <div className={classNames(classes.flexDirectionRow, classes.displayFlex)}>
        <div className={classNames(classes.flexGrow1, classes.marginBottom0, classes.positionRelative)}>
          <div className={classNames(classes.maxWidthUnset, classes.positionRelative, classes.backgroundColorfff)}>
            <div className={classNames(classes.border1solidccc, classes.displayFlex, classes.padding4, classes.flexWrapWrap)}>
              <ul className={classNames(classes.displayFlex, classes.flexWrapWrap, classes.width100, classes.lineHeight1em, classes.margin0, classes.padding0, classes.listStyleTypeNone)}>
                {tags.map((tag, index) => {
                  return (
                    <li key={index} className={classNames(classes.margin1x2, classes.bg999, classes.colorfff, classes.borderRadius2, classes.displayFlex, classes.padding3x5, classes.fontSize085em, classes.boxSizingBorderBox, classes.borderColor999)}>
                      <div className={classNames(classes.padding2, classes.displayFlex, classes.alignItemsCenter, classes.padding2x5)}>{tag}</div>
                      <div className={classNames(classes.marginLeft2, classes.displayFlex, classes.alignItemsCenter, classes.fontSize1p15em)}><CloseIcon color='grey'/></div>
                  </li>
                  )
                })}
                <li className={classNames(classes.displayFlex, classes.flex1x0xauto, classes.padding3x5, classes.margin2, classes.fontSize085em)}>
                    <input value={tag} onChange={(e) => setTag(e.target.value)} onKeyUp={(e) => onkeydownTags(e)} placeholder="Add a new topic" className={classNames(classes.flex1x0xauto, classes.minWidth100px, classes.borderNone, classes.padding0, classes.margin0)} />
                </li>
              </ul>
            </div>
          </div>
          <span className={classNames(classes.color757575, classes.fontSize12)}>Topics-Tags to classify your post: {tags.length}/10</span>
        </div>
      </div>
    </Container>
  )
}
const mapStateToProps = (state) => ({
  user: state.auth.get('user'),
})
const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({
    setPostRequest,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Post)

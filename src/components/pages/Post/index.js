import classNames from "classnames"
import React, { useState } from "react"
import Container from "react-bootstrap/Container"
import { createUseStyles } from 'react-jss'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
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
}))
const Post = (props) => {
  const {
    setPostRequest,
  } = props
  const classes = useStyles()
  const [showTitleButton, setShowTitleButton] = useState(false)
  const [showDescButton, setShowDescButton] = useState(true)
  const [postContent, setpostContent] = useState('')
  const updateFromDesc = () => {
    console.log('showTitleButton',showTitleButton)
    setShowTitleButton(false)
    setShowDescButton(true)
  }

  const updateContent = (e) =>{
    console.log('e.target.value', e.target.value)
    setpostContent(e.target.value)
    const tags = []
    const payout = 1
    const buzzPermlink = null
    setPostRequest(e.target.value,tags,payout,buzzPermlink)
  }
  return (
    <Container>
      <form>
        <div className={classNames(classes.displayFlex, classes.justifyContentStart, classes.alignItemsStart)}>
          {/* <label>Tell your story</label> */}
          <div   className={classNames(classes.width40, classes.height40, showDescButton?classes.border1:'', classes.borderRadius50, classes.marginRight20, classes.displayFlex, classes.justifyContentCenter, classes.alignItemsCenter)}>{showDescButton?'+':''}</div>
          <textarea  onInput={(e) => updateContent(e)}  rows={10} cols={50} onFocus={() => updateFromDesc()} onClick={() => updateFromDesc()} autoFocus placeholder="Tell your story" className={classNames(classes.backgroundColore5, classes.borderNone, classes.fontSize21, classes.lineHeight158, classes.fontWeight400, classes.letterSpacing3em)} >{postContent}</textarea>
        </div>
      </form>
      
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

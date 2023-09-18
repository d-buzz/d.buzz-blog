import classNames from "classnames";
import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import { createUseStyles } from 'react-jss'
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
    justifyContent: 'center'
  },
  justifyContentStart:{
    justifyContent: 'start'
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
    letterSpacing: '-.003em'
  },
  paddingTop16: {
    paddingTop: 16,
  },
  fontSize42: {
    fontSize:42
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
  }
}))
const Post = () => {
  const classes = useStyles()
  const [showTitleButton, setShowTitleButton] = useState(false)
  const [showDescButton, setShowDescButton] = useState(true)

  const updateFromTitle = () => {
    setShowTitleButton(true)
    setShowDescButton(false)
  }
  const updateFromDesc = () => {
    setShowTitleButton(false)
    setShowDescButton(true)
  }
  return (
    <Container>
      <form>
        <div className={classNames(classes.displayFlex, classes.justifyContentStart, classes.alignItemsCenter)}>
          {/* <label>Title</label> */}
         
          <div  className={classNames(classes.width40, classes.height40, showTitleButton?classes.border1:'', classes.borderRadius50, classes.marginRight20, classes.displayFlex, classes.justifyContentCenter, classes.alignItemsCenter)}>{showTitleButton?'+':''}</div>
          
          <input onFocus={() => updateFromTitle()} onClick={() => updateFromTitle()} placeholder="Title" className={classNames(classes.backgroundColore5, classes.borderNone, classes.paddingTop16, classes.fontSize42, classes.fontWeight400, classes.lineHeight125)} />
        </div>
        <div className={classNames(classes.displayFlex, classes.justifyContentStart, classes.alignItemsStart)}>
          {/* <label>Tell your story</label> */}
          <div   className={classNames(classes.width40, classes.height40, showDescButton?classes.border1:'', classes.borderRadius50, classes.marginRight20, classes.displayFlex, classes.justifyContentCenter, classes.alignItemsCenter)}>{showDescButton?'+':''}</div>
          <textarea  rows={10} cols={50} onFocus={() => updateFromDesc()} onClick={() => updateFromDesc()} autoFocus placeholder="Tell your story" className={classNames(classes.backgroundColore5, classes.borderNone, classes.fontSize21, classes.lineHeight158, classes.fontWeight400, classes.letterSpacing3em)} ></textarea>
        </div>
      </form>
      
    </Container>
  );
};

export default Post;

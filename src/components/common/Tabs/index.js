import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { createUseStyles } from 'react-jss'
import { useHistory, useLocation } from 'react-router'
const useStyles = createUseStyles(theme => ({
  width90:{
    width: '90%',
  },
  marginAuto: {
    margin: 'auto',
  },
  height43:{
    height: 43,
  },
  boxShadow242:{
    boxShadow: 'rgb(242, 242, 242) 0px -1px 0px inset',
  },
  overFlowHidden:{
    overflow: 'hidden',
  },
  positionRelative:{
    position: 'relative',
  },
  displayBLock: {
    display: 'block',
  },
  displayFlex:{
    display:'flex',
  },
  alignItemsCenter:{
    alignItems: 'center',
  },
  padding2by0:{
    padding: '2px 0px',
  },
  overFlowYHidden:{
    overflowY: 'hidden',
  },
  overFLoxXScroll:{
    overflowX: 'scroll',
  },
  borderBottomSolid1p:{
    borderBottom:'1px solid rgb(36, 36, 36)',
  },
  minWidthMaxContent: {
    minWidth: 'max-content',
  },
  paddingBottom16:{
    paddingBottom: 16,
  },
  marginRight32:{
    marginRight:32,
  },
  paddingTop24:{
    paddingTop: 24,
  },
  paddingTop50:{
    paddingTop: 50,
  },
  height16:{
    height:16,
  },
  paddingBottom50:{
    paddingBottom: 50,
  },
  cursorPointer:{
    cursor: 'pointer',
  },
  positionSticky:{
    position: 'sticky',
  },
  top57:{
    top: 57,
  },
  top0:{
    top: 0,
  },
  zindex1050:{
    zIndex:'1050',
  },
  backGroundWhite:{
    background:'white',
  },

}))
const Tabs = (props) => {
  const {hideFollower,hideLatest} = props
  const classes = useStyles()
  const history = useHistory()
  const location = useLocation()
  const { pathname } = location
  const [isTop, setIstop] = useState(true)

  const redirectPage = (url) => {
    history.push(url)
  }

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

  return (
    <div className={classNames(isTop?classes.top57:classes.top0, isTop? classes.paddingTop24:'', classes.positionSticky, classes.backGroundWhite, !isTop || isMobile?classes.zindex1050:'' )}>
    	{/* 2 div
        1 for padding
        1 for tabs content
    	*/}
    	{/* <div className={classNames(classes.paddingTop24)}></div> */}
    	<div className={classNames( classes.width90, classes.marginAuto)}>
        {/* div for height 16px */}
        <div className={classes.height16}>

        </div>
			 <div className={classNames( classes.height43, classes.boxShadow242, classes.overFlowHidden, classes.positionRelative, classes.displayBLock)}>
          <div className={classNames(classes.padding2by0, classes.overFlowYHidden, classes.alignItemsCenter, classes.displayFlex)}>
          	<div className={classNames(classes.displayFlex)}>
              <div style={{fontFamily:'RobotoRegular'}} onClick={() => redirectPage('/trending')} className={classNames(classes.cursorPointer, pathname === '/trending' || pathname === '/'?classes.borderBottomSolid1p:'', classes.minWidthMaxContent, classes.paddingBottom16, classes.marginRight32, classes.displayBLock)}>
                    Trending
              </div>
              {!hideFollower && (
                <div style={{fontFamily:'RobotoRegular'}} onClick={() => redirectPage('/following')} className={classNames(classes.cursorPointer,pathname === '/following'?classes.borderBottomSolid1p:'', classes.minWidthMaxContent, classes.paddingBottom16, classes.marginRight32, classes.displayBLock)}>
                    Following
                </div>
              )}
              {!hideLatest && (
                <div style={{fontFamily:'RobotoRegular'}} onClick={() => redirectPage('/latest')} className={classNames(classes.cursorPointer,pathname === '/latest'?classes.borderBottomSolid1p:'', classes.minWidthMaxContent, classes.paddingBottom16, classes.marginRight32, classes.displayBLock)}>
                    Latest
                </div>
              )}
             
              <div style={{fontFamily:'RobotoRegular'}} onClick={() => redirectPage('/news')} className={classNames(classes.cursorPointer,pathname === '/news'?classes.borderBottomSolid1p:'', classes.minWidthMaxContent, classes.paddingBottom16, classes.marginRight32, classes.displayBLock)}>
                    News
              </div>
              <div style={{fontFamily:'RobotoRegular'}} onClick={() => redirectPage('/hive')} className={classNames(classes.cursorPointer,pathname === '/hive'?classes.borderBottomSolid1p:'', classes.minWidthMaxContent, classes.paddingBottom16, classes.marginRight32, classes.displayBLock)}>
                    Hive
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tabs
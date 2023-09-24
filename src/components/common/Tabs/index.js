import classNames from 'classnames'
import React from 'react'
import { createUseStyles } from 'react-jss'
const useStyles = createUseStyles(theme => ({
   width90:{
    width: '90%'
   },
   marginAuto: {
    margin: 'auto'
   },
   height43:{
    height: 43,
   },
   boxShadow242:{
    boxShadow: 'rgb(242, 242, 242) 0px -1px 0px inset'
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
   height16:{
    height:16,
   },
   paddingBottom50:{
    paddingBottom: 50,
   }

  }))
const Tabs = () => {
  const classes = useStyles()
  return (
    <div className={classNames(classes.paddingBottom50)}>
    {/* 2 div
        1 for padding
        1 for tabs content
    */}
    <div className={classNames(classes.paddingTop24)}></div>
    <div className={classNames( classes.width90, classes.marginAuto)}>
        {/* div for height 16px */}
        <div className={classes.height16}>

        </div>
        <div className={classNames( classes.height43, classes.boxShadow242, classes.overFlowHidden, classes.positionRelative, classes.displayBLock)}>
            <div className={classNames(classes.padding2by0, classes.overFlowYHidden, classes.alignItemsCenter, classes.displayFlex)}>
                <div className={classNames(classes.displayFlex)}>
                    <div className={classNames(classes.borderBottomSolid1p, classes.minWidthMaxContent, classes.paddingBottom16, classes.marginRight32, classes.displayBLock)}>
                        Trending
                    </div>
                    <div className={classNames(classes.minWidthMaxContent, classes.paddingBottom16, classes.marginRight32, classes.displayBLock)}>
                        Following
                    </div>
                    <div className={classNames(classes.minWidthMaxContent, classes.paddingBottom16, classes.marginRight32, classes.displayBLock)}>
                        Latest
                    </div>
                    <div className={classNames(classes.minWidthMaxContent, classes.paddingBottom16, classes.marginRight32, classes.displayBLock)}>
                        News
                    </div>
                    <div className={classNames(classes.minWidthMaxContent, classes.paddingBottom16, classes.marginRight32, classes.displayBLock)}>
                        Hive
                    </div>
                    <div className={classNames(classes.minWidthMaxContent, classes.paddingBottom16, classes.marginRight32, classes.displayBLock)}>
                        DBuzz
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Tabs
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
   height39:{
    height: 39,
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
  }))
const Tabs = () => {
  const classes = useStyles()
  return (
    <>
    {/* 2 div
        1 for padding
        1 for tabs content
    */}
    <div className={classNames()}></div>
    <div className={classNames( classes.width90, classes.marginAuto)}>
        <div className={classNames( classes.height39, classes.boxShadow242, classes.overFlowHidden, classes.positionRelative, classes.displayBLock)}>

        </div>
    </div>
    </>
  )
}

export default Tabs
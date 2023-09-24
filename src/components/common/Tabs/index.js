import classNames from 'classnames'
import React from 'react'
import { createUseStyles } from 'react-jss'
const useStyles = createUseStyles(theme => ({
   width90:{
    width: '90%'
   },
   marginAuto: {
    margin: 'auto'
   }
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
        tabs here
    </div>
    </>
  )
}

export default Tabs
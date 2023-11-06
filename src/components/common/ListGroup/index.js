import React, { useEffect, useState } from 'react'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles(theme => ({
  container: {
    marginTop: 15,
    backgroundColor: theme.right.list.background,
    borderRadius: '5px 5px',
  },
  containerScroll: {
    marginTop: 6,
    backgroundColor: theme.right.list.background,
    borderRadius: '5px 5px',
  },
  wrapper: {
    width: '100%',
    borderBottom: theme.border.primary,
  },
  labelWrapper: {
    width: '95%',
    margin: '0 auto',
  },
  label: {
    color: theme.font.color,
    paddingTop: 10,
    paddingLeft: 5,
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: 'Segoe-Bold',
  },
}))

const ListGroup = (props) => {
  const { children, label } = props
  const classes = useStyles()

  const [isTop, setIstop] = useState(true)

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
    <div className={isTop?classes.container:classes.containerScroll}>
      <div className={classes.wrapper}>
        <div className={classes.labelWrapper}>
          <label className={classes.label}>{label}</label>
        </div>
      </div>
      {children}
      <br />
    </div>
  )
}

export default ListGroup

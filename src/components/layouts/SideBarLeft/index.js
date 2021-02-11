import React from 'react'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles(theme => ({
  items: {
    fontFamily: 'Segoe-Bold',
    width: 'max-content',
    fontSize: 18,
    padding: 8,
    marginBottom: 15,
    ...theme.left.sidebar.items.icons,
    '& a': {
      color: theme.left.sidebar.items.color,
      textDecoration: 'none',
      padding: 6,
      '&:hover': {
        color: '#e53935',
      },
    },
    '&:hover': {
      ...theme.left.sidebar.items.hover,
      borderRadius: '50px 50px',
      cursor: 'pointer',
      '& a': {
        color: '#e53935',
      },
      '& svg': {
        '& path': {
          stroke: '#e53935',
        },
      },
    },
  },
  minifyItems: {
    textAlign: 'left',
    marginBottom: 15,
    ...theme.left.sidebar.items.icons,
    '& a': {
      color: theme.left.sidebar.items.color,
      textDecoration: 'none',
      '&:hover': {
        color: '#e53935',
      },
    },
    '&:hover': {
      cursor: 'pointer',
      '& a': {
        color: '#e53935',
      },
      '& svg': {
        '& path': {
          stroke: '#e53935',
        },
      },
    },
  },
  activeItem: {
    borderRadius: '50px 50px',
    cursor: 'pointer',
    '& a': {
      color: '#e53935',
    },
    '& svg': {
      '& path': {
        stroke: '#e53935',
      },
    },
  },
  navLinkContainer: {
    marginTop: 20,
    fontSize: 14,
  },
  bottom: {
    position: 'absolute',
    bottom: 15,
    height: 'max-content',
    width: '90%',
    borderRadius: '50px 50px',
    cursor: 'pointer',
    ...theme.left.sidebar.bottom.wrapper,
    transitionDuration: '0.3s',
    transitionProperty: 'background-color',
  },
  bottomMinify: {
    position: 'absolute',
    bottom: 15,
    ...theme.left.sidebar.bottom.wrapperMinify,
  },
  inline: {
    display: 'inline-block',
  },
  avatarWrapper: {
    minHeight: 55,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 5,
  },
  sideBarButton: {
    width: '120%',
    marginBottom: 10,
  },
  logoutLabel: {
    fontWeight: 'bold',
    margin: 0,
    padding: 0,
    paddingLeft: 5,
    fontSize: 13,
    color: theme.left.sidebar.logout.label.color,
  },
  logoutUsername: {
    fontWeight: 'bold',
    margin: 0,
    padding: 0,
    paddingLeft: 5,
    fontSize: 12,
    color: theme.left.sidebar.logout.username.color,
  },
  logoutIcon: {
    ...theme.left.sidebar.logout.icon,
  },
  buzzButton: {
    backgroundColor: '#e53935 !important',
    '&:hover': {
      backgroundColor: '#b71c1c !important',
    },
  },
  logoutButtonMinify: {
    ...theme.left.sidebar.bottom.wrapper,
  },
}))

const SideBarLeft = (props) => {
  const classes = useStyles()

  return (
    <React.Fragment>
      <h1 className={classes.items}>
        SIDEBAR LEFT
      </h1>
    </React.Fragment>
  ) 
}

export default SideBarLeft
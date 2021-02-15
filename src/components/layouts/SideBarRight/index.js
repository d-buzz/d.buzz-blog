import React from 'react'
import { createUseStyles } from 'react-jss'
import { useLocation, Link } from 'react-router-dom'
import { SearchField, ListAction, ListGroup, ListLink } from 'components'
import { Spinner } from 'components/elements'
import { pending } from 'redux-saga-thunk'
import { connect } from 'react-redux'
import config from 'config'

const useStyles = createUseStyles({
  search: {
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: '#e6ecf0',
  },
  footer: {
    width: '100%',
    marginTop: 15,
    '& a': {
      color: '#657786',
      fontSize: 14,
      marginRight: 10,
    },
    '& label': {
      color: '#657786',
      fontSize: 14,
    },
  },
  inner: {
    width: '95%',
    margin: '0 auto',
    whiteSpace: 'nowrap !important',
  },
  searchTips: {
    fontSize: 14,
    fontFamily: 'Segoe-Bold',
    '& span': {
      color: '#d32f2f',
      fontWeight: 400,
    },
  },
})

const SideBarRight = (props) => {
  const { user, items, loading, hideSearchBar = false } = props
  const classes = useStyles()
  const location = useLocation()
  const { pathname } = location
  const { isAuthenticated } = user
  let isInSearchRoute = false

  if(pathname.match((/(\/search?)/))) {
    isInSearchRoute = true
  }

  const linkGenerator = (tag) => {
    let link = ''

    if(!isAuthenticated) {
      link = '/'
    }

    link += `tags?q=${tag}`

    return link
  }

  const SocialMediaLinks = [
    {
      name: 'Discord',
      label: 'dbuzzAPP',
      imagePath: `${window.location.origin}/discord.png`,
      url: 'https://discord.gg/kCZGPs7',
    },
  ]

  return (
    <React.Fragment>
      {!hideSearchBar && !isInSearchRoute && (<SearchField />)}
      <div style={{ paddingTop: 5 }}>
        <ListGroup label="Top Trends for">
          {items.slice(0, 5).map((item) => (
            <ListAction href={linkGenerator(item.name)} key={`${item.name}-trend`} label={`#${item.name}`} subLabel={`${item.comments + item.top_posts} Buzz's`} />
          ))}
          <Spinner size={50} loading={loading}/> 
        </ListGroup>
      </div>
      {/* <div style={{ paddingTop: 15 }}>
        <ListGroup label="Top Trending Communities">
          {items.slice(0, 5).map((item) => (
            <ListAction href={linkGenerator(item.name)} key={`${item.name}-trend`} label={`#${item.name}`} subLabel={`${item.comments + item.top_posts} Buzz's`} />
          ))}
          <Spinner size={50} loading={loading}/> 
        </ListGroup>
      </div> */}
      <div style={{ paddingTop: 15 }}>
        <ListGroup label="Be in touch with us">
          {SocialMediaLinks.map((item) => (
            <ListLink key={`${item.name}-links`} title={item.name} label={`@${item.label}`} imagePath={item.imagePath} href={item.url} />
          ))}
        </ListGroup>
      </div>
      <div className={classes.footer}>
        <right>
          <div className={classes.inner}>
            <Link to="/org/en/tos">Terms of Service</Link>
            <Link to="/org/en/privacy">Privacy Policy</Link>
            <Link to="/org/en/disclaimer">Disclaimer</Link>
            <br />
            <Link to="/org/en/getstarted">Get Started</Link>
            <Link to="/developers">Developers</Link>
            <br />
            <label>&copy; Dataloft, LLC&nbsp; - <i>v.{config.VERSION}</i></label>
          </div>
        </right>
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => ({
  user: state.auth.get('user'),
  loading: pending(state, 'GET_TRENDING_TAGS_REQUEST'),
  items: state.posts.get('tags'),
})

export default connect(mapStateToProps)(SideBarRight)

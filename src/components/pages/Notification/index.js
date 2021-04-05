import React, { useEffect } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import moment from 'moment'
import { clearNotificationsRequest } from 'store/polling/actions'
import { broadcastNotification } from 'store/interfaces/actions'
import { ContainedButton } from 'components/elements'
import { setPageFrom } from 'store/posts/actions'
import { Link } from 'react-router-dom'
import { Avatar, Spinner } from 'components/elements'
import { connect } from 'react-redux'
import { pending } from 'redux-saga-thunk'
import classNames from 'classnames'
import { createUseStyles } from 'react-jss'
import { bindActionCreators } from 'redux'
import { anchorTop } from 'services/helper'
import { isMobile } from 'react-device-detect'

const addHover = (theme) => {
  let style = {
    '&:hover': {
      ...theme.postList.hover,
    },
  }

  if(isMobile) {
    style = {}
  }

  return style
}

const useStyle = createUseStyles(theme => ({
  row: {
    width: '98%',
    margin: '0 auto',
    paddingTop: 20,
    marginBottom: 10,
    cursor: 'pointer',
    '& label': {
      cusor: 'pointer',
    },
  },
  unread: {
    ...theme.unread,
  },
  wrapper: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 5,
    overflow: 'hidden',
    fontFamily: 'Segoe-Bold',
    fontSize: 14,
    borderBottom: theme.border.primary,
    '& a': {
      color: 'black',
    },
    ...addHover(theme),
    cursor: 'pointer !important',
  },
  inline: {
    display: 'inline-block',
    verticalAlign: 'top',
  },
  left: {
    height: '100%',
    width: 50,
  },
  right: {
    height: 'max-content',
    width: '98%',
  },
  name: {
    fontWeight: 'bold',
    paddingRight: 5,
    marginTop: 0,
    marginBottom: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
  username: {
    color: '#657786',
    paddingTop: 0,
    marginTop: 0,
    marginBottom: 0,
    paddingBottom: 0,
  },
  post: {
    color: '#14171a',
    paddingTop: 0,
    marginTop: -10,
  },
  content: {
    width: '100%',
    '& img': {
      borderRadius: '15px 15px',
    },
    '& iframe': {
      borderRadius: '15px 15px',
    },
    cursor: 'pointer',
  },
  actionWrapper: {
    paddingTop: 10,
  },
  actionWrapperSpace: {
    paddingRight: 30,
  },
  preview: {
    '& a': {
      borderRadius: '10px 10px',
      boxShadow: 'none',
    },
  },
  tags: {
    wordWrap: 'break-word',
    width: 'calc(100% - 60px)',
    height: 'max-content',
    '& a': {
      color: '#d32f2f',
    },
  },
  chips: {
    '&:hover': {
      textDecoration: 'none !important',
    },
    '& span': {
      fontSize: 14,
      fontFamily: 'Segoe-Bold',
      textDecoration: 'none !important',
      '&:hover': {
        textDecoration: 'none !important',
      },
    },
  },
}))


const Notification = (props) => {
  const {
    notifications,
    loading,
    count,
    setPageFrom,
    user,
    clearNotificationsRequest,
  } = props

  const classes = useStyle()
  const { isAuthenticated } = user

  useEffect(() => {
    anchorTop()
    setPageFrom(null)
    // eslint-disable-next-line
  }, [])

  const actionAuthor = (msg) => {
    const author = msg.split(' ')[0]

    return author
  }

  const generateNotifLink = (type, url) => {
    let link
    const split = url.split('/')

    if(type !== 'follow') {
      link = `/${split[0]}/c/${split[1]}`
    } else {
      link = `/${split[0]}/t/buzz`
    }

    return link
  }

  const handleClearNotification = () => {
    clearNotificationsRequest()
      .then(result => {
        if(result.success) {
          broadcastNotification('success', 'Successfully marked all your notifications as read')
        } else {
          broadcastNotification('error', 'Failed marking all notifications as read')
        }
      })
  }

  return (
    <React.Fragment>
      {isAuthenticated && count.unread !== 0 && (
        <div style={{ width: '100%' }}>
          <ContainedButton
            fontSize={12}
            style={{ float: 'left', marginTop: 5, marginBottom: 10 }}
            transparent={true}
            label="Mark all as read"
            loading={loading}
            disabled={loading}
            className={classes.walletButton}
            onClick={handleClearNotification}
          />
        </div>
      )}
      {notifications.map((item, index) => (
        <React.Fragment key={index}>
          <div className={classNames(classes.wrapper, index < count.unread ? classes.unread : '')}>
            <div className={classes.row}>
              <Link to={generateNotifLink(item.type, item.url)} style={{ textDecoration: 'none' }}>
                <Row>
                  <Col xs="auto" style={{ paddingRight: 0 }}>
                    <div className={classes.left}>
                      <Avatar author={actionAuthor(item.msg).replace('@', '')} />
                    </div>
                  </Col>
                  <Col>
                    <div className={classes.right}>
                      <div className={classes.content}>
                        <label className={classes.username}>
                          {item.msg}
                        </label> <br />
                        <label className={classes.username}>
                          {moment(`${item.date}Z`).local().fromNow()}
                        </label>
                      </div>
                    </div>
                  </Col>
                  {/* <Col xs="auto">
                    <Chip
                      className={classes.chips}
                      style={{ border: '1px solid #e53935', marginTop: -5 }}
                      size='small'
                      label={item.type}
                      color="secondary"
                      variant="outlined"
                    />
                  </Col> */}
                </Row>
              </Link>
            </div>
          </div>
        </React.Fragment>
      ))}
      {(!loading && notifications.length === 0) &&
        (<center><br/><h6>You have no notifications</h6></center>)}
      <Spinner loading={loading} />
    </React.Fragment>
  )
}

const mapStateToProps = (state) => ({
  notifications: state.polling.get('notifications'),
  count: state.polling.get('count'),
  user: state.auth.get('user'),
  loading: pending(state, 'POLL_NOTIF_REQUEST'),
})

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({
    setPageFrom,
    clearNotificationsRequest,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Notification)

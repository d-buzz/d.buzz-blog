import React, { useState, useEffect } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { HelmetGenerator } from 'components'
import { Avatar } from 'components/elements'
import { useLocation, useHistory } from 'react-router-dom'
import Chip from '@material-ui/core/Chip'
import classNames from 'classnames'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles(theme => ({
  cover: {
    height: 280,
    width: '100%',
    overFlow: 'hidden',
    '& img': {
      borderRadius: '5px 5px 0 0',
      height: '100%',
      width: '100%',
      objectFit: 'cover',
      overFlow: 'hidden',
    },
  },
  wrapper: {
    width: '100%',
    margin: '0 auto',
    height: 'max-content',
    borderRadius: '5px', 
    backgroundColor: theme.background.secondary,
  },
  avatar: {
    marginTop: -90,
  },
  tabContainer: {
    '& span.MuiTabs-indicator': {
      backgroundColor: '#e53935 !important',
    },
  },
  paragraph: {
    padding: 0,
    margin: 0,
    fontSize: 14,
    ...theme.font,
  },
}))



const Profile = (props) => {
  const classes = useStyles()
  const history = useHistory()
  const location = useLocation()
  const { pathname } = location
  const [index, setIndex] = useState(0)

  const onChange = (e, index) => {
    setIndex(index)
  }

  const handleTabs = (index) => () => {
    let tab = 'buzz'

    if(index === 1) {
      tab = 'comments'
    } else if (index === 2) {
      tab = 'replies'
    }

    history.push(`/@${username}/t/${tab}/`)
  }

  useEffect(() => {
    if(pathname.match(/(\/t\/buzz\/)$|(\/t\/buzz)$/m)) {
      setIndex(0)
    } else if(pathname.match(/(\/t\/comments\/)$|(\/t\/comments)$/m)) {
      setIndex(1)
    } else if(pathname.match(/(\/t\/replies\/)$|(\/t\/replies)$/m)) {
      setIndex(2)
    } else {
      setIndex(0)
    }
  }, [pathname])

  const username = "postnzt"
  const name = "Jhune Carlo Trogelio"
  const reputation = 10000000
  const website = "jhunecarlotrogelio.xyz"
  const hivepower = 1000000
  const following = 10002
  const followers = 1029292
  const about = "wveryaklsdj;al skjd;laksjd l;aksjd;lakjsd ;alksjd "
  const cover_image = "https://images.hive.blog/DQmbzvpt9zYrk7kJGUyqTCAxTaB3tVGPbo6ABeescopuj1B/pA2ZXw.png"
  return (
    <React.Fragment>
      <HelmetGenerator page='Profile' />
      <Container>
        <Row className={classes.wrapper}>
          <div className={classes.cover}>
            {cover_image !== '' && (<img src={`https://images.hive.blog/0x0/${cover_image}`} alt="cover_photo" />)}
          </div>
          <Col>
              <div className={classes.avatar}>
                <Avatar border={true} height="140" author={username} size="medium" />
              </div>
              <Col xs="auto">
                <p className={classNames(classes.paragraph, classes.fullName)}>
                  {name || username}&nbsp;
                  <Chip component="span"  size="small" label={`${reputation} Rep`} />&nbsp;
                  <Chip component="span"  size="small" label={`${parseFloat(hivepower).toFixed(2)} HP`} />
                </p>
              </Col>
              <Row>
                <Col xs="auto">
                  <p className={classes.paragraph}>
                    {about}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col xs="auto">
                  <p className={classes.paragraph}>
                    <a href={website} target="_blank" rel="noopener noreferrer" className={classes.weblink}>
                      {website}
                    </a>
                  </p>
                </Col>
              </Row>
              <Row>
                <Col xs="auto">
                  <p className={classes.paragraph}>
                    {/* <Link className={classes.followLinks} to={`/@${username}/follow/following`}> */}
                      <b>{following}</b> Following
                    {/* </Link>  */}
                    &nbsp;
                    {/* <Link className={classes.followLinks} to={`/@${username}/follow/followers`}> */}
                      <b>{followers}</b> Follower
                    {/* </Link>  */}
                    &nbsp;
                  </p>
                </Col>
              </Row>
              <br />
              <Tabs
                value={index}
                indicatorColor="primary"
                textColor="danger"
                centered
                onChange={onChange}
                className={classes.tabContainer}
              >
                <Tab disableTouchRipple onClick={handleTabs(0)} className={classes.tabs} label="Buzz's" />
                <Tab disableTouchRipple onClick={handleTabs(1)} className={classes.tabs} label="Comments" />
                <Tab disableTouchRipple onClick={handleTabs(2)} className={classes.tabs} label="Replies" />
              </Tabs>
            </Col>  
        </Row>
      </Container>
    </React.Fragment>
  )
}

export default Profile
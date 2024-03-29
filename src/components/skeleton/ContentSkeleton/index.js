import React from 'react'
import Skeleton from 'react-loading-skeleton'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles(theme => ({
  wrapper: {
    height: 200,
    width: '95%',
    margin: '0 auto',
    borderBottom: theme.border.primary,
    '& img': {
      borderRadius: '15px 15px',
    },
    '& iframe': {
      borderRadius: '15px 15px',
    },
  },
  full: {
    width: '100%',
    marginTop: 5,
    borderBottom: theme.border.primary,
  },
  inner: {
    width: '95%',
    margin: '0 auto',
  },
  name: {
    fontWeight: 'bold',
    paddingRight: 5,
    paddingBottom: 0,
    marginBottom: 0,
  },
  username: {
    marginTop: -30,
    color: '#657786',
    paddingBottom: 0,
  },
  meta: {
    color: 'rgb(101, 119, 134)',
    fontSize: 15,
    marginRight: 15,
  },
  strong: {
    color: 'black !important',
  },
  link: {
    color: 'black',
    '&:hover': {
      color: 'black',
    },
  },
}))

const ContentSkeleton = ({ loading }) => {
  const classes = useStyles()

  return (
    <React.Fragment>
      {loading && (
        <React.Fragment>
          <div className={classes.wrapper}>
            <React.Fragment>
              <br />
              <Row>
                <Col xs="auto" style={{ paddingRight: 0 }}>
                  <Skeleton circle={true} height={50} width={50} />
                </Col>
                <Col style={{ paddingLeft: 10 }}>
                  <div style={{ marginTop: 2 }}>
                    <p className={classes.name}>
                      <Skeleton height={10} width={120} />
                    </p>
                    <br />
                    <p className={classes.username}>
                      <Skeleton height={10} width={120} />
                    </p>
                  </div>
                </Col>
              </Row>
              <Skeleton height={10}/>
              <Skeleton height={10}/>
              <Skeleton height={10}/>
              <br />
            </React.Fragment>
            <br />
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

export default ContentSkeleton

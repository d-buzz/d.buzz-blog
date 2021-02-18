import React from 'react'
import { connect } from 'react-redux'
import {
  getContentRequest,

} from 'store/posts/actions'

import { createUseStyles } from 'react-jss'
import { bindActionCreators } from 'redux'
import { pending } from 'redux-saga-thunk'


const useStyles = createUseStyles(theme => ({
  wrapper: {
    width: '95%',
    margin: '0 auto',
    marginTop: 0,
    borderBottom: theme.border.primary,
    '& img': {
      borderRadius: '15px 15px',
    },
    '& iframe': {
      borderRadius: '15px 15px',
    },
  },
 
}))

const Content = (props) => {
  const {
    loadingContent,
    content,
  } = props

  const { author } = content
  console.log('this is the author')
  console.log({author})

  return (
    <React.Fragment>
      {!loadingContent && (
        <React.Fragment>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <h1>SAmpleakjsdlkjasldkj</h1>
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

const mapStateToProps = (state) => ({
  loadingContent: pending(state, 'GET_CONTENT_REQUEST'),
  content: state.posts.get('content'),
})

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({
    getContentRequest,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Content)

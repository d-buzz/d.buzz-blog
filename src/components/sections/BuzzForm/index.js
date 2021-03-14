import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import { TextArea, ContainedButton } from 'components/elements'
import { MarkdownViewer } from 'components'
import { createUseStyles } from 'react-jss'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { WithContext as ReactTags } from 'react-tag-input'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline'
import Editor from 'react-postnzt-markdown'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { publishPostRequest, setPageFrom } from 'store/posts/actions'
import { pending } from 'redux-saga-thunk'
import { broadcastNotification } from 'store/interfaces/actions'
import { useHistory } from 'react-router-dom'

const useStyles = createUseStyles(theme => ({
  container: {
    width: '100%',
    margin: 10,
    borderRadius: 5,
  },
  clearPadding: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  tagWrapper: {
    borderRadius: '5px !important',
    border: 'none',
    fontSize: 'small',
    width: '100%',
    padding: 5,
  },
}))

const KeyCodes = {
  comma: 188,
  enter: 13,
}

const delimiters = [KeyCodes.comma, KeyCodes.enter]

const BuzzForm = (props) => {
  const classes = useStyles()
  const history = useHistory()
  const { 
    publishPostRequest, 
    publishing, 
    setPageFrom,
    onHide,
    broadcastNotification,
  } = props
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [tags, setTags] = useState([])
  const [preview, setPreview] = useState(false)

  const onChange = (e) => {
    const { target } = e
    const { name } = target
    const { value } = target
   
    if (name === 'title-area') {
      setTitle(value)
    }
  }

  const handleBodyonChange = (e) => {
    setBody(e)
  }

  const handleClickOnPreview = (e) => {
    const { target } = e
    const { name } = target
    console.log({name})

    if (name === 'preview') {
      setPreview(!preview)
      console.log({preview})
    }
  }

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i))
  }

  const handleAddition = (tag) => {
    tag.id = tag.id.split(" ").join("")
    tag.text = tag.text.split(" ").join("")
    tag.text = tag.text.replace('#', '')
    setTags([...tags, tag])
  }

  const handleDrag = (tag, currPos, newPos) => {
    const tagsArray = [...tags]
    const newTags = tagsArray.slice()

    newTags.splice(currPos, 1)
    newTags.splice(newPos, 0, tag)

    setTags(newTags)
  }

  const moveCaretAtEnd = (e) => {
    var temp_value = e.target.value
    e.target.value = ''
    e.target.value = temp_value
  } 

  const handleClickHelp = () => {
    const windows = window.open('https://www.markdownguide.org/basic-syntax/')
    windows.blur()
  }

  const handleClickPublishPost = () => {
    console.log('click')
    publishPostRequest(title, body, tags)
    console.log('went')
      // .then((data) => {
      //   if (data.success) {
      //     setPageFrom(null)
      //     const { author, permlink } = data
      //     onHide(true)
      //     broadcastNotification('success', 'You successfully published a post')
      //     history.push(`/@${author}/c/${permlink}`)
      //   } else {
      //     broadcastNotification('error', data.errorMessage)
      //   }
      // })
  }

  return (
    <React.Fragment>
      <Container>
        <Row>
          <div style={{ width: '100%', padding: 20 }}>
            {!preview && (
              <React.Fragment>
                <h4>Blog Post</h4>
                <div onClick={handleClickHelp} style={{ float: 'right', marginTop: -35 }}>
                  <HelpOutlineIcon />
                </div>
                <hr />
                <TextArea label="Title" minRows={1} name='title-area' value={title} onKeyUp={onChange} onKeyDown={onChange} onChange={onChange} autoFocus onFocus={moveCaretAtEnd} />
                <Editor 
                  name='body-area'
                  value={body}
                  onChange={handleBodyonChange}
                  language="en"
                  placeholder="What's in you mind?"
                  height="300px"
                  toolbar={{
                    undo: true,
                    redo: true,
                    bold: true,
                    italic: true,
                    h1: true,
                    h2: true,
                    h3: true,
                    h4: true,
                    code: true,
                    link: true,
                    img: true,
                    // preview: true,
                  }}
                />
                &nbsp;
                <ReactTags
                  placeholder="Add Tags"
                  tags={tags}
                  handleDelete={handleDelete}
                  handleAddition={handleAddition}
                  handleDrag={handleDrag}
                  delimiters={delimiters}
                  autofocus={false}
                  classNames={{
                    tagInputField: classes.tagWrapper,
                  }}
                />
               
              </React.Fragment>
            
            )}
            {preview && (
              <React.Fragment>
                <h4>Blog Preview</h4>
                <div onClick={handleClickHelp} style={{ float: 'right', marginTop: -35 }}>
                  <HelpOutlineIcon />
                </div>
                <hr />
                <strong>
                  <MarkdownViewer content={title} />
                </strong>
                <MarkdownViewer content={body} />
                {(title || body ) && (
                  <ReactTags
                    placeholder="Add Tags"
                    tags={tags}
                    handleDelete={handleDelete}
                    handleAddition={handleAddition}
                    handleDrag={handleDrag}
                    delimiters={delimiters}
                    autofocus={false}
                    classNames={{
                      tagInputField: classes.tagWrapper,
                    }}
                  />   
                )}
              </React.Fragment> 
            )}
          </div>
          <div style={{ marginLeft: 25 }}>
            <ContainedButton
              disabled={ publishing || (title.length === 0 && body.length === 0) }
              label="Buzz"
              onClick={handleClickPublishPost}
            />
           
            <div style={{ float: 'right' }}>
              <FormControlLabel
                className="float-right"
                control={<Switch
                  checked={preview}
                  onChange={handleClickOnPreview}
                  name="preview"
                  color="primary"
                />}
                label="Preview"
              />
            </div>
           
          </div>
          
        </Row>
      </Container>
    </React.Fragment>
  )
}
const mapStateToProps = (state) => ({
  user: state.auth.get('user'),
  publishing: pending(state, 'PUBLISH_POST_REQUEST'),
})

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({
    publishPostRequest,
    setPageFrom,
    broadcastNotification,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(BuzzForm)
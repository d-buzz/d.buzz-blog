import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import { TextArea, ContainedButton } from 'components/elements'
import { EditorToolbar, MarkdownViewer } from 'components'
import { createUseStyles } from 'react-jss'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { WithContext as ReactTags } from 'react-tag-input'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline'

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

const BuzzForm = () => {
  const classes = useStyles()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [tags, setTags] = useState([])
  const [preview, setPreview] = useState(false)

  const onChange = (e) => {
    const { target } = e
    const { name } = target
    const { value } = target
   

    if (name === 'content-area') {
      setBody(value)
    } else if (name === 'title-area') {
      setTitle(value)
    }
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
    alert('help')
  }

  const handleClickPublishPost = () => {
    alert('publish post')
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
                <EditorToolbar /> &nbsp;
                <TextArea label="Title" minRows={1} name='title-area' value={title} onKeyUp={onChange} onKeyDown={onChange} onChange={onChange} autoFocus onFocus={moveCaretAtEnd} />
                <TextArea label="Post Content" minRows={8} name='content-area' value={body} onKeyUp={onChange} onKeyDown={onChange} onChange={onChange} autoFocus onFocus={moveCaretAtEnd} />
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
          </div>
          <div style={{ marginLeft: 25 }}>
            <ContainedButton
              // disabled={loading || publishing || content.length === 0}
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

export default BuzzForm
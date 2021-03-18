import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import { TextArea, ContainedButton } from 'components/elements'
import { MarkdownViewer, PayoutDisclaimerModal } from 'components'
import { createUseStyles } from 'react-jss'
import Tooltip from '@material-ui/core/Tooltip'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { WithContext as ReactTags } from 'react-tag-input'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline'
import Editor from 'react-postnzt-markdown'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { publishPostRequest, setPageFrom } from 'store/posts/actions'
import { pending } from 'redux-saga-thunk'
import HelpIcon from '@material-ui/icons/Help'
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
  tinyInput: {
    height: 25,
    width: 50,
    marginLeft: 5,
    borderRadius: 5,
    borderStyle: 'none',
  },
}))

const KeyCodes = {
  comma: 188,
  enter: 13,
}

const delimiters = [KeyCodes.comma, KeyCodes.enter]

const tooltips = {
  payout: `This is your max accept payout for THIS buzz. You can set different max payouts for each of your buzz's. If you set you payout to "0", any rewards will be sent to the @null account.`,
}

const BuzzForm = (props) => {
  const classes = useStyles()
  const history = useHistory()
  const { 
    publishPostRequest, 
    publishing, 
    setPageFrom,
    hideModalCallback = () => { },
    payoutAgreed,
    broadcastNotification,
  } = props
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [tags, setTags] = useState([])
  const [preview, setPreview] = useState(false)
  const [payout, setPayout] = useState(1.000)
  const [openPayoutDisclaimer, setOpenPayoutDisclaimer] = useState(false)

  const onChange = (e) => {
    const { target } = e
    const { name } = target
    let { value } = target
   
    if (name === 'title-area') {
      setTitle(value)
    } else if (name === 'max-payout') {

      if (!payoutAgreed) {
        setOpenPayoutDisclaimer(true)
      } else {
        if ((value < 0 || `${value}`.trim() === '') && payout !== 0) {
          value = 0.00
        }
        value = value % 1 === 0 ? parseInt(value) : parseFloat(value)
        setPayout(value)
      }
    }
  }

  const handleBodyonChange = (e) => {
    setBody(e)
  }

  const closePayoutDisclaimer = () => {
    setOpenPayoutDisclaimer(false)
  }

  const handleClickOnPreview = (e) => {
    const { target } = e
    const { name } = target

    if (name === 'preview') {
      setPreview(!preview)
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
    publishPostRequest(title, body, tags, payout)
      .then((data) => {
        if (data.success) {
          setPageFrom(null)
          const { author, permlink } = data
          hideModalCallback()
          broadcastNotification('success', 'You successfully published a post')
          history.push(`/@${author}/c/${permlink}`)
        } else {
          broadcastNotification('error', data.errorMessage)
        }
      })
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
            <br /><br />
            <label className={classes.payoutLabel}>Max Payout: </label>
            <input name='max-payout' className={classes.tinyInput} type="number" onChange={onChange} value={payout} required min="0" step="any" />
            <Tooltip title={tooltips.payout} placement="top">
              <HelpIcon classes={{ root: classes.icon }} fontSize='small' />
            </Tooltip>

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
          <PayoutDisclaimerModal show={openPayoutDisclaimer} onHide={closePayoutDisclaimer} />
        </Row>
      </Container>
    </React.Fragment>
  )
}
const mapStateToProps = (state) => ({
  user: state.auth.get('user'),
  payoutAgreed: state.auth.get('payoutAgreed'),
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
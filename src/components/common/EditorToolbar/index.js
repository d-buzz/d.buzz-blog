import React from 'react'
import { createUseStyles } from 'react-jss'
import Tooltip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import {
  BoldIcon,
  ItalicIcon,
  HeadingIcon,
  CodeSlashIcon,
  BlackQouteIcon,
  ListOrderedIcon,
  ListUnorderedIcon,
  LinkIcon,
  ImageUploadIcon,
  TableIcon,
  EmojiIcon,
} from 'components/elements'

const useStyles = createUseStyles(theme => ({
  wrapper: {
    backgroundColor: 'white',
    display: 'table-cell', 
    height: 0,
    border: 'none',
  },
  editorTool: {
    alignItems: 'center',
    display: 'inline-flex',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'gray',
    },
    width: 'auto',
    height: '100%',
    top: '50%',
    bottom: '50%',
    padding: 5,
  },
  toolSeparator: {
    borderLeft: '6px solid blue',
    height: 'initial',
  },
}))

const renderBoldTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    Bold
  </Tooltip>
)

const renderItalicTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    Italic
  </Tooltip>
)

const renderHeadingTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    Headings
  </Tooltip>
)

const renderCodeTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    Code
  </Tooltip>
)

const renderQouteTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    Qoute
  </Tooltip>
)

const renderOrderedListTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    Ordered List
  </Tooltip>
)

const renderUnorderedListTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    Unordered List
  </Tooltip>
)

const renderLinkTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    Link
  </Tooltip>
)

const renderImageTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    Image
  </Tooltip>
)

const renderTableTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    Table
  </Tooltip>
)

const renderEmojiTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
   Emoji
  </Tooltip>
)


const insertText = (before, after = "") => {
  const el = this.getTargetEl()
  if (el) {
    // insertOrReplace(el, before, after)
  }
}

const handleClickBold = () => {
  // insertText("**", "**")
}

const EditorToolbar = (props) => {
  const { body } = props
  const classes = useStyles()

  return (
    <React.Fragment>
      <div className={classes.wrapper}>
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 400 }}
          overlay={renderBoldTooltip}
        >
          <div className={classes.editorTool} onClick={() => { insertText("**", "**")}}>
            <BoldIcon />
          </div>
        </OverlayTrigger>
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 400 }}
          overlay={renderItalicTooltip}
        >
          <div className={classes.editorTool} onClick={handleClickBold}>
            <ItalicIcon />
          </div>
        </OverlayTrigger>
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 400 }}
          overlay={renderHeadingTooltip}
        >
          <div className={classes.editorTool} onClick={handleClickBold} style={{ borderRight: '1px solid gray' }}>
            <HeadingIcon />
          </div>
        </OverlayTrigger>
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 400 }}
          overlay={renderCodeTooltip}
        >
          <div className={classes.editorTool} onClick={handleClickBold}>
            <CodeSlashIcon />
          </div>
        </OverlayTrigger>
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 400 }}
          overlay={renderQouteTooltip}
        >
          <div className={classes.editorTool} onClick={handleClickBold} style={{ borderRight: '1px solid gray' }}>
            <BlackQouteIcon />
          </div>
        </OverlayTrigger>
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 400 }}
          overlay={renderOrderedListTooltip}
        >
          <div className={classes.editorTool} onClick={handleClickBold}>
            <ListOrderedIcon />
          </div>
        </OverlayTrigger>
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 400 }}
          overlay={renderUnorderedListTooltip}
        >
          <div className={classes.editorTool} onClick={handleClickBold} style={{ borderRight: '1px solid gray' }}>
            <ListUnorderedIcon />
          </div>
        </OverlayTrigger>
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 400 }}
          overlay={renderLinkTooltip}
        >
          <div className={classes.editorTool} onClick={handleClickBold}>
            <LinkIcon />
          </div>
        </OverlayTrigger>
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 400 }}
          overlay={renderImageTooltip}
        >
          <div className={classes.editorTool} onClick={handleClickBold}>
            <ImageUploadIcon />
          </div>
        </OverlayTrigger>
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 400 }}
          overlay={renderTableTooltip}
        >
          <div className={classes.editorTool} onClick={handleClickBold}>
            <TableIcon />
          </div>
        </OverlayTrigger>
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 400 }}
          overlay={renderEmojiTooltip}
        >
          <div className={classes.editorTool} onClick={handleClickBold}>
            <EmojiIcon />
          </div>
        </OverlayTrigger>
      </div>
    </React.Fragment>
  )
}

export default EditorToolbar

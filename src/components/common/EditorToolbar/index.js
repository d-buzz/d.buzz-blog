import React, { useEffect, useState } from 'react'
import { createUseStyles } from 'react-jss'
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
import {
  renderBoldTooltip,
  renderItalicTooltip,
  renderHeadingTooltip,
  renderCodeTooltip,
  renderQouteTooltip,
  renderOrderedListTooltip,
  renderUnorderedListTooltip,
  renderLinkTooltip,
  renderImageTooltip,
  renderTableTooltip,
  renderEmojiTooltip,
} from 'services/helper'

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


const EditorToolbar = () => {
  const classes = useStyles()
  const [bold, setBold] = useState(false)
  const [italic, setItalic] = useState(false)

  const format = (command) => {
    document.execCommand(command)

    switch (command) {
    case 'bold':
      setBold(true)
      break
    case 'italic':
      setItalic(true)
      break
    default:
      break
    }
  }

  const editorToggleHandler = () => {
    const range = window.getSelection().getRangeAt(0)  /** Saving the selected area */
    const parentList = [] /** will keep a list of all the parent nodes in the selected area */

    let tempBold = false
    let tempItalic = false

    function gettingNodeParents(node) {
      parentList.push(node)
      if (node.parentList) {
        gettingNodeParents(node.parentElement)
      }
    }

    gettingNodeParents(range.startContainer.parentElement)

    parentList.forEach((element) => {
      if (element.tagName === 'B' || element.tagName === 'STRONG') tempBold = true
      if (element.tagName === 'I') tempItalic = true
    })

    setBold(tempBold)
    setItalic(tempItalic)
  }

  useEffect(() => {
    const bodyEditor = document.getElementById('body-area')

    bodyEditor.onclick = editorToggleHandler
    bodyEditor.onkeydown = editorToggleHandler
    bodyEditor.onkeyup = editorToggleHandler
    bodyEditor.onkeypress = editorToggleHandler
    bodyEditor.onchange = editorToggleHandler
  })
 
  return (
    <React.Fragment>
      <div className={classes.wrapper}>
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 400 }}
          overlay={renderBoldTooltip}
        >
          <div className={classes.editorTool} onClick={() => format('bold')}>
            <BoldIcon fill={bold ? 'red' : null} />
          </div>
        </OverlayTrigger>
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 400 }}
          overlay={renderItalicTooltip}
        >
          <div className={classes.editorTool} onClick={() => format('italic')}>
            <ItalicIcon fill={italic ? 'red' : null} />
          </div>
        </OverlayTrigger>
        <OverlayTrigger
          placement="top"
          delay={{ show: 250, hide: 400 }}
          overlay={renderHeadingTooltip}
        >
          <div className={classes.editorTool} onClick={() => format('bold')} style={{ borderRight: '1px solid gray' }}>
            <HeadingIcon />
          </div>
        </OverlayTrigger>
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 400 }}
          overlay={renderCodeTooltip}
        >
          <div className={classes.editorTool} onClick={() => format('bold')}>
            <CodeSlashIcon />
          </div>
        </OverlayTrigger>
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 400 }}
          overlay={renderQouteTooltip}
        >
          <div className={classes.editorTool} onClick={() => format('bold')} style={{ borderRight: '1px solid gray' }}>
            <BlackQouteIcon />
          </div>
        </OverlayTrigger>
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 400 }}
          overlay={renderOrderedListTooltip}
        >
          <div className={classes.editorTool} onClick={() => format('bold')}>
            <ListOrderedIcon />
          </div>
        </OverlayTrigger>
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 400 }}
          overlay={renderUnorderedListTooltip}
        >
          <div className={classes.editorTool} onClick={() => format('bold')} style={{ borderRight: '1px solid gray' }}>
            <ListUnorderedIcon />
          </div>
        </OverlayTrigger>
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 400 }}
          overlay={renderLinkTooltip}
        >
          <div className={classes.editorTool} onClick={() => format('bold')}>
            <LinkIcon />
          </div>
        </OverlayTrigger>
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 400 }}
          overlay={renderImageTooltip}
        >
          <div className={classes.editorTool} onClick={() => format('bold')}>
            <ImageUploadIcon />
          </div>
        </OverlayTrigger>
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 400 }}
          overlay={renderTableTooltip}
        >
          <div className={classes.editorTool} onClick={() => format('bold')}>
            <TableIcon />
          </div>
        </OverlayTrigger>
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 400 }}
          overlay={renderEmojiTooltip}
        >
          <div className={classes.editorTool} onClick={() => format('bold')}>
            <EmojiIcon />
          </div>
        </OverlayTrigger>
      </div>
    </React.Fragment>
  )
}

export default EditorToolbar

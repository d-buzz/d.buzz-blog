import React from 'react'
import Modal from 'react-bootstrap/Modal'
import ModalBody from 'react-bootstrap/ModalBody'
import IconButton from '@material-ui/core/IconButton'
import { CloseIcon } from 'components/elements'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles(theme => ({
  modal: {
    '& div.modal-content': {
      margin: '0 auto',
      backgroundColor: theme.background.primary,
      borderRadius: '5px 5px !important',
      border: 'none',
    },
    '@media (max-width: 900px)': {
      width: '97% !important',
      '& div.modal-content': {
        margin: '0 auto',
        width: '97% !important',
      },
    },
  },
  modalBody: {
    paddingLeft: 0,
    paddingRight: 0,
  },
}))
const ContentModal = (props) => {
  const { show, onHide } = props
  const classes = useStyles()

  console.log('value:')
  console.log(onHide)

  return (
    <React.Fragment>
      <Modal
        backdrop="static"
        keyboard="true"
        show={show}
        onHide={onHide}
        dialogClassName={classes.modal}
        animation={true}
        scrollable={true}
        size="lg"
      >
        <ModalBody className={classes.modalBody}>
          <IconButton style={{ float: 'right', marginRight: 10 }} onClick={onHide}>
            <CloseIcon />
          </IconButton>
          <center>
            <h1 style={{ paddingTop: 50 }}>
              Still in Development...
            </h1>
            <br />
            <br />
            <br />
            <img src="https://media.giphy.com/media/xTkcEQACH24SMPxIQg/giphy.gif" alt="" width={200} />
            <br />
            <br />
            <br />
            <br />
            <br />
          </center>
          
        </ModalBody>
      </Modal>
    </React.Fragment>
  )
}

export default ContentModal
import React from 'react'
import Modal from 'react-bootstrap/Modal'
import ModalBody from 'react-bootstrap/ModalBody'
import IconButton from '@material-ui/core/IconButton'
import { BuzzForm } from 'components'
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

const BuzzFormModal = (props) => {
  const { show, onHide } = props
  const classes = useStyles()

  return (
    <React.Fragment>
      <Modal
        className={classes.modal}
        backdrop="static"
        keyboard={false}
        show={show}
        onHide={onHide}
        animation={true}
        scrollable={true}
        size="lg"
      >
        <ModalBody className={classes.modalBody}>
          <IconButton style={{ float: 'right', marginRight: 10 }} onClick={onHide}>
            <CloseIcon />
          </IconButton>
          <center style={{ marginTop: 10 }}><h5>Create Buzz</h5></center>
          <hr style={{ marginTop: 25, marginBottom: -10 }} />
          <BuzzForm />
        </ModalBody>
      </Modal>
    </React.Fragment>
  )
}

export default BuzzFormModal

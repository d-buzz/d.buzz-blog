import React from 'react'
import Modal from 'react-bootstrap/Modal'
import ModalBody from 'react-bootstrap/ModalBody'
import IconButton from '@material-ui/core/IconButton'
import { CloseIcon } from 'components/elements'
import { createUseStyles } from 'react-jss'
import { CreateBuzzForm } from 'components'

const useStyles = createUseStyles(theme => ({
  modal: {
    width: 630,
    '& div.modal-content': {
      margin: '0 auto',
      backgroundColor: theme.background.primary,
      width: 630,
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

  console.log({show})
  console.log({onHide})
  const classes = useStyles()

  return (
    <React.Fragment>
      <Modal
        backdrop="static"
        keyboard={false}
        show={show}
        onHide={onHide}
        dialogClassName={classes.modal}
        animation={false}
      >
        <ModalBody className={classes.modalBody}>
          <IconButton style={{ float: 'right', marginRight: 10 }} onClick={onHide}>
            <CloseIcon />
          </IconButton>
          {/* <CreateBuzzForm modal={true} hideModalCallback={onHide} /> */}
        </ModalBody>
      </Modal>
    </React.Fragment>
  )
}

export default BuzzFormModal

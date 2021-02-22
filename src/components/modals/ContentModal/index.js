import React from 'react'
import { Modal } from 'react-responsive-modal'

const ContentModal = (props) => {
  const { isOpen } = props
  console.log({isOpen})

  
  return (
    <React.Fragment>
      <Modal open={true} >
        <h2>Big modal</h2>
        
      </Modal>
    </React.Fragment>
  )
}

export default ContentModal
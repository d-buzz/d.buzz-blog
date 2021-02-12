import React from 'react'

const GuardedAppFrame = (props) => {
  console.log('guarded frame')
  return (
    <React.Fragment>
      <h1>THIS IS GUARDED FRAME</h1>
    </React.Fragment>
  )
}

export default GuardedAppFrame
import React from 'react'
import Image from 'react-bootstrap/Image'

const Avatar = React.memo((props) => {
  const { author, height = 40, size = 'small', border = false, style = {}, className = {}, onClick = () => {} } = props

  return (
    <React.Fragment>
      <Image
        onClick={onClick}
        src={`https://images.hive.blog/u/${author}/avatar/${size}`}
        roundedCircle
        height={height}
        width={height}
        className={className}
        style={{ border: border ? '2px solid #e61c34' : 'none', backgroundColor: 'white', ...style }}
      />
    </React.Fragment>
  )
})

export default Avatar

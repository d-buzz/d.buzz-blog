import React from 'react'

const ShareIcon = ({size = 25}) => {
  return (
    <svg width={`${size}`} height={`${size}`} viewBox="0 0 71 94" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M52.25 33.1538H60.625C62.8462 33.1538 64.9764 34.0656 66.547 35.6885C68.1176 37.3114 69 39.5126 69 41.8077V83.3462C69 85.6413 68.1176 87.8424 66.547 89.4653C64.9764 91.0883 62.8462 92 60.625 92H10.375C8.15381 92 6.0236 91.0883 4.45298 89.4653C2.88236 87.8424 2 85.6413 2 83.3462V41.8077C2 39.5126 2.88236 37.3114 4.45298 35.6885C6.0236 34.0656 8.15381 33.1538 10.375 33.1538H18.75M52.25 19.3077L35.5 2M35.5 2L18.75 19.3077M35.5 2V61.0625" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  )
}

export default ShareIcon

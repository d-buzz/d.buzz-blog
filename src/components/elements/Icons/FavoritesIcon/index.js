import React from 'react'

const FavoritesIcon = ({size = 25}) => {
  return (
    <svg width={`${size}`} height={`${size}`} viewBox="0 0 80 88" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M63.0225 2V32.5M48.4553 17.4776H78.0449" stroke="black" stroke-width="3" stroke-linecap="round"/>
      <path d="M37.5 2H4C2.89543 2 2 2.89543 2 4V84.3853C2 85.8421 3.50758 86.8101 4.83225 86.2039L30.7065 74.3631C31.2124 74.1316 31.792 74.1213 32.3059 74.3348L61.2328 86.3505C62.5499 86.8977 64 85.9298 64 84.5035V48.5" stroke="black" stroke-width="3" stroke-linecap="round"/>
    </svg>
  )
}

export default FavoritesIcon

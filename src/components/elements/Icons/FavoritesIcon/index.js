import React from 'react'

const FavoritesIcon = ({size = 25}) => {
  return (
    <svg width={`${size}`} height={`${size}`} viewBox="0 0 80 88" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M63.0225 2V32.5M48.4553 17.4776H78.0449" stroke="black" stroke-width="3" stroke-linecap="round"/>
        <path d="M37.5 2H4C2.89543 2 2 2.89543 2 4V84.3853C2 85.8421 3.50758 86.8101 4.83225 86.2039L30.7065 74.3631C31.2124 74.1316 31.792 74.1213 32.3059 74.3348L61.2328 86.3505C62.5499 86.8977 64 85.9298 64 84.5035V48.5" stroke="black" stroke-width="3" stroke-linecap="round"/>
    </svg>

    // <svg width={`${size}`} height={`${size}`}  viewBox="0 0 86 86" fill="none" xmlns="http://www.w3.org/2000/svg">
    // <path d="M43 84C34.891 84 26.9641 81.5954 20.2216 77.0903C13.4792 72.5851 8.22416 66.1818 5.12096 58.69C2.01777 51.1983 1.20584 42.9545 2.78783 35.0013C4.36982 27.0481 8.2747 19.7426 14.0087 14.0086C19.7426 8.27469 27.0481 4.36982 35.0013 2.78782C42.9545 1.20583 51.1983 2.01776 58.69 5.12096C66.1818 8.22415 72.5851 13.4792 77.0903 20.2216C81.5954 26.964 84 34.891 84 43C84 49.7787 82.36 56.1656 79.4444 61.8008L84 84L61.8008 79.4444C56.1701 82.3554 49.7741 84 43 84Z" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    // </svg>
  )
}

export default FavoritesIcon

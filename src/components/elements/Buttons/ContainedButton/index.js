import React from 'react'
import { createUseStyles } from 'react-jss'
import { Spinner } from 'components/elements'
import classNames from 'classnames'

const useStyles = createUseStyles({
  button: {
    backgroundColor: '#e61c34',
    borderRadius: '50px 50px',
    width: 'max-content',
    cursor: 'pointer',
    '& label': {
      cursor: 'pointer',
      paddingTop: 5,
      paddingLeft: 15,
      paddingRight: 15,
      whiteSpace: 'nowrap',
      color: 'white',
      fontFamily: 'Segoe-Bold',
    },
    '&:hover': {
      backgroundColor: '#b71c1c',
    },
  },
  transparentButton: {
    border: '1px solid #e61c34',
    borderRadius: '50px 50px',
    width: 'max-content',
    cursor: 'pointer',
    '& label': {
      cursor: 'pointer',
      paddingTop: 5,
      paddingLeft: 15,
      paddingRight: 15,
      whiteSpace: 'nowrap',
      color: '#e61c34',
      fontWeight: 'bold',
      fontFamily: 'Segoe-Bold',
    },
    '&:hover': {
      backgroundColor: '#b71c1c1c',
    },
  },
  disabledButton: {
    backgroundColor: '#dad1d14d',
    borderRadius: '50px 50px',
    width: 'max-content',
    cursor: 'mouse',
    '& label': {
      cursor: 'mouse',
      paddingTop: 5,
      paddingLeft: 15,
      paddingRight: 15,
      whiteSpace: 'nowrap',
      color: 'white',
      fontFamily: 'Segoe-Bold',
    },
  },
  disabledButtonTransparent: {
    border: '1px solid #e61c34',
    borderRadius: '50px 50px',
    width: 'max-content',
    cursor: 'mouse',
    '& label': {
      cursor: 'mouse',
      paddingTop: 5,
      paddingLeft: 15,
      paddingRight: 15,
      whiteSpace: 'nowrap',
      color: 'white',
      fontFamily: 'Segoe-Bold',
    },
  },
})

const ContainedButton = (props) => {
  const classes = useStyles()
  const {
    label,
    className = {},
    style = {},
    fontSize = 15,
    transparent = false,
    onClick = () => {},
    disabled = false,
    loading = false,
    labelStyle = {},
  } = props

  let buttonClass = classes.button

  if (transparent) {
    buttonClass = classes.transparentButton
  }

  if (disabled) {
    buttonClass = classes.disabledButton
    if (transparent) {
      buttonClass = classes.disabledButtonTransparent
    }
  }

  return (
    <div onClick={!disabled && !loading ? onClick : () => {}} className={classNames(buttonClass, className)} style={style} >
      <label style={{ fontSize: fontSize, ...labelStyle }}>
        {!loading && label}
        {loading && (<Spinner size={20} top={4} loading={true} />)}
      </label>      
    </div>
  )
}

export default ContainedButton

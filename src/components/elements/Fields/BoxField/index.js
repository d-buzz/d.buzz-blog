import React from 'react'
import classNames from 'classnames'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles(theme => ({
  field: {
    padding: 5,
    paddingLeft: 5,
    paddingRight: 5,
    border: 'none',
    backgroundColor: 'transparent',
    width: 'calc(100% - 45px)',
    height: 40,
    '&:focus': {
      outline: 'none',
    },
    '&::placeholder': {
      color: theme.font.color,
    },
    color: theme.font.color,
  },
  box: {
    borderRadius: '5px 5px',
    border: theme.border.primary,
  },
  inline: {
    display: 'inline',
  },
  iconWrapper: {
    paddingLeft: 10,
    paddingRight: 10,
    ...theme.icon,
  },
}))

const IconWrapper = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  )
}

const BoxField = (props) => {
  const classes = useStyles()
  const {
    placeholder = '',
    type = 'text',
    className = {},
    style = {},
    icon = '',
    searchWrapperClass = {},
    defaultValue,
    onChange,
    ...otherProps
  } = props

  let defaultInputStyle = { width: '100%', paddingLeft: 5, paddingRight: 5 }

  if(icon) {
    defaultInputStyle = {}
  }

  const change = (e) => {
    onChange(e)
  }

  return (
    <React.Fragment>
      <div className={classNames(classes.box, className, searchWrapperClass)}>
        <IconWrapper className={classNames(classes.inline, classes.iconWrapper)}>
          {icon}
        </IconWrapper>
        <input
          type={type}
          style={{ ...style, ...defaultInputStyle }}
          placeholder={placeholder}
          className={classNames(classes.field, classes.inline)}
          onChange={change}
          {...otherProps}
        />
      </div>
    </React.Fragment>
  )
}

export default BoxField

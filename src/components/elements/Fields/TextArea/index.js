import React from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles(theme => ({
  field: {
    fontSize: 15,
    resize: 'none',
    width: '100%',
    '&:focus': {
      outline: 'none',
    },
    border: 'none',
    borderRadius: 5,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    ...theme.textArea,
  },
}))

const TextArea = (props) => {
  const classes = useStyles()
  const {
    label,
    minRows = 2,
  } = props

  return (
    <React.Fragment>
      <TextareaAutosize
        minRows={minRows}
        maxRows={15}
        placeholder={label}
        className={classes.field}
        {...props}
      />
    </React.Fragment>
  )
}

export default TextArea
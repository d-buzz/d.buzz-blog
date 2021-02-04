import React, { useState, useEffect } from 'react'
import { ThemeProvider } from 'react-jss'
import { connect } from 'react-redux'
import { getTheme } from 'services/theme'
import { bindActionCreators } from 'redux'
import { getSavedThemeRequest, generateStyles } from 'store/settings/actions'

const ThemeLoader = (props) => {
  const {
    children,
    getSavedThemeRequest,
    generateStyles,
  } = props

  const [loaded, setLoaded] = useState(false)
  
  useEffect(() => {
    getSavedThemeRequest()
      .then(({ mode }) => {
        const theme = getTheme(mode)
        document.body.style.backgroundColor = theme.background.primary
        generateStyles(theme)
        setLoaded(true)
      })
    //eslint-disable-next-line
  }, [])
  
  return (
    <React.Fragment>
      {loaded && (
        <ThemeProvider>
          {children}
        </ThemeProvider>
      )}
    </React.Fragment>
  )
}

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({
    getSavedThemeRequest,
    generateStyles,
  }, dispatch),
})

export default connect(null, mapDispatchToProps)(ThemeLoader)
import React from 'react'
import routes from './routes'
import { withRouter } from 'react-router'
import { createUseStyles } from 'react-jss'
import { Helmet } from 'react-helmet'
import { Init, AuthGuard, ThemeLoader } from 'components'
import { renderRoutes } from 'react-router-config'
import { LastLocationProvider } from 'react-router-last-location'

const useStyles = createUseStyles(theme => ({
  wrapper: {
    overflow: 'hidden !important',
    backgroundColor: theme.backgroundColor.primary,
  },
}))

const AppWrapper = ({ children }) => {
  const classes = useStyles()
  return (
    <div classes={classes.wrapper}>
      {children}
    </div>
  )
}


const App = (props) => {
  return (
    <React.Fragment>  
      <Helmet>
        <meta property="og:title" content="D.Buzz Blog" />
        <meta property="og:description" content="D.Buzz Blog | Blogging for HIVE" />
        <meta property="og:image" content="https://d.buzz/dbuzz.svg" />
        <meta property="title" content="D.Buzz Blog" />
        <meta property="description" content="D.Buzz Blog | Blogging for HIVE" />
        <meta property="image" content="https://d.buzz/dbuzz.svg" />
      </Helmet>
      <LastLocationProvider>
        <ThemeLoader>
          <Init>
            <AuthGuard>
              <AppWrapper>
                {renderRoutes(routes)}
              </AppWrapper>
            </AuthGuard>
          </Init>
        </ThemeLoader>
      </LastLocationProvider>
    </React.Fragment>
  )
}

export default withRouter(App)
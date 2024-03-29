import React, { useEffect } from 'react'
import routes from './routes'
import { withRouter } from 'react-router'
import { createUseStyles } from 'react-jss'
import { Helmet } from 'react-helmet'
import { Init, AuthGuard, ThemeLoader } from 'components'
import { renderRoutes } from 'react-router-config'
import { LastLocationProvider } from 'react-router-last-location'
import { redirectToUserProfile } from './services/helper'

const useStyles = createUseStyles(theme => ({
  wrapper: {
    overflow: 'hidden !important',
    backgroundColor: theme.background.primary,
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

const App = () => {

  useEffect(() => {
    // redirect to user profile if link only contains @username
    redirectToUserProfile()
  }, [])

  return (
    <React.Fragment>
      <React.Suspense fallback={<span> </span>}>
        <Helmet>
          <meta property="og:title" content="Blog | D.Buzz" />
          <meta property="og:description" content="Blog D.Buzz | Blogging for HIVE" />
          <meta property="og:image" content="https://d.buzz/dbuzz.svg" />
          <meta property="title" content="Blog | D.Buzz" />
          <meta property="description" content="Blog D.Buzz | Blogging for HIVE" />
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
      </React.Suspense>
    </React.Fragment>
  )
}

export default withRouter(App)
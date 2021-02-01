import React, { useEffect } from 'react'
import { testRequest } from 'store/tests/actions'
import compose from 'recompose/compose'
import { bindActionCreators } from 'redux'
import { connect} from 'react-redux'
import { Preloader, BrandIcon } from 'components/elements'

const Home = (props) => {
  const { testRequest, data } = props
  
  useEffect(() => {
    testRequest()
    // eslint-disable-next-line
  }, [])

  return (
    <React.Fragment>
      <center>
        <div style={{ width: 200, height: 200 }}>
          <Preloader />
        </div>
        <BrandIcon />
        <h2>{ JSON.stringify(data) }</h2>
      </center>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => ({
  data: state.tests.get('data'),
})

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({
    testRequest,
  }, dispatch)
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(Home)
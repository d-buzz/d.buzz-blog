import React, { useState, useEffect } from 'react'
import { createUseStyles } from 'react-jss'
import { useHistory } from 'react-router'
import { BoxField, SearchIcon } from 'components/elements'
import { isMobile } from 'react-device-detect'
import { connect } from 'react-redux'

const useStyles = createUseStyles(theme => ({
  search: {
    marginBottom: 5,
    marginTop: 5,
    ...theme.search.background,
  },
  searchTips: {
    fontSize: 14,
    fontFamily: 'Segoe-Bold',
    color: theme.font.color,
    '& span': {
      // color: '#d32f2f',
      fontWeight: 400,
    },
  },
}))

const SearchTips = ({ show, className }) => {
  return (
    <React.Fragment>
      {show && (
        <label className={className}>
          You can use <span>@username</span> or <span>#tags</span> to simplify your search
        </label>
      )}
    </React.Fragment>
  )
}

const SearchField = (props) => {
  const classes = useStyles()
  const history = useHistory()
  const { disableTips = false, iconTop = -2, defaultValue, user, dispatch, ...otherProps } = props
  const { isAuthenticated } = user

  const [openTips, setOpenTips] = useState(false)
  const [search, setSearch] = useState('')

  const onMouseEnter = () => {
    setOpenTips(true)
  }

  const onMouseLeave = () => {
    setOpenTips(false)
  }

  const handleSearchKey = (e) => {
    if (e.key === 'Enter') {
      let link = ''
      if (isAuthenticated) {
        link = '/search'
      } else {
        link = 'ug/search'
      }

      link += `/people?q=${encodeURIComponent(search)}`
      history.replace(link)
    }
  }

  const onChange = (e) => {
    const { target } = e
    const { value } = target

    setSearch(value)
  }

  useEffect(() => {
    setSearch(defaultValue)
  }, [defaultValue])

  return (
    <React.Fragment>
      <BoxField
        icon={<SearchIcon top={iconTop} />}
        placeholder={!isMobile ? 'Search Posts': ''}
        className={classes.search}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onKeyDown={handleSearchKey}
        onChange={onChange}
        {...otherProps}
      />
      {!disableTips && !isMobile && (<SearchTips show={openTips || search} className={classes.searchTips} />)}
    </React.Fragment>
  )
}

const mapStateToProps = (state) => ({
  user: state.auth.get('user'),
})

export default connect(mapStateToProps)(SearchField)

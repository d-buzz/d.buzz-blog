import React, { Fragment, useState } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/settings';

const SettingsPage = () => {

  const dispatch = useDispatch();
  const theme = useSelector(state => state.settings.theme);

  const handleEvent = e => {
    dispatch(actions.setTheme(e.target.value));
  }

  return (
    <Fragment>
      <FormControl component="fieldset">
        <FormLabel component="legend">Theme</FormLabel>
        <RadioGroup value={theme} onChange={handleEvent}>
          <FormControlLabel value="nightshade" control={<Radio />} label="Nightshade" />
          <FormControlLabel value="granite" control={<Radio />} label="Granite" />
          <FormControlLabel value="daylight" control={<Radio />} label="Daylight" />
        </RadioGroup>
      </FormControl>
    </Fragment>
  )
}

export default SettingsPage;

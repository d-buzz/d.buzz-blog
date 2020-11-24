import * as types from '../actions/settings';

const initState = {
  isDark: false,
};

export default (state = initState, { isDark, type }) => {

  switch (type) {
    case types.SET_THEME:
      return { ...state, isDark };
    default:
      return { ...state};
  }
};

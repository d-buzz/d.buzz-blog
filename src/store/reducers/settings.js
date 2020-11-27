import * as types from '../actions/settings';

const initState = {
  theme: null,
};

export default (state = initState, { theme, type }) => {

  switch (type) {
    case types.SET_THEME:
      return { ...state, theme };
    default:
      return { ...state};
  }
};

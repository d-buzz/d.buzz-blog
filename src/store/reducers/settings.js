import * as types from '../actions/settings';

const initState = {
  theme: 'nightshade',
};

export default (state = initState, { theme, type }) => {

  console.log({theme, type});

  switch (type) {
    case types.SET_THEME:
      return { ...state, theme };
    default:
      return { ...state};
  }
};

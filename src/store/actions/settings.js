export const SET_THEME = 'SET_THEME';

export const setTheme = theme => ({
  type: SET_THEME,
  theme
});

// export const setTheme = theme => {
//   console.log("Actions: ", theme);

//   return {type: SET_THEME, theme};

// }
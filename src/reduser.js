const reducer = (state = 5, action) => {
  switch (action.type) {
    case 'INC':
      return state + 1;
    case 'DEC':
      return state - 1;
    case 'RL':
      return 0;
    case 'RND':
      return action.value;
    default:
      return state;
  }
}

export default reducer;
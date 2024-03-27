const getIsLoggedIn = state => state.auth.isLoggedIn;

// const getUserName = state => state.auth.user.name;

const getEmail = state => state.auth.user;

const getRole = state => state.auth.role;

const getName = state => state.auth.name;

// const getIsFetchingCurrent = state => state.auth.isFetchingCurrentUser;

const authSelectors = {
  getIsLoggedIn,
  // getUserName,
  // getIsFetchingCurrent,
  getEmail,
  getRole,
  getName,
};
export default authSelectors;

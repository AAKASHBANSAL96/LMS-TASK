const actions = {
  SET_AUTH_USER: "auth/SET_AUTH_USER",
  SET_USER_DATA: "auth/SET_USER_DATA",
  LOG_OUT_USER: "auth/LOG_OUT_USER",
  ADD_BOOKS: "auth/ADD_BOOKS",
  ADD_AUTHORS: "auth/ADD_AUTHORS",
  ADD_STUDENTS: "auth/ADD_STUDENTS",
  ADD_BORROW: "auth/ADD_BORROW",
  DELETE_BORROW: "auth/DELETE_BORROW",

  setAuthUser: (authUser) => (dispatch) =>
    dispatch({
      type: actions.SET_AUTH_USER,
      authUser,
    }),
  setUserData: (userData) => (dispatch) =>
    dispatch({
      type: actions.SET_USER_DATA,
      userData,
    }),

  logOutUser: () => (dispatch) =>
    dispatch({
      type: actions.LOG_OUT_USER,
    }),

  addBooks: (booksData) => (dispatch) =>
    dispatch({
      type: actions.ADD_BOOKS,
      booksData,
    }),

  addAuthors: (authorsData) => (dispatch) =>
    dispatch({
      type: actions.ADD_AUTHORS,
      authorsData,
    }),

  addStudents: (studentsData) => (dispatch) =>
    dispatch({
      type: actions.ADD_STUDENTS,
      studentsData,
    }),

  addBorrow: (borrowData) => (dispatch) =>
    dispatch({
      type: actions.ADD_BORROW,
      borrowData,
    }),

  deleteBorrow: (borrowId) => (dispatch) =>
    dispatch({
      type: actions.DELETE_BORROW,
      borrowId,
    }),
};

export default actions;

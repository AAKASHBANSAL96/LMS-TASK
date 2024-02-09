import types from "./actions";

const initialState = {
  authUser: {},
  userData: [],
  booksData: [],
  authorsData: [],
  studentsData: [],
  borrowData: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_USER_DATA:
      const newUserList = [...state.userData, action.userData];
      return {
        ...state,
        userData: newUserList,
      };

    case types.LOG_OUT_USER:
      // localStorage.clear();
      return {
        ...state,
        authUser: {},
      };

    case types.SET_AUTH_USER:
      return {
        ...state,
        authUser: action.authUser,
      };

    case types.ADD_BOOKS:
      const newBooksList = [...state.booksData, action.booksData];
      return {
        ...state,
        booksData: newBooksList,
      };

    case types.ADD_AUTHORS:
      const newAuthorsList = [...state.authorsData, action.authorsData];
      return {
        ...state,
        authorsData: newAuthorsList,
      };

    case types.ADD_STUDENTS:
      const newStudentsList = [...state.studentsData, action.studentsData];
      return {
        ...state,
        studentsData: newStudentsList,
      };
    case types.ADD_BORROW:
      const newBorrowList = [...state.borrowData, action.borrowData];
      return {
        ...state,
        borrowData: newBorrowList,
      };
      
    case types.DELETE_BORROW:
      // Action should contain the id to be deleted
      const deleteBorrowId = action.borrowId;
      const updatedBorrowData = state.borrowData.filter(
        (item) => item.id !== deleteBorrowId
      );
      return {
        ...state,
        borrowData: updatedBorrowData,
      };
    default:
      return state;
  }
}

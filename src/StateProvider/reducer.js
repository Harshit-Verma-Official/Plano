import moment from "moment";

export const initialState = {
  currentDate: moment().format("YYYY-MM-DD"),
  currentWeek: 1,
  teachers: [],
  currentTeacherId: null,
  currentTeacherName: null,
  currentTasks: [],
};

export const actionTypes = {
  FETCH_TEACHERS: "FETCH_TEACHERS",
  SET_CURRENT_TEACHER: "SET_CURRENT_TEACHER",
  SET_CURRENT_DATE: "SET_CURRENT_DATE",
  SET_CURRENT_TASKS: "SET_CURRENT_TASKS",
  SET_CURRENT_WEEK: "SET_CURRENT_WEEK",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.FETCH_TEACHERS:
      return {
        ...state,
        teachers: action.teachers,
      };

    case actionTypes.SET_CURRENT_TEACHER:
      return {
        ...state,
        currentTeacherId: action.currentTeacherId,
        currentTeacherName: action.currentTeacherName,
      };

    case actionTypes.SET_CURRENT_DATE:
      return {
        ...state,
        currentDate: action.currentDate,
      };

    case actionTypes.SET_CURRENT_TASKS:
      return {
        ...state,
        currentTasks: action.currentTasks,
      };

    case actionTypes.SET_CURRENT_WEEK:
      return {
        ...state,
        currentWeek: action.currentWeek,
      };

    default:
      return state;
  }
};

export default reducer;

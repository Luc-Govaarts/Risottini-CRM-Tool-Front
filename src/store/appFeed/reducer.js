
const initialState = {
  loading: true,
  leads: [],
  SalesCyclePhases: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "LOADING" :
      return {...state, loading: action.payload}
    case "STORE_LEADS":
      return {...state, leads: [...action.payload], loading: false}
    default:
      return state;
  }
};
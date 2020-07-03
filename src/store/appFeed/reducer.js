
const initialState = {
  loading: true,
  leads: [],
  SalesCyclePhases: [],
  contacts: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "LOADING" :
      return {...state, loading: action.payload}
    case "STORE_LEADS":
      return {...state, leads: [...action.payload], loading: false}
    case "STORE_CONTACTS":
      return {...state, contacts: [...action.payload], loading: false}
    case "STORE_NEW_CONTACT":
      return {...state, contacts: [...state.contacts, action.payload]}
    default:
      return state;
  }
};
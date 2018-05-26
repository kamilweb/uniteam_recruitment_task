import { FETCH_ITEMS_BEGIN, FETCH_ITEMS_FAILURE, FETCH_ITEMS_SUCCESS, FORM_SUBMIT, SEARCH_ITEMS } from "./actions";

const initialState = {
  items: [],
  itemsVisible: [],
  formValues: false
};

export const itemFetchReducer = (state = initialState.items, { type, payload }) => {
  switch (type) {
    case FETCH_ITEMS_BEGIN:
      return {
        ...state,
        loading: true
      };

    case FETCH_ITEMS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: payload
      };

    case FETCH_ITEMS_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload.error,
        items: []
      };

    default:
      return state;
  }
};

export const itemFilterReducer = (state = initialState.itemsVisible, { type, payload }) => {
  switch (type) {
    case SEARCH_ITEMS:
      return {
        ...state,
        items: payload
      };
    default:
      return state;
  }
};

export const formSubmitReducer = (state = initialState.formValues, { type, firstName, lastName, employmentStatus }) => {
  switch (type) {
    case FORM_SUBMIT:
      return {
        ...state,
        firstName: firstName,
        lastName: lastName,
        employmentStatus: employmentStatus
      };
    default:
      return state;
  }
};

export const allReducers = {
  items: itemFetchReducer,
  visibleItems: itemFilterReducer,
  formValues: formSubmitReducer
};

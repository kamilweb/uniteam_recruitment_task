import { API } from "../scripts/constants";
import axios from "axios/index";

export const FETCH_ITEMS_BEGIN = "FETCH_ITEMS_BEGIN";
export const FETCH_ITEMS_SUCCESS = "FETCH_ITEMS_SUCCESS";
export const FETCH_ITEMS_FAILURE = "FETCH_ITEMS_FAILURE";
export const SEARCH_ITEMS = "SEARCH_ITEMS";
export const FORM_SUBMIT = "FORM_SUBMIT";

export const fetchItemsBeginAction = () => ({
  type: FETCH_ITEMS_BEGIN
});

export const fetchItemsSuccessAction = data => ({
  type: FETCH_ITEMS_SUCCESS,
  payload: data
});

export const fetchItemsFailureAction = error => ({
  type: FETCH_ITEMS_FAILURE,
  payload: { error }
});

export const fetchItemsAction = () => {
  return dispatch => {
    dispatch(fetchItemsBeginAction());
    axios
      .get(API.PATH)
      .then(res => dispatch(fetchItemsSuccessAction(res.data.slice(0, 10))))
      .catch(err => dispatch(fetchItemsFailureAction(err)));
  };
};

export const searchItemsAction = (items, filter) => ({
  type: SEARCH_ITEMS,
  payload: items.filter(item => item.title.includes(filter))
});

export const formSubmitAction = ({ firstName, lastName, employmentStatus }) => ({
  type: FORM_SUBMIT,
  firstName: firstName,
  lastName: lastName,
  employmentStatus: employmentStatus
});

import {
    GET_WEBSITE_DATA
  } from "../constant";
  
  const initialState = {
    webData: [],
  };
  
  export default function websiteDBReducer(state = initialState, action) {
    switch (action.type) {
      case GET_WEBSITE_DATA:
        return {
          ...state,
          webData: { ...action.data },
        };
      default:
        return {
          ...state,
        };
    }
  }
  
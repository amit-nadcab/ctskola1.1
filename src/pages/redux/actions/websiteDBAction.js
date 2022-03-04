import { GET_WEBSITE_DATA } from "../constant";
// import { getWebsiteData } from "../helpers/api_functions";
import { N_getWebsiteData } from "../helpers/api_functions_new";

export function getWebsite() {
  return (dispatch) =>
    N_getWebsiteData()
      .then((data) => {
        // console.log("websdata: ", data);
        if (data.status === 200) {
          dispatch({ type: GET_WEBSITE_DATA, data: data.params.website });
          return data.params.website;
        }
      })
      .catch((e) => e);
}

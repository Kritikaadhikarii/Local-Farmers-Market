// import axios from "axios";
// import { server } from "../../server";

// // load user
// export const loadUser = () => async (dispatch) => {
//   try {
//     dispatch({
//       type: "LoadUserRequest",
//     });
//     const { data } = await axios.get(`${server}/user/getuser`, {
//       withCredentials: true,
//     });
//     dispatch({
//       type: "LoadUserSuccess",
//       payload: data.user,
//     });
//   } catch (error) {
//     dispatch({
//       type: "LoadUserFail",
//       payload: error.response ? error.response.data.message : error.message,

//     });
//   }
// };


import axios from "axios";
import { server } from "../../server";

// load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });
    // const { data } = await axios.get(`${server}/user/getuser`, {  // Update the endpoint here
    const { data } = await axios.get(`${server}/user/getuser`, {  // Update the endpoint here

      withCredentials: true,
    });
    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoadUserFail",
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

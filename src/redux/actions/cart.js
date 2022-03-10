import Axios from "axios";
import { API_URL } from "../../constants/API";

export const getCartData = (userId) => { // componentdidmount
  return (dispatch) => {
    Axios.get(`${API_URL}/carts`, {
      params:   {
        userId // taking userId's cart
      },
    }).then((result) => {
      // Dispatch to cart reducer dengan payload -> result.data

      dispatch({
        type: "FILL_CART",
        payload: result.data,
      });
    });

    // .catch(() => {
    //   alert("Terjadi kesalahan di server cart reducer");
    // });
  };
};

import { cartProductURL } from './apiURL';
import { apiClient } from '../store';
const cartProductRequest = function () {
      return (apiClient.get(cartProductURL));

}
export default cartProductRequest
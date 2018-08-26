import { cartUpdateURL } from './apiURL';
import { apiClient } from '../store';
const cartUpdateRequest = function (data) {
      return (apiClient.post(cartUpdateURL,data,{
        headers: { 'Content-Type': 'application/json' }
      }));

}
export default cartUpdateRequest
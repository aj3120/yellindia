import { shoppingInfoSendURL } from './apiURL';
import { apiClient } from '../store';
const shoppingInfoSend = function (data) {
    return (apiClient.post(shoppingInfoSendURL,data,{
        headers: { 'Content-Type': 'application/json' }
      }));
}
export default shoppingInfoSend
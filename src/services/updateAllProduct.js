import { allProductURL } from './apiURL';
import { apiClient } from '../store';
const updateAllProduct = function () {
      return (apiClient.get(allProductURL));

}
export default updateAllProduct
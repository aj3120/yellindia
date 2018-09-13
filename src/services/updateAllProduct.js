import { allProductURL } from './apiURL';
import { apiClient } from '../store';
const allProductRequest = function () {
      return (apiClient.get(allProductURL));

}
export default allProductRequest
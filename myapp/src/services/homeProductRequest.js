import { homeProductURL } from './apiURL';
import { apiClient } from '../store';
const homeProductRequest = function () {
      return (apiClient.get(homeProductURL));

}
export default homeProductRequest
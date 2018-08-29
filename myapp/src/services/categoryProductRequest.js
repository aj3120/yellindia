import { categoryProductURL } from './apiURL';
import { apiClient } from '../store';
const categoryProductRequest = function (id) {
      return (apiClient.get(categoryProductURL+id));

}
export default categoryProductRequest
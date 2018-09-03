import { searchProductURL } from './apiURL';
import { apiClient } from '../store';
const searchProductRequest = function (searchText) {
    return (apiClient.post(searchProductURL,searchText,{
        headers: { 'Content-Type': 'application/json' }
      }));

}
export default searchProductRequest
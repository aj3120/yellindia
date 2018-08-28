import { reviewURL } from './apiURL';
import { apiClient } from '../store';
const reviewRequest = function () {
      return (apiClient.get(reviewURL));

}
export default reviewRequest
import Apis, {endpoints} from '../configs/App'

export const getAllCategory = (access_token) => {
    return Apis.get(endpoints['category'])
    .then((response) => {return response.data.results})
    .catch((error) => console.error(error))
}
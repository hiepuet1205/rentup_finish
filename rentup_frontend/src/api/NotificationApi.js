import Apis, {endpoints} from '../configs/App'

export const getAllNotifications = (access_token) => {
    return Apis.get(endpoints['notification'], {
        headers: {
            "Authorization": `Bearer ${access_token}`
        }
    })
    .then((response) => {return response.data})
    .catch((error) => console.error(error))
}
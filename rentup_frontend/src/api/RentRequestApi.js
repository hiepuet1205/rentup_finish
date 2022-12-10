import Apis, {endpoints} from '../configs/App'

export const getAllRentRequestFromTenant = (access_token) => {
    return Apis.get(endpoints['get_all_rent_request_from_tenant'], {
        headers: {
            "Authorization": `Bearer ${access_token}`
        }
    })
    .then((response) => {return response.data})
    .catch((error) => console.error(error))
}

export const getAllConfirmRequestFromTenant = (access_token) => {
    return Apis.get(endpoints['get_all_confirm_request_from_tenant'], {
        headers: {
            "Authorization": `Bearer ${access_token}`
        }
    })
    .then((response) => {return response.data})
    .catch((error) => console.error(error))
}

export const getAllRentRequestFromLandlord = (access_token) => {
    return Apis.get(endpoints['get_all_rent_request_from_landlord'], {
        headers: {
            "Authorization": `Bearer ${access_token}`
        }
    })
    .then((response) => {return response.data})
    .catch((error) => console.error(error))
}

export const cancel_rent_request = (id, access_token) => {
    return Apis.get(endpoints['cancel_rent_request'](id), {
        headers: {
            "Authorization": `Bearer ${access_token}`
        }
    })
    .then((response) => {return response})
    .catch((error) => {
        if (error.response){
            return error.response;
        }
    })
}

export const reject_rent_request = (id, access_token) => {
    return Apis.get(endpoints['reject_rent_request'](id), {
        headers: {
            "Authorization": `Bearer ${access_token}`
        }
    })
    .then((response) => {return response})
    .catch((error) => {
        if (error.response){
            return error.response;
        }
    })
}

export const confirm_rent_request = (id, access_token) => {
    return Apis.get(endpoints['confirm_rent_request'](id), {
        headers: {
            "Authorization": `Bearer ${access_token}`
        }
    })
    .then((response) => {return response})
    .catch((error) => {
        if (error.response){
            return error.response;
        }
    })
}

export const getRentRequestDetails = (id, access_token) => {
    return Apis.get(endpoints['rent_request-detail'](id), {
        headers: {
            "Authorization": `Bearer ${access_token}`
        }
    })
    .then((response) => {return response})
    .catch((error) => console.error(error))
}

export const createRentRequest = (data, access_token) => {
    const formData = new FormData()
    formData.append("message", data.message)
    formData.append("room", data.room)
    
    return Apis.post(endpoints['rent_request'], formData, {
        headers: {
            "Authorization": `Bearer ${access_token}`
        }
    })
    .then((response) => {return response})
    .catch((error) => {
        if (error.response){
            return error.response;
        }
    })
}


import Apis, {endpoints} from '../configs/App'

export const getCurrentUser = (access_token) => {
    return Apis.get(endpoints['current-user'], {
        headers: {
            "Authorization": `Bearer ${access_token}`
        }
    })
    .then((response) => {return response.data})
    .catch((error) => console.error(error))
}

export const updateProfile = (access_token, data) => {
    const formData = new FormData()
    formData.append("email", data.email)
    formData.append("phone", data.phone)
    formData.append("city", data.city)
    formData.append("district", data.district)
    formData.append("ward", data.ward)
    formData.append("linkfb", data.linkfb)
    formData.append("linkin", data.linkin)
    formData.append("linktw", data.linktw)
    formData.append("linkli", data.linkli)
    
    if(data.image) {
        formData.append("image", data.image)
    }
    
    return Apis.patch(endpoints['update-user'], formData, {
        headers: {
            "Authorization": `Bearer ${access_token}`
        }
    })
    .then((response) => {return response})
    .catch((error) => {
        if(error.response){
            return error.response;
        }
    })
}

export const changePassword = (access_token, data) => {
    const formData = new FormData()
    formData.append("old_password", data.old_password)
    formData.append("new_password", data.new_password)
    
    return Apis.patch(endpoints['change-password'], formData, {
        headers: {
            "Authorization": `Bearer ${access_token}`
        }
    })
    .then((response) => {return response})
    .catch((error) => {
        if(error.response){
            return error.response;
        }
    })
}

export const getAllUsers = () => {
    return Apis.get(endpoints['get-all-user'])
    .then((response) => {return response.data.results})
    .catch((error) => console.error(error))
}
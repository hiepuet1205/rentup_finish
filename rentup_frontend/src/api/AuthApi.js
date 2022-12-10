import Apis, {endpoints} from '../configs/App'

export const signinApi = (username, password, client_id, client_secret) => {
    var reqData = {
        "client_id": client_id,
        "client_secret": client_secret,
        "username": username,
        "password": password,
        "grant_type": "password"
    };
    
    return Apis.post(endpoints['login'], Object.keys(reqData).map(function(key) {
        return encodeURIComponent(key) + '=' + encodeURIComponent(reqData[key])
    }).join('&'))
    .then((response) => {return response.data})
    .catch((error) => {
        if (error.response.data) {
            return error.response.data;
        }
    })
}

export const signupApi = (data) => {
    const formData = new FormData()
    formData.append("first_name", data.first_name)
    formData.append("last_name", data.last_name)
    formData.append("email", data.email)
    formData.append("password", data.password)
    formData.append("username", data.username)
    formData.append("phone", data.phone)
    formData.append("city", data.city)
    formData.append("district", data.district)
    formData.append("ward", data.ward)
    formData.append("linkfb", data.linkfb)
    formData.append("linkin", data.linkin)
    formData.append("linktw", data.linktw)
    formData.append("linkli", data.linkli)
    formData.append("image", data.image)
    
    return Apis.post(endpoints['register'], formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    .then((response) => {return response})
    .catch((error) => {
        if (error.response) {
            return error.response;
        }
    })
}

export const getOauth2Info = () => {
    return Apis.get(endpoints['oauth2-info'])
    .then((response) => {return response.data})
    .catch((error) => console.error(error))
}

export const forgetPassword = (data) => {
    const formData = new FormData()
    formData.append("email", data.email)
    
    return Apis.patch(endpoints['forget-password'], formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    })
    .then((response) => {return response})
    .catch((error) => {
        if (error.response) {
            return error.response;
        }
    })
}

export const resetPassword = (token, data) => {
    const formData = new FormData()
    formData.append("new_password", data.new_password)
    
    return Apis.patch(endpoints['reset-password'](token), formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    })
    .then((response) => {return response})
    .catch((error) => {
        if (error.response) {
            return error.response;
        }
    })
}
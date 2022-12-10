import Apis, {endpoints} from '../configs/App'

export const getOwnedHouseApi = (access_token) => {
    return Apis.get(endpoints['get-owned-house'], {
        headers: {
            "Authorization": `Bearer ${access_token}`
        }
    })
    .then((response) => {return response.data})
    .catch((error) => console.error(error))
}

export const createHouseApi = (data, access_token) => {
    const formData = new FormData()
    formData.append("category", data.category)
    formData.append("city", data.city)
    formData.append("district", data.district)
    formData.append("ward", data.ward)
    formData.append("detail", data.detail)
    formData.append("description", data.description)
    formData.append("image", data.image)
    
    return Apis.post(endpoints['house'], formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${access_token}`
        }
    })
    .then((response) => {return response})
    .catch((error) => {
        if (error.response){
            return error.response
        }
    })
}

export const getHouseDetail = (houseId, access_token) => {
    return Apis.get(endpoints['house-detail'](houseId), {
        headers: {
            "Authorization": `Bearer ${access_token}`
        }
    })
    .then((response) => {return response.data})
    .catch((error) => {
        if (error.response){
            return error.response
        }
    })
}

export const deleteHouse = (houseId, access_token) => {
    return Apis.delete(endpoints['house-detail'](houseId), {
        headers: {
            "Authorization": `Bearer ${access_token}`
        }
    })
    .then((response) => {return response})
    .catch((error) => {
        if (error.response){
            return error.response
        }
    })
}

export const editHouse = (houseId, data, access_token) => {
    const formData = new FormData()
    formData.append("category", data.category)
    formData.append("city", data.city)
    formData.append("district", data.district)
    formData.append("ward", data.ward)
    formData.append("detail", data.detail)
    formData.append("description", data.description)
    formData.append("image", data.image)
    
    return Apis.patch(endpoints['house-detail'](houseId), formData, {
        headers: {
            "Authorization": `Bearer ${access_token}`
        }
    })
    .then((response) => {return response})
    .catch((error) => {
        if (error.response){
            return error.response
        }
    })
}
import Apis, {endpoints} from '../configs/App'

export const getAllRoomAvailable = (filter) => {
    return Apis.get(endpoints['room'], {
        params: filter
    })
    .then((response) => {return response.data})
    .catch((error) => console.error(error))
}

export const getRoomByRoomId = (roomId) => {
    return Apis.get(endpoints['room-detail'](roomId),)
    .then((response) => {return response.data})
    .catch((error) => console.error(error))
}

export const getRoomListOfHouse = (houseId, access_token) => {
    return Apis.get(endpoints['get-room-list-of-house'](houseId), {
        headers: {
            "Authorization": `Bearer ${access_token}`
        }
    })
    .then((response) => {return response.data})
    .catch((error) => console.error(error))
}

export const deleteRoom = (roomId, access_token) => {
    return Apis.delete(endpoints['room-detail'](roomId), {
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

export const createRoom = (data, access_token) => {
    const formData = new FormData()
    formData.append("category", data.category)
    formData.append("house", data.house)
    formData.append("area", data.area)
    formData.append("name", data.name)
    formData.append("detail", data.detail)
    formData.append("rentPrice", data.rentPrice)
    formData.append("waterPrice", data.waterPrice)
    formData.append("electricPrice", data.electricityPrice)
    formData.append("servicePrice", data.servicePrice)
    formData.append("image", data.image)
    
    return Apis.post(endpoints['room'], formData, {
        headers: {
            "Content-Type": "multipart/form-data",
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

export const editRoom = (roomId, data, access_token) => {
    const formData = new FormData()
    formData.append("category", data.category)
    formData.append("area", data.area)
    formData.append("name", data.name)
    formData.append("detail", data.detail)
    formData.append("rentPrice", data.rentPrice)
    formData.append("waterPrice", data.waterPrice)
    formData.append("electricPrice", data.electricityPrice)
    formData.append("servicePrice", data.servicePrice)
    formData.append("image", data.image)
    
    return Apis.patch(endpoints['room-detail'](roomId), formData, {
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

export const postRoom = (roomId, access_token) => {
    const formData = new FormData()
    formData.append("active", true)
    
    return Apis.patch(endpoints['room-detail'](roomId), formData, {
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

export const unPostRoom = (roomId, access_token) => {
    const formData = new FormData()
    formData.append("active", false)
    
    return Apis.patch(endpoints['room-detail'](roomId), formData, {
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


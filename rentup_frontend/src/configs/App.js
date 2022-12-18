import axios from "axios"

export let endpoints = {
    "oauth2-info": "/api/oauth2-info/",
    "register": "/api/user/",
    "login": "/o/token/",
    "forget-password": "/api/user/forget_password/",
    "reset-password": tokenChangePassword => `/api/user/${tokenChangePassword}/reset_password/`,
    "change-password": "/api/user/change_password/",
    "get-all-user": "/api/user/",
    "current-user": "/api/user/get_current_user/",
    "update-user": "/api/user/update_profile/",
    "user-detail": (userId) => `/api/user/${userId}/`,
    "category": "/api/category/",
    "category-detail": (categoryId) => `/api/category/${categoryId}/`,
    "house": "/api/house/",
    "get-owned-house": "/api/house/get_owned_house/",
    "house-detail": (houseId) => `/api/house/${houseId}/`,
    "room": "/api/room/",
    "get-room-avalable": "/api/room/get_room_avalable/",
    "room-detail": (roomId) => `/api/room/${roomId}/`,
    "get-room-list-of-house": (houseId) => `/api/room/${houseId}/get_room_list_of_house/`,
    "rent_request": "/api/rent_request/",
    "rent_request-detail": (rentRequestId) => `/api/rent_request/${rentRequestId}/`,
    "get_all_rent_request_from_landlord": "/api/rent_request/get_all_request_from_landlord/",
    "get_all_rent_request_from_tenant": "/api/rent_request/get_all_request_from_tenant/",
    "get_all_confirm_request_from_tenant": "/api/rent_request/get_confirm_request_from_tenant/",
    "cancel_rent_request": (rentRequestId) => `/api/rent_request/${rentRequestId}/cancel_rent_request/`,
    "reject_rent_request": (rentRequestId) => `/api/rent_request/${rentRequestId}/reject_rent_request/`,
    "confirm_rent_request": (rentRequestId) => `/api/rent_request/${rentRequestId}/confirm_rent_request/`,
    "notification": "/api/notification/",
}

export default axios.create({
    baseURL: "http://w42g6.int3306.freeddns.org/"
})

// export default axios.create({
//     baseURL: "http://127.0.0.1:8000/"
// })
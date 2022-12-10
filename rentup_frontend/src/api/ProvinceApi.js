const API_PROVINCE = `https://provinces.open-api.vn/api/`

export const getProvince = () => {
    return fetch(API_PROVINCE, {method: 'GET'})
    .then((response) => {return response.json()})
    .catch((error) => console.error(error))
}

export const getDistrict = (provinceCode) => {
    return fetch(`${API_PROVINCE}p/${provinceCode}?depth=2`, {method: 'GET'})
    .then((response) => {return response.json()})
    .catch((error) => console.error(error))
}

export const getWard = (districtCode) => {
    return fetch(`${API_PROVINCE}d/${districtCode}?depth=2`, {method: 'GET'})
    .then((response) => {return response.json()})
    .catch((error) => console.error(error))
}
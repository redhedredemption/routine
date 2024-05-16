import sendRequest from "./send-request";
const BASE_URL = '/api/medications';

export function getAllMedications() {
    return sendRequest(`${BASE_URL}`, 'GET');
}

export function addMedication(medicationData) {
    return sendRequest(`${BASE_URL}`, 'POST', medicationData);
}

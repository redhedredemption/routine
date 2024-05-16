import sendRequest from "./send-request";
const BASE_URL = '/api/medications';

export function getAllMedications() {
    return sendRequest(`${BASE_URL}`, 'GET');
}

export function getMedicationDetails(medicationId) {
    return sendRequest(`${BASE_URL}/${medicationId}`, 'GET'); 
}

export function addMedication(medicationData) {
    return sendRequest(`${BASE_URL}`, 'POST', medicationData);
}

export function updateMedication(medicationId, medicationData) {
    return sendRequest(`${BASE_URL}/${medicationId}`, 'PUT', medicationData); 
}

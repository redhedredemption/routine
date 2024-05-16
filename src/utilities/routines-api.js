import sendRequest from "./send-request";
const BASE_URL = '/api/routines';

export function getAllRoutines() {
    return sendRequest(`${BASE_URL}`, 'GET');
}

export function getRoutineDetails(routineId) {
    return sendRequest(`${BASE_URL}/${routineId}`, 'GET'); 
}

export function addRoutine(routineData) {
    return sendRequest(`${BASE_URL}`, 'POST', routineData);
}

export function updateRoutine(routineId, routineData) {
    return sendRequest(`${BASE_URL}/${routineId}`, 'PUT', routineData); 
}

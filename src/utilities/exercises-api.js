import sendRequest from "./send-request";
const BASE_URL = '/api/exercises';

export function getAllExercises() {
    return sendRequest(`${BASE_URL}`, 'GET');
}

export function addExercise(exerciseData) {
    return sendRequest(`${BASE_URL}`, 'POST', exerciseData);
}

import sendRequest from "./send-request";
const BASE_URL = '/api/routines';

export function addRoutine(routineData) {
  return sendRequest(BASE_URL, 'POST', routineData);
}


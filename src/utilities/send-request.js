export default async function sendRequest(url, method = 'GET', payload = null) {
  const options = { method, headers: {} };

  if (payload && method !== 'GET') {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(payload);
  }

  const token = getToken();
  if (token) {
    options.headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(url, options);
  if (!res.ok) {
    const errorBody = await res.text(); 
    throw new Error(`Bad Request: ${res.status} - ${errorBody}`);
  }
  return res.json();
}

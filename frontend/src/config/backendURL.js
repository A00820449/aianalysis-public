const baseURL = new URL(process.env.REACT_APP_BACKEND_BASE_URL)

baseURL.pathname = '/api/v1/visualize'
export const visualizeURL = baseURL.toString()

baseURL.pathname = '/api/v1/analize'
export const analizeURL = baseURL.toString()

baseURL.pathname = '/api/v1/statistics'
export const statisticsURL = baseURL.toString()

baseURL.pathname = '/api/v1/upload'
export const uploadURL = baseURL.toString()
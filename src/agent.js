import superagentPromise from 'superagent-promise'
import _superagent from 'superagent'

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'http://localhost:8080/api'
const getBody = res => res.body

const token = null
const tokenPlugin = req => {
  if (token) {
    req.set('authorization', `Token ${token}`)
  }
}

const requests = {
  del: url =>
    superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(getBody),
  get: url =>
    superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(getBody),
  put: (url, body) =>
    superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(getBody),
  post: (url, body) =>
    superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(getBody)
}

const pageQuery = (count, page = 0) => `_limit=${count}&_start=${page * count}`

export const Reviews = {
  all: () =>
    requests.get('/reviews'),
  page: (itemsOnPage, page) =>
    requests.get(`/reviews/?${pageQuery(itemsOnPage, page)}&isPublished=true`)
}

export const Staff = {
  all: () =>
    requests.get('/staff'),
  page: (itemsOnPage, page) =>
    requests.get(`/staff/?${pageQuery(itemsOnPage, page)}`)
}

export const Questions = {
  all: () =>
    requests.get('/questions'),
  page: (itemsOnPage, page) =>
    requests.get(`/questions/?${pageQuery(itemsOnPage, page)}`)
}

export default {
  Reviews,
  Staff,
  Questions
}

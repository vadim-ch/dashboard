// import * as superagent from 'superagent';
// import {AxiosPromise} from 'axios';
// import {GetUserResponseType} from './requests/auth/login';
// import {ApiRequest} from './requests';
//
// // const superagent = superagentPromise(_superagent, global.Promise);
//
// // const API_ROOT = 'https://conduit.productionready.io/api';
// const API_ROOT = 'http://localhost:3001/api';
//
// const encode = encodeURIComponent;
// const responseBody = res => res.body;
// const responseError = res => {
//   return res.response.body;
// };
//
// let token = null;
//
// const requests = {
//   del: url =>
//       superagent
//           .del(`${API_ROOT}${url}`)
//           .set({ 'Authorization': 'Bearer ' + token })
//           .withCredentials(true)
//           .then(responseBody),
//   get: url =>
//       superagent
//           .get(`${API_ROOT}${url}`)
//           .set({ 'Authorization': 'Bearer ' + token })
//           .withCredentials(true)
//           .then(responseBody),
//   put: (url, body) =>
//       superagent
//           .put(`${API_ROOT}${url}`)
//           .set({ 'Authorization': 'Bearer ' + token })
//           .withCredentials(true)
//           .send(body)
//           .then(responseBody),
//   post: (url, body) =>
//       superagent
//           .post(`${API_ROOT}${url}`)
//           .set({ 'Authorization': 'Bearer ' + token })
//           .withCredentials(true)
//           .send(body)
//           .then(responseBody)
// };
//
// const Auth = {
//   user: user =>
//       requests.get(`/user/${user}`),
//   login: (email, password) =>
//       requests.post('/user/login', { email, password }),
//   register: (username, email, password) =>
//       requests.post('/user/register', { username, email, password }),
//   logout: (username) =>
//       requests.post('/user/logout', { username }),
//   refreshToken: (refreshToken) =>
//       requests.post('/user/refresh-token', { refreshToken }),
//   save: user =>
//       requests.put(`/user/${user}`, {})
// };
//
// const Tags = {
//   getAll: () => requests.get('/tags')
// };
//
// const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`;
// const omitSlug = article => Object.assign({}, article, { slug: undefined })
// const Articles = {
//   all: page =>
//       requests.get(`/articles?${limit(10, page)}`),
//   byAuthor: (author, page) =>
//       requests.get(`/articles?author=${encode(author)}&${limit(5, page)}`),
//   byTag: (tag, page) =>
//       requests.get(`/articles?tag=${encode(tag)}&${limit(10, page)}`),
//   del: slug =>
//       requests.del(`/articles/${slug}`),
//   favorite: slug =>
//       requests.post(`/articles/${slug}/favorite`),
//   favoritedBy: (author, page) =>
//       requests.get(`/articles?favorited=${encode(author)}&${limit(5, page)}`),
//   feed: () =>
//       requests.get('/articles/feed?limit=10&offset=0'),
//   get: slug =>
//       requests.get(`/articles/${slug}`),
//   unfavorite: slug =>
//       requests.del(`/articles/${slug}/favorite`),
//   update: article =>
//       requests.put(`/articles/${article.slug}`, { article: omitSlug(article) }),
//   create: article =>
//       requests.post('/articles', { article })
// };
//
// const Comments = {
//   create: (slug, comment) =>
//       requests.post(`/articles/${slug}/comments`, { comment }),
//   delete: (slug, commentId) =>
//       requests.del(`/articles/${slug}/comments/${commentId}`),
//   forArticle: slug =>
//       requests.get(`/articles/${slug}/comments`)
// };
//
// const Profile = {
//   follow: username =>
//       requests.post(`/profiles/${username}/follow`),
//   get: username =>
//       requests.get(`/profiles/${username}`),
//   unfollow: username =>
//       requests.del(`/profiles/${username}/follow`)
// };
//
// export const api = {
//   Articles,
//   Auth,
//   Comments,
//   Profile,
//   Tags
// };

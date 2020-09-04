import $axios from '../axios/$axios';

export const getApplicationInfo = (params) => {
  return new Promise((resolve, reject) => {
    $axios.get('/v1/getApplicationInfo', params).then(resolve).catch(reject);
  });
};

export const login = (params) => {
  return new Promise((resolve, reject) => {
    $axios.post('/v1/user/login', params).then(resolve).catch(reject);
  });
};

export const register = (params) => {
  return new Promise((resolve, reject) => {
    $axios.post(`/v1/user/register?verifyCode=${params.verifyCode}`, params).then(resolve).catch(reject);
  });
};

export const getUserById = (params) => {
  return new Promise((resolve, reject) => {
    $axios.get(`/v1/user/${params.id}`, params).then(resolve).catch(reject);
  });
};

export const sendActiveEmail = (params) => {
  return new Promise((resolve, reject) => {
    $axios.post('/v1/user/sendActiveEmail', params).then(resolve).catch(reject);
  });
};

export const activeAccount = (params) => {
  return new Promise((resolve, reject) => {
    $axios.post('/v1/user/active', params).then(resolve).catch(reject);
  });
};

export const sendPasswordEmail = (params) => {
  return new Promise((resolve, reject) => {
    $axios.post('/v1/user/sendEmail', params).then(resolve).catch(reject);
  });
};

export const updatePassword = (params) => {
  return new Promise((resolve, reject) => {
    $axios.post('/v1/user/password/update', params).then(resolve).catch(reject);
  });
};

export const getLinkStatus = (params) => {
  return new Promise((resolve, reject) => {
    $axios.get('/v1/user/getLinkStatus', params).then(resolve).catch(reject);
  });
};
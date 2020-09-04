import $axios from '../axios/$axios';

export const getAllCourse = (params) => {
  return new Promise((resolve, reject) => {
    $axios.get('/v1/course/all', params).then(resolve).catch(reject);
  });
};

export const getCourseById = (params) => {
  return new Promise((resolve, reject) => {
    $axios.get(`/v1/course/${params.id}`, params).then(resolve).catch(reject);
  });
};

export const addToCart = (params) => {
  return new Promise((resolve, reject) => {
    $axios.post('/v1/shopCart/add', params).then(resolve).catch(reject);
  });
};

export const getCartList = (params) => {
  return new Promise((resolve, reject) => {
    $axios.get('/v1/shopCart/getCartList', params).then(resolve).catch(reject);
  });
};

export const deleteCartById = (params) => {
  return new Promise((resolve, reject) => {
    $axios.delete('/v1/shopCart/deleteCartById', params).then(resolve).catch(reject);
  });
};

 
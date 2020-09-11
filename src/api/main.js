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

export const orderPlace = (params) => {
  return new Promise((resolve, reject) => {
    $axios.post('/v1/order/place', params).then(resolve).catch(reject);
  });
};

export const inquireIsBuy = (params) => {
  return new Promise((resolve, reject) => {
    $axios.get('/v1/order/inquireIsBuy', params).then(resolve).catch(reject);
  });
};

export const getAllOrder = (params) => {
  return new Promise((resolve, reject) => {
    $axios.get('/v1/order/all', params).then(resolve).catch(reject);
  });
};

export const getOrderToPay = (params) => {
  return new Promise((resolve, reject) => {
    $axios.get('/v1/order/orderToPay', params).then(resolve).catch(reject);
  });
};

export const updateOrder = (params) => {
  return new Promise((resolve, reject) => {
    $axios.post('/v1/order/update', params).then(resolve).catch(reject);
  });
};

export const delOrderById = (params) => {
  return new Promise((resolve, reject) => {
    $axios.delete('/v1/order/del', params).then(resolve).catch(reject);
  });
};
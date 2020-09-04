//接受一个包含多个reducer函数的对象，返回一个新的reducer函数
const combineReducers = (reducers) => {
  //整合reducer函数的对象的函数
  return function (state = {}, action) {
    //返回一个整合之后的reducer函数，在dispatch的时候执行对应的
    //准备一个保存所有新的子状态的容器对象
    const newState = {};
    //包含所有reducers函数名的数组 然后forEach遍历所有的key
    Object.keys(reducers).forEach((key) => {
      const childState = state[key]; //状态就是总state得其中的一个子state
      newState[key] = reducers[key](childState, action); //然后得到新的子状态，赋值给对应的key的新state里面
    });
    return newState; //最后返回新的总state对象
  };
};
const formatPrice = (number) => {
  return parseFloat(number)
    .toFixed(2)
    .replace(/(\d{1,3})(?=(\d{3})+(?:\.))/g, '$1,');
};
const guid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export { formatPrice, combineReducers, guid };

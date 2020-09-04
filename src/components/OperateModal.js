import React, { useContext } from 'react';
import { AppContext } from '../hooks/context';
import { Modal } from 'antd';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
const OperateModal = () => {
  const { state, dispatch } = useContext(AppContext);
  const { title, visible, width, status } = state.operateReducer;
  const handleCancel = () => {
    dispatch({ type: 'operate', data: { visible: false } });
  };

  return (
    <>
      <Modal title={title} centered={true} width={width} footer={null} visible={visible} onCancel={() => handleCancel()}>
        {status === 0 ? <LoginForm /> : <RegisterForm />}
      </Modal>
    </>
  );
};

export default OperateModal;

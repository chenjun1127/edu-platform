import React from 'react';
import { Modal } from 'antd';
const CommonModal = (props) => {
  const { title, width, visible, component, closable = true, keyboard = true, maskClosable = true } = props;

  return (
    <>
      <Modal title={title} wrapClassName="app-round-modal" closable={closable} maskClosable={maskClosable} keyboard={keyboard} centered={true} width={width} footer={null} visible={visible} onCancel={() => props.handleCancel(false)}>
        {component}
      </Modal>
    </>
  );
};

export default CommonModal;

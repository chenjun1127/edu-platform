import React from 'react';
import { Modal } from 'antd';
const CommonModal = (props) => {
  const { title, width, visible, component } = props;

  return (
    <>
      <Modal title={title} wrapClassName="app-round-modal"  centered={true} width={width} footer={null} visible={visible} onCancel={() => props.handleCancel(false)}>
        {component}
      </Modal>
    </>
  );
};

export default CommonModal;

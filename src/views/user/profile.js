import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../hooks/context';
import { withRouter } from 'react-router-dom';
import { EditOutlined } from '@ant-design/icons';
import CommonModal from '../../components/CommonModal';
import { getAreaData, getUserById } from '../../api/base';
import { updateUser } from '../../api/base';
import { message, Button, Form, Input, Radio, Cascader } from 'antd';
const Profile = (props) => {
  const { state, dispatch } = useContext(AppContext);
  const { userInfo } = state.userReducer;
  const [visible, setVisible] = useState(false);
  const [list, setList] = useState([]);
  useEffect(() => {
    const getArea = () => {
      getAreaData().then((res) => {
        if (res.data.code === 0) {
          setList(res.data.data);
        }
      });
    };
    getArea();
  }, []);
  const handleCancel = (value) => {
    setVisible(value);
  };
  const getUserInfo = () => {
    getUserById({ id: userInfo.id }).then((res) => {
      if (res.data.code === 0) {
        dispatch({ type: 'login', userInfo: res.data.data });
      } else {
        message.info(res.data.msg, () => {
          localStorage.clear();
        });
      }
    });
  };
  const handleSubmit = (value) => {
    const areaName = value.areaName.join('-');
    const areaCode = value.areaCode.join('-');
    updateUser({ ...value, id: userInfo.id, areaName, areaCode }).then((res) => {
      if (res.data.code === 0) {
        setVisible(false);
        message.info(res.data.msg, 1, () => {
          getUserInfo();
        });
      }
    });
  };
  const handleForm = (form) => {
    form && form.resetFields();
  };

  if (userInfo) {
    return (
      <>
        <div className="user-profile">
          <div className="edit-icon" onClick={() => setVisible(true)}>
            <EditOutlined />
            <span>编辑</span>
          </div>
          <ul>
            <li>
              <div>手机号码：</div>
              <div>{userInfo.phone}</div>
            </li>
            <li>
              <div>姓别：</div>
              <div>{userInfo.sex === 1 ? '男' : '女'}</div>
            </li>
            <li>
              <div>城市：</div>
              <div>{userInfo.areaName}</div>
            </li>
            <li>
              <div>个性签名：</div>
              <div>{userInfo.sign}</div>
            </li>
          </ul>
        </div>
        <CommonModal width={600} visible={visible} component={<ModalContent {...props} list={list} userInfo={userInfo} form={handleForm} submit={handleSubmit} cancel={handleCancel} />} handleCancel={handleCancel} />
      </>
    );
  } else {
    return null;
  }
};
const ModalContent = (props) => {
  const areaNameArr = [];
  const [form] = Form.useForm();
  const onFinish = (values) => {
    // console.log('Received values of form: ', values);
    props.submit({ ...values, areaName: areaNameArr });
  };
  const cancelForm = () => {
    props.cancel(false);
    form.resetFields();
  };

  const onChange = (value, selectedOptions) => {
    selectedOptions.forEach((ele) => {
      areaNameArr.push(ele.name);
    });
  };
  return (
    <div className="modal-common-content">
      <div>
        <Form ref={props.form} onFinish={onFinish} form={form} labelCol={{ span: 4 }} name="modal-form" initialValues={{ sex: '0' }}>
          <Form.Item name="phone" label="手机号码" rules={[{ message: '手机号码不正确', pattern: /^1[3456789]\d{9}$/ }]} initialValues={props.userInfo.name} >
            <Input />
          </Form.Item>
          <Form.Item initialValues={props.userInfo.sex} name="sex" label="姓别">
            <Radio.Group>
              <Radio value="0">女</Radio>
              <Radio value="1">男</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item initialValues={props.userInfo.areaCode.split('-')} name="areaCode" label="地区">
            <Cascader options={props.list} onChange={onChange} fieldNames={{ label: 'name', value: 'code' }} />
          </Form.Item>
          <Form.Item initialValues={props.userInfo.sign} name="sign" label="个姓签名">
            <Input.TextArea type="textarea" rows={4} />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 20, offset: 4 }}>
            <Button type="primary" shape="round" htmlType="submit">
              确定
            </Button>
            <Button shape="round" style={{ marginLeft: '15px' }} onClick={cancelForm}>
              取消
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default withRouter(Profile);

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
    const areaName = Object.prototype.toString.call(value.areaName) === '[object Array]' ? value.areaName.join('-') : value.areaName;
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
    props.submit({ ...values, areaName: areaNameArr.length === 0 ? props.userInfo.areaName : areaNameArr });
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
  const initialValues = {
    name: props.userInfo.name,
    sex: props.userInfo.sex,
    areaCode: props.userInfo.areaCode ? props.userInfo.areaCode.split('-') : '',
    sign: props.userInfo.sign,
    phone: props.userInfo.phone,
  };
  return (
    <div className="modal-common-content">
      <div>
        <Form ref={props.form} onFinish={onFinish} form={form} labelCol={{ span: 4 }} name="modal-form" initialValues={initialValues}>
          <Form.Item name="phone" label="手机号码" rules={[{ message: '手机号码不正确', pattern: /^1[3456789]\d{9}$/ }]}>
            <Input />
          </Form.Item>
          <Form.Item name="sex" label="姓别">
            <Radio.Group>
              <Radio value={0}>女</Radio>
              <Radio value={1}>男</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="areaCode" label="地区">
            <Cascader options={props.list} onChange={onChange} fieldNames={{ label: 'name', value: 'code' }} placeholder="请选择" />
          </Form.Item>
          <Form.Item name="sign" label="个姓签名">
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

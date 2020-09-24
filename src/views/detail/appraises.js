import React, { useContext, useState, useEffect, useCallback } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { AppContext } from '../../hooks/context';
import { Input, Rate, Button, Comment, Avatar, message, Pagination } from 'antd';
import { releaseAppraise, getAppraiseList } from '../../api/main';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.locale('zh-cn');
dayjs.extend(relativeTime);
const Appraises = (props) => {
  const { state } = useContext(AppContext);
  const userInfo = state.userReducer.userInfo;
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [value, setValue] = useState('');
  const [list, setList] = useState([]);
  const [rateValue, setRateValue] = useState(3);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const size = 5;
  const desc = ['超烂啊', '无力吐槽', '太差了', '很差', '一般', '很一般', '优秀', '非常优秀', '非常棒', '简直完美'];
  const handleChange = ({ currentTarget: input }) => {
    setValue(input.value);
  };

  const getList = useCallback(() => {
    getAppraiseList({ params: { courseId: props.data.id, pageSize: size, pageNo: page } }).then((res) => {
      if (res.data.code === 0) {
        setList(res.data.data.list);
        setTotal(res.data.data.total);
        setIsSubmitted(false);
      } else {
        message.info(res.data.msg);
      }
    });
  }, [page, props.data.id]);
  useEffect(() => {
    getList();
  }, [getList]);
  const handleSubmit = () => {
    if (!userInfo) {
      props.history.push('/login');
    } else if (!value) {
      message.info('请输入评价内容');
      return;
    } else {
      setIsSubmitted(true);
      releaseAppraise({ fromUserId: userInfo.id, courseId: props.data.id, content: value, rateStar: rateValue * 2 }).then((res) => {
        if (res.data.code === 0) {
          setValue('');
          message.info('评价成功', () => {
            getList();
            props.func();
          });
          setIsSubmitted(false);
        } else {
          message.info(res.data.msg);
        }
      });
    }
  };
  const handleChangeRate = (value) => {
    setRateValue(value);
  };
  const onPageChange = (page) => {
    setPage(page);
  };
  return (
    <>
      <div className="appraise-editor">
        {parseInt(props.status) === 1 && <Comment avatar={<Avatar src={userInfo.headImg ? userInfo.headImg : require('../../assets/images/default-head.png')} />} content={<Editor onChange={handleChange} onSubmit={handleSubmit} isSubmitted={isSubmitted} value={value} desc={desc} handleChangeRate={handleChangeRate} rateValue={rateValue} />} />}
        {list.length > 0 ? <AppraisesList list={list} total={total} onPageChange={onPageChange} size={size} /> : <div className="appraise-no"> 暂无评价， 快来抢沙发吧！ </div>}
      </div>
    </>
  );
};

const AppraisesList = ({ list, total, size, onPageChange }) => {
  const renderList = () => {
    return list.map((item, index) => {
      return (
        <div key={index} className="appraise-list">
          <Avatar className="appraise-avatar" src={item.fromUser.headImg ? item.fromUser.headImg : require('../../assets/images/default-head.png')} />
          <div className="appraise-content">
            <div className="appraise-title">
              <Link to={`/user/center/${item.fromUser.id}`}> {item.fromUser.name} </Link> <em>发表于{dayjs(item.createTime).fromNow()}</em>
            </div>
            <Rate className="appraise-rate" disabled allowHalf value={item.rateStar / 2} />
            <div className="appraise-text"> {item.content} </div>
          </div>
        </div>
      );
    });
  };
  return (
    <>
      {renderList()}
      <div className="main-pagination">{total > 0 && <Pagination className="app-page" defaultCurrent={1} defaultPageSize={size} total={total} onChange={onPageChange} />}</div>
    </>
  );
};

const Editor = ({ onChange, value, isSubmitted, onSubmit, desc, handleChangeRate, rateValue }) => {
  return (
    <div className="appraise-editor">
      <Input.TextArea rows={3} onChange={onChange} placeholder="说点什么吧！" allowClear value={value} />
      <div className="rate-box">
        <span> 请点击星星为课程评分 </span>
        <Rate allowHalf defaultValue={2.5} onChange={handleChangeRate} value={rateValue} />
        {rateValue ? <span className="ant-rate-text"> {desc[rateValue * 2 - 1]} </span> : ''}
      </div>
      <Button htmlType="submit" loading={isSubmitted} onClick={onSubmit} type="primary">
        评价
      </Button>
    </div>
  );
};
export default withRouter(Appraises);

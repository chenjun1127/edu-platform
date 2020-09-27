import React, { useState, useEffect, useCallback } from 'react';
import TopBar from '../../components/TopBar';
import Footer from '../../components/Footer';
import { searchByKeyword } from '../../api/main';
import { message, Pagination, Input } from 'antd';
import { withRouter, Link } from 'react-router-dom';
const Index = (props) => {
  const searchParams = new URLSearchParams(props.location.search);
  const [keyword, setKeyword] = useState(searchParams.get('keyword'));
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const size = 10;
  const minHeight = document.documentElement.clientHeight - 120 - 48 - 56 - 53;
  const getSearch = useCallback(
    (keyword) => {
      searchByKeyword({ params: { keyword, pageNo: page, pageSize: size } }).then((res) => {
        if (res.data.code === 0) {
          setList(res.data.data.list);
          setTotal(res.data.data.total);
        } else {
          message.info(res.data.msg);
        }
      });
    },
    [page]
  );
  useEffect(() => {
    getSearch(keyword);
  }, [getSearch, keyword]);
  const renderList = () => {
    if (!list.length) return <div className="search-result-no">暂无结果</div>;
    return list.map((item) => {
      return (
        <li key={item.id}>
          <div className="search-list-img">
            <Link to={`/detail/${item.id}`}>
              <img src={item.coverImg} alt={item.title} />
            </Link>
          </div>
          <div className="search-list-text">
            <h1>
              <Link to={`/detail/${item.id}`}>{item.title} </Link>
            </h1>
            <div>{item.summary}</div>
            <div>评分：{item.point}</div>
          </div>
        </li>
      );
    });
  };
  const onChange = (page) => {
    setPage(page);
  };
  const handleSearch = (value) => {
    props.history.replace({ pathname: '/search', search: `keyword=${value.trim()}` });
    getSearch(value.trim());
    setKeyword(value.trim());
  };
  return (
    <>
      <TopBar></TopBar>
      <div className="search-container">
        <div className="search-box">
          <Input.Search size="large" enterButton="搜索" defaultValue={keyword} onSearch={handleSearch} />
        </div>
      </div>
      <div className="search-result">
        搜索出<span>{keyword}</span>的结果共{total}条
      </div>
      <ul className="search-list" style={{ minHeight: minHeight }}>
        {renderList()}
      </ul>
      {total > 0 && (
        <div className="main-pagination" style={{ padding: '20px' }}>
          <Pagination className="app-page" defaultCurrent={1} defaultPageSize={size} total={total} onChange={onChange} />{' '}
        </div>
      )}
      <Footer></Footer>
    </>
  );
};
export default withRouter(Index);

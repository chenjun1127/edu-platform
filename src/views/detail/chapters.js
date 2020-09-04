import React from 'react';
import { withRouter } from 'react-router-dom';
import { guid } from '../../assets/js/utils';
const Chapters = (props) => {
  const list = props.data.chapterList;
  const rendList = () => {
    if (!list.length) return <div>暂无数据</div>;
    let doms = [];
    list.forEach((item,index) => {
      doms.push(<h1 key={item.id}>{item.title}</h1>);
      if (item.episodeList.length) {
        item.episodeList.forEach((e) => {
          doms.push(
            <div className="detail-li" key={guid()}>
              <p>
                <span></span>
                <em>{e.title}</em>
              </p>
            </div>
          );
        });
      }
      doms.push(<div className="line" key={guid()}></div>);
    });
    return doms;
  };
  return <div className="chapter-detail-list">{rendList()}</div>;
};
export default withRouter(Chapters);

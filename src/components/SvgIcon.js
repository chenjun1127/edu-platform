import React from 'react';
const SvgIcon = (props) => {
  const styleObj = {
    display: 'inline-block',
    overflow: 'hidden',
    fontSize: '18px',
    minWidth: '14px',
    width: '1em',
    height: '1em',
  };
  return (
    <i aria-hidden="true" className="anticon">
      <svg style={{...styleObj,...props.style}}>
        <use xlinkHref={'#icon-' + props.name} fill={props.fill} />
      </svg>
    </i>
  );
};
export default SvgIcon;

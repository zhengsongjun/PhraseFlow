import React from 'react';
import { Button, Avatar, Popover } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const UserContent = () => {
  return (
    <ul
      style={{
        listStyle: 'none',
        margin: 0,
        padding: '8px 0',
        minWidth: 120,
      }}
    >
      <li
        style={{
          padding: '8px 16px',
          transition: 'background 0.2s',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = '#f5f5f5')}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
      >
        <Link
          to='/login'
          style={{ color: 'inherit', textDecoration: 'none', display: 'block' }}
        >
          退出登录
        </Link>
      </li>
    </ul>
  );
};

const Header: React.FC<{ layout: string }> = ({ layout }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      {layout === 'mix' && (
        <span style={{ fontWeight: 'bold' }}>🚀 Mix 模式</span>
      )}
      {layout === 'side' && (
        <span style={{ fontWeight: 'bold' }}>🧱 Side 模式</span>
      )}
      <Button type='text' icon={<SettingOutlined />} />
      <Popover placement='bottom' content={<UserContent />}>
        <Avatar src='https://api.dicebear.com/7.x/bottts/svg?seed=user' />
      </Popover>
    </div>
  );
};

export default Header;

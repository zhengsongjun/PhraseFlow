import React from 'react';
import { Button, Avatar } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

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
      <Avatar src='https://api.dicebear.com/7.x/bottts/svg?seed=user' />
    </div>
  );
};

export default Header;

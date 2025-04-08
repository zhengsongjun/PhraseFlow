import * as Icons from '@ant-design/icons';
import React from 'react';

export const renderIcon = (
  icon?: string | React.ReactNode
): React.ReactNode => {
  if (typeof icon === 'string') {
    const IconComponent = (Icons as any)[icon];
    if (IconComponent) {
      return React.createElement(IconComponent); // ✅ 安全创建
    }
    return null;
  }
  return icon;
};

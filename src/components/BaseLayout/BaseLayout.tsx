import React from 'react';
import { ConfigProvider, Layout, theme, App as AntdApp } from 'antd'; // ✅ 加入 App
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useMatch,
} from 'react-router-dom';
import ProLayout from '@ant-design/pro-layout';
import { renderIcon } from '@/utils/renderIcon';
import { RenderRoutes } from './renderRoutes';

interface BaseLayoutProps {
  layoutConfig: any;
  menu: MenuItem[];
  header?: React.ReactNode;
}

const filterMenuItems = (items: MenuItem[]): MenuItem[] => {
  return items
    .filter((item) => !item.disabledShowMenu)
    .map((item) => ({
      ...item,
      icon: renderIcon(item.icon),
      key: item.path,
      children: item.children ? filterMenuItems(item.children) : undefined,
    }));
};

const BaseLayout: React.FC<BaseLayoutProps> = ({
  layoutConfig,
  menu,
  header,
}) => {
  const currentPath = useMatch('*')?.pathname || '';

  const formattedMenu = filterMenuItems(menu);

  return (
    <ConfigProvider
      theme={{
        algorithm:
          layoutConfig.navTheme === 'dark'
            ? theme.darkAlgorithm
            : theme.defaultAlgorithm,
        token: {
          colorPrimary: layoutConfig.colorPrimary,
          borderRadius: layoutConfig.borderRadius,
        },
      }}
    >
      <AntdApp>
        {/* ✅ 用 App 组件包裹整个应用，修复 message 警告 */}
        <ProLayout
          {...layoutConfig}
          menuDataRender={() => formattedMenu}
          menuItemRender={(item, dom) => {
            return <Link to={item.path || '/'}>{dom}</Link>;
          }}
          selectedKeys={[currentPath]}
          headerContentRender={() => (
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                paddingRight: 24,
              }}
            >
              {header}
            </div>
          )}
        >
          <RenderRoutes routes={menu} />
        </ProLayout>
      </AntdApp>
    </ConfigProvider>
  );
};

const LayoutWithRouter: React.FC<BaseLayoutProps> = (props) => {
  return (
    <Router>
      <BaseLayout {...props} />
    </Router>
  );
};

export default LayoutWithRouter;

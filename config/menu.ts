import { MenuItem } from '../types/config';

const menuData: MenuItem[] = [
  {
    path: '/index',
    name: '首页',
    icon: 'UserOutlined',
    element: 'Index',
  },
  {
    path: '/error-records',
    name: '错题本',
    icon: 'UserOutlined',
    element: 'ErrorRecords',
  },
  {
    path: '/smart-article',
    name: '短文',
    icon: 'UserOutlined',
    element: 'SmartArticle',
  },
  {
    path: '/smart-article-game/:id/:type',
    name: '短文练习',
    icon: 'UserOutlined',
    element: 'SmartArticleGame',
    disabledShowMenu: true,
  },
  {
    path: '/game/:id',
    icon: 'xxx',
    element: 'Game',
    name: '游戏',
    disabledShowMenu: true,
  },
  // {
  //   path: '/user',
  //   name: '用户',
  //   icon: 'UserOutlined',
  //   element: 'User',
  //   children: [
  //     {
  //       path: 'config',
  //       name: '用户配置',
  //       icon: 'UserOutlined',
  //       element: 'UserConfig',
  //     },
  //   ],
  // },
  // {
  //   path: '/products',
  //   name: '产品',
  //   icon: 'LaptopOutlined',
  //   element: 'Products',
  // },
  // {
  //   path: '/notifications',
  //   name: '消息',
  //   icon: 'NotificationOutlined',
  //   element: 'Notifications',
  // },
  {
    path: '/article',
    name: '文章',
    icon: 'NotificationOutlined',
    element: 'Article',
  },
  {
    path: '*',
    name: '404',
    element: '404NotFound',
    disabledShowMenu: true,
  },
];

export default menuData;

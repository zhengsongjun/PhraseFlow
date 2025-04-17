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
    path: '/game/:id/:type',
    icon: 'xxx',
    element: 'Game',
    name: '游戏',
    disabledShowMenu: true,
  },
  {
    path: '/article',
    name: '文章',
    icon: 'NotificationOutlined',
    element: 'Article',
    children: [
      {
        name: '文章',
        path: '/article/page',
        icon: 'NotificationOutlined',
        element: 'ArticleTablePage',
      },
      {
        name: '文章',
        path: '/article/create/:id',
        icon: 'NotificationOutlined',
        element: 'AddArticle',
        disabledShowMenu: true,
      },
    ],
  },
  {
    path: '*',
    name: '404',
    element: '404NotFound',
    disabledShowMenu: true,
  },
];

export default menuData;

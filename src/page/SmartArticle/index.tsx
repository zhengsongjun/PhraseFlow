import React, { useState } from 'react';
import {
  Breadcrumb,
  Button,
  Input,
  Modal,
  Pagination,
  Card,
  Typography,
  App,
} from 'antd';
import styles from './index.module.scss';
import { PlusOutlined } from '@ant-design/icons';
import { useProTableRequest } from '@/hook/useTableSearch';
import image from '@/assets/R.jpeg';
import { Link } from 'react-router-dom';
import {
  createSmartArticle,
  getSmartArticleList,
} from '@/services/smartArticle';
const { Title } = Typography;

const SmartArticle: React.FC = () => {
  const { message } = App.useApp();

  const { data, page } = useProTableRequest({
    requestService: getSmartArticleList,
    initialPage: { pageNum: 1, pageSize: 10 },
  });
  const [search, setSearch] = useState('');
  const [visible, setVisible] = useState(false);
  const [newArticle, setNewArticle] = useState({ title: '', descript: '' });

  const handleAdd = async () => {
    if (!newArticle.title || !newArticle.descript) return;
    try {
      setVisible(false);
      setNewArticle({ title: '', descript: '' });
      await createSmartArticle({ ...newArticle });
      message.success('创建成功！');
    } catch (e) {
      message.error('创建失败');
    }
  };

  return (
    <div className={styles.page}>
      <Breadcrumb className={styles.breadcrumb}>
        <Breadcrumb.Item>首页</Breadcrumb.Item>
        <Breadcrumb.Item>文章管理</Breadcrumb.Item>
      </Breadcrumb>

      <div className={styles.header}>
        <Input.Search
          className={styles.searchInput}
          placeholder='搜索文章标题'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          enterButton='搜索'
          allowClear
        />
        <Button
          type='primary'
          icon={<PlusOutlined />}
          onClick={() => setVisible(true)}
        >
          添加文章
        </Button>
      </div>

      <div className={styles.cardList}>
        {data.map((item: any) => (
          <Card
            key={item.title}
            className={styles.card}
            cover={<img alt='cover' src={image} />}
          >
            <Title level={5}>{item.title}</Title>
            <p>{item.content}</p>
            <div className={styles.cardOperator}>
              <Link to={`/smart-article-game/${item.id}`}>开始练习</Link>
              <Button>编辑</Button>
            </div>
          </Card>
        ))}
      </div>

      <Pagination
        current={page.pageNum}
        pageSize={page.pageSize}
        total={10}
        onChange={(e) => {
          console.log(e);
        }}
        className={styles.pagination}
      />

      <Modal
        title='添加短文文章'
        open={visible}
        onOk={handleAdd}
        onCancel={() => setVisible(false)}
      >
        <Input
          placeholder='文章标题'
          value={newArticle.title}
          onChange={(e) =>
            setNewArticle({ ...newArticle, title: e.target.value })
          }
          className={styles.input}
        />
        <Input.TextArea
          placeholder='文章内容'
          value={newArticle.descript}
          onChange={(e) =>
            setNewArticle({ ...newArticle, descript: e.target.value })
          }
          rows={4}
          className={styles.input}
        />
      </Modal>
    </div>
  );
};

export default SmartArticle;

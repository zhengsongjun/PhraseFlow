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
  Popconfirm,
} from 'antd';
import styles from './index.module.scss';
import { PlusOutlined } from '@ant-design/icons';
import { useProTableRequest } from '@/hook/useTableSearch';
import image from '@/assets/R.jpeg';
import { Link, useNavigate } from 'react-router-dom';
import {
  articleControllerCreate,
  deleteArtilceToId,
  getArticleList,
} from '@/services/article';
import PracticeTypeModal from '@/components/PracticeTypeModal/PracticeTypeModal';
const { Title } = Typography;

const ArticlePage: React.FC = () => {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const { data, page } = useProTableRequest({
    requestService: getArticleList,
    initialPage: { pageNum: 1, pageSize: 10 },
  });
  const [search, setSearch] = useState('');
  const [visible, setVisible] = useState(false);
  const [newArticle, setNewArticle] = useState({ title: '', content: '' });
  const [practiceModalVisble, setPracticeModalVisble] = useState(false);
  const [currentArticleId, setCurrentArticleId] = useState('');
  const handleAdd = async () => {
    if (!newArticle.title || !newArticle.content) return;
    try {
      await articleControllerCreate({ ...newArticle });
      setVisible(false);
      setNewArticle({ title: '', content: '' });
      message.success('创建成功！');
      // onSearch(params);
    } catch (e) {
      message.error('创建失败');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteArtilceToId(id); // 假设你的接口是这样
      message.success('删除成功');
      // 可以触发刷新或重新请求文章列表
      window.location.reload(); // 或者调用原来的数据请求函数
    } catch (error) {
      message.error('删除失败');
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
        {data.map((item) => (
          <Card
            key={item.title}
            className={styles.card}
            cover={<img alt='cover' src={image} />}
          >
            <Title level={5}>{item.title}</Title>
            <p>{item.content}</p>
            <div className={styles.cardOperator}>
              <Button
                style={{ marginRight: '12px' }}
                onClick={() => {
                  setCurrentArticleId(item.id);
                  setPracticeModalVisble(true);
                }}
              >
                开始练习
              </Button>
              <Button style={{ marginRight: '10px' }}>
                <Link to={`/article/create/${item.id}`}>编辑</Link>
              </Button>
              <Popconfirm
                title='确定删除该文章吗？'
                onConfirm={() => handleDelete(item.id)}
                okText='删除'
                cancelText='取消'
              >
                <Button danger>删除</Button>
              </Popconfirm>
              {/* <Button style={{ marginRight: '10px' }}>新增段落</Button> */}
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
        title='添加文章'
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
          value={newArticle.content}
          onChange={(e) =>
            setNewArticle({ ...newArticle, content: e.target.value })
          }
          rows={4}
          className={styles.input}
        />
      </Modal>
      <PracticeTypeModal
        onOk={(e) => {
          navigate(`/game/${currentArticleId}/${JSON.stringify(e)}`);
        }}
        onCancel={() => {
          setPracticeModalVisble(false);
          setCurrentArticleId('');
        }}
        onClose={() => {
          setPracticeModalVisble(false);
          setCurrentArticleId('');
        }}
        open={practiceModalVisble}
      />
    </div>
  );
};

export default ArticlePage;

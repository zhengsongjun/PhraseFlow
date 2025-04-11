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
import { PlusOutlined } from '@ant-design/icons';
import { useProTableRequest } from '@/hook/useTableSearch';
import {
  createSmartArticle,
  deleteSmartArticle,
  getSmartArticleList,
} from '@/services/smartArticle';
import PracticeTypeModal from '@/components/PracticeTypeModal/PracticeTypeModal';
import { useNavigate } from 'react-router-dom';
import image from '@/assets/R.jpeg';
import styles from './index.module.scss';
const { Title } = Typography;

const SmartArticle: React.FC = () => {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const { data, page } = useProTableRequest({
    requestService: getSmartArticleList,
    initialPage: { pageNum: 1, pageSize: 10 },
  });
  const [practiceModalVisble, setPracticeModalVisble] = useState(false);
  const [search, setSearch] = useState('');
  const [visible, setVisible] = useState(false);
  const [newArticle, setNewArticle] = useState({ title: '', descript: '' });
  const [currentSmartArticleId, setCurrentSmartArticleId] = useState('');
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
            styles={{ body: { paddingTop: 4, paddingBottom: 40 } }}
          >
            <Title level={5} style={{ marginTop: 4 }}>
              {item.title}
            </Title>
            <p>{item.content}</p>
            <div className={styles.cardOperator}>
              <Button
                style={{ marginRight: '12px' }}
                onClick={() => {
                  setCurrentSmartArticleId(item.id);
                  setPracticeModalVisble(true);
                }}
              >
                开始练习
              </Button>
              <Button style={{ marginRight: '12px' }}>编辑</Button>
              <Button
                style={{ marginRight: '12px' }}
                onClick={() => {
                  deleteSmartArticle(item.id);
                }}
              >
                删除
              </Button>
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
      <PracticeTypeModal
        onOk={(e) => {
          navigate(
            `/smart-article-game/${currentSmartArticleId}/${JSON.stringify(e)}`
          );
        }}
        onCancel={() => {
          setPracticeModalVisble(false);
          setCurrentSmartArticleId('');
        }}
        onClose={() => {
          setPracticeModalVisble(false);
          setCurrentSmartArticleId('');
        }}
        open={practiceModalVisble}
      />
    </div>
  );
};

export default SmartArticle;

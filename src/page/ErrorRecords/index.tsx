import React, { useEffect, useState } from 'react';
import { Card, List, Tag, Typography, Space, Row, Col } from 'antd';
import { CodeOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { Chunk } from '@/services/api/model';
import { getAllErrorRecord } from '@/services/errorRecords';

const { Text } = Typography;

const ErrorRecords = () => {
  const [errorRecordList, setErrorRecordList] = useState<any>([]);
  const init = async () => {
    const list = await getAllErrorRecord();
    setErrorRecordList(list.data);
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <div style={{ padding: 24, background: '#0d1117', minHeight: '100vh' }}>
      <Typography.Title style={{ color: '#58a6ff' }}>错题本</Typography.Title>
      <List
        itemLayout='vertical'
        dataSource={errorRecordList}
        renderItem={(item) => (
          <Card
            key={item.id}
            style={{
              marginBottom: 16,
              background: '#161b22',
              border: '1px solid #30363d',
              borderRadius: 12,
              padding: 16,
            }}
            bodyStyle={{ padding: 0 }}
          >
            <Row justify='space-between' align='middle'>
              <Col span={16}>
                <Text style={{ color: '#c9d1d9' }}>
                  <strong>原文：</strong>
                  {item.title}
                </Text>
                <br />
                <Text style={{ color: '#8b949e', marginLeft: 16 }}>
                  <strong>翻译：</strong>
                  {item.definition}
                </Text>
              </Col>
              <Col span={8} style={{ textAlign: 'right' }}>
                <Tag color='geekblue'>来源：{item.sourceName}</Tag>
                <Tag icon={<ClockCircleOutlined />} color='default'>
                  {item.createdAt}
                </Tag>
              </Col>
            </Row>
          </Card>
        )}
      />
    </div>
  );
};

export default ErrorRecords;

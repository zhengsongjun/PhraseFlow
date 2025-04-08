import React, { useState } from 'react';
import { Tabs, Form, Input, Button, message, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styles from './Login.module.scss';

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const onLogin = async (values: any) => {
    setLoading(true);
    try {
      console.log('登录数据:', values);
      message.success('登录成功');
    } catch (e) {
      message.error('登录失败');
    } finally {
      setLoading(false);
    }
  };

  const onRegister = async (values: any) => {
    setLoading(true);
    try {
      console.log('注册数据:', values);
      message.success('注册成功');
    } catch (e) {
      message.error('注册失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <Card className={styles.card} bordered={false}>
        <div className={styles.title}>🔐 欢迎使用智慧后台系统</div>
        <Tabs defaultActiveKey='login' centered>
          <Tabs.TabPane tab='登录' key='login'>
            <Form layout='vertical' onFinish={onLogin}>
              <Form.Item
                name='username'
                rules={[{ required: true, message: '请输入用户名' }]}
              >
                <Input prefix={<UserOutlined />} placeholder='用户名' />
              </Form.Item>
              <Form.Item
                name='password'
                rules={[{ required: true, message: '请输入密码' }]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder='密码' />
              </Form.Item>
              <Form.Item>
                <Button
                  loading={loading}
                  block
                  type='primary'
                  htmlType='submit'
                >
                  登录
                </Button>
              </Form.Item>
            </Form>
          </Tabs.TabPane>

          <Tabs.TabPane tab='注册' key='register'>
            <Form layout='vertical' onFinish={onRegister}>
              <Form.Item
                name='username'
                rules={[{ required: true, message: '请输入用户名' }]}
              >
                <Input prefix={<UserOutlined />} placeholder='用户名' />
              </Form.Item>
              <Form.Item
                name='password'
                rules={[{ required: true, message: '请输入密码' }]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder='密码' />
              </Form.Item>
              <Form.Item>
                <Button
                  loading={loading}
                  block
                  type='primary'
                  htmlType='submit'
                >
                  注册
                </Button>
              </Form.Item>
            </Form>
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default LoginPage;

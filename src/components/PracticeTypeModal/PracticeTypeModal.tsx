import React, { useState } from 'react';
import { Modal, Checkbox, Button, Space, ModalProps } from 'antd';
import styles from './PracticeTypeModal.module.scss';

const PracticeTypeModal: React.FC<ModalProps> = (props) => {
  const [checkedList, setCheckedList] = useState(['word']);

  const handleChange = (list: any) => {
    setCheckedList(list);
  };

  const handleConfirm = () => {
    props.onOk?.(checkedList as any); // 把选中的值传出去
  };

  return (
    <Modal
      {...props}
      title='选择练习内容'
      footer={null}
      centered
      bodyStyle={{ paddingTop: 24, paddingBottom: 0 }}
    >
      <div className={styles.modalContent}>
        <div className={styles.label}>请选择你要练习的内容：</div>
        <Checkbox.Group
          value={checkedList}
          onChange={handleChange}
          className={styles.checkboxGroup}
        >
          <Checkbox value='word'>单词</Checkbox>
          <Checkbox value='phrase'>短语</Checkbox>
          <Checkbox value='sentence'>句子</Checkbox>
        </Checkbox.Group>
        <div className={styles.footer}>
          <Space>
            <Button onClick={props.onCancel}>取消</Button>
            <Button type='primary' onClick={handleConfirm}>
              确定
            </Button>
          </Space>
        </div>
      </div>
    </Modal>
  );
};

export default PracticeTypeModal;

import React, { useEffect, useState } from 'react';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  Input,
  Button,
  Space,
  Upload,
  message,
  Select,
  UploadProps,
} from 'antd';
import {
  SaveOutlined,
  UploadOutlined,
  PlusOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import { nanoid } from 'nanoid';
import styles from './index.module.scss';
import { useParams } from 'react-router-dom';
import useToArticleIdGetChunk, {
  ParagraphContainer,
} from '@/hook/serviceCustomHook/useToArticleIdGetChunk';
import { updateArticleContent } from '@/services/article';

interface ChunkItem {
  id: string;
  sort: number;
  text: string;
  phonetic: string;
  definition: string;
  chunkType: string;
}

interface ListItem {
  id: string;
  sort: number;
  text: string;
  translation: string;
  chunks: ChunkItem[];
}

interface SortableItemProps {
  item: ListItem;
  index: number;
  onChange: (index: number, newItem: ListItem) => void;
  onDelete: (index: number) => void;
  onAddChunk: (index: number) => void;
  onChunkDragEnd: (event: DragEndEvent, index: number) => void;
}

interface ChunkCardProps {
  chunk: ChunkItem;
  chunkIndex: number;
  onChange: (field: keyof ChunkItem, value: string) => void;
  onDelete: () => void;
}

const chunkTypeOptions = [
  { label: 'Prefix', value: 'prefix' },
  { label: 'Root', value: 'root' },
  { label: 'Suffix', value: 'suffix' },
  { label: 'Word', value: 'word' },
];

function SortableItem({
  item,
  index,
  onChange,
  onDelete,
  onAddChunk,
  onChunkDragEnd,
}: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const handleChunkChange = (
    chunkIndex: number,
    field: keyof ChunkItem,
    value: string
  ) => {
    const updatedChunks = [...item.chunks];
    updatedChunks[chunkIndex][field] = value;
    onChange(index, { ...item, chunks: updatedChunks });
  };

  const handleDeleteChunk = (chunkIndex: number) => {
    const updatedChunks = item.chunks
      .filter((_, i) => i !== chunkIndex)
      .map((c, i) => ({ ...c, sort: i + 1 }));
    onChange(index, { ...item, chunks: updatedChunks });
  };

  return (
    <div className={styles.card}>
      <div
        ref={setNodeRef}
        className={styles.dragHandle}
        {...attributes}
        {...listeners}
      >
        <MenuOutlined style={{ marginRight: 8 }} />
        Sort: {item.sort}
      </div>
      <Input
        className={styles.input}
        placeholder='Text'
        value={item.text}
        onChange={(e) => onChange(index, { ...item, text: e.target.value })}
      />
      <Input
        className={styles.input}
        placeholder='Translation'
        value={item.translation}
        onChange={(e) =>
          onChange(index, { ...item, translation: e.target.value })
        }
      />
      <DndContext
        onDragEnd={(e) => onChunkDragEnd(e, index)}
        collisionDetection={closestCenter}
      >
        <SortableContext
          items={item.chunks.map((chunk) => chunk.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className={styles.chunkList}>
            {item.chunks.map((chunk, chunkIndex) => (
              <ChunkCard
                key={chunk.id}
                chunk={chunk}
                chunkIndex={chunkIndex}
                onChange={(field, value) =>
                  handleChunkChange(chunkIndex, field, value)
                }
                onDelete={() => handleDeleteChunk(chunkIndex)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <Space style={{ marginTop: 12 }}>
        <Button
          type='dashed'
          size='small'
          onClick={() => onAddChunk(index)}
          icon={<PlusOutlined />}
        >
          添加 Chunk
        </Button>
        <Button danger size='small' onClick={() => onDelete(index)}>
          删除段落
        </Button>
      </Space>
    </div>
  );
}

const ChunkCard = ({ chunk, onChange, onDelete }: ChunkCardProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: chunk.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className={styles.chunkCard}>
      <div className={styles.dragHandle} {...attributes} {...listeners}>
        <MenuOutlined style={{ marginRight: 8 }} />
        Chunk Sort: {chunk.sort}
      </div>
      <Input
        className={styles.input}
        placeholder='Text'
        value={chunk.text}
        onChange={(e) => onChange('text', e.target.value)}
      />
      <Input
        className={styles.input}
        placeholder='Phonetic'
        value={chunk.phonetic}
        onChange={(e) => onChange('phonetic', e.target.value)}
      />
      <Input
        className={styles.input}
        placeholder='Definition'
        value={chunk.definition}
        onChange={(e) => onChange('definition', e.target.value)}
      />
      <Select
        className={styles.input}
        placeholder='Chunk Type'
        value={chunk.chunkType}
        onChange={(value) => onChange('chunkType', value)}
        options={chunkTypeOptions}
      />
      <Button danger size='small' onClick={onDelete} style={{ marginTop: 8 }}>
        删除 Chunk
      </Button>
    </div>
  );
};

const SortableEditableList = () => {
  const { id } = useParams<{ id: string }>();
  const [items, setItems] = useState<ParagraphContainer[]>([]);
  const { paragraphList } = useToArticleIdGetChunk(id as string);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = items.findIndex((item) => item.id === active.id);
    const newIndex = items.findIndex((item) => item.id === over.id);
    const newItems = arrayMove(items, oldIndex, newIndex).map((item, idx) => ({
      ...item,
      sort: idx + 1,
    }));
    setItems(newItems);
  };

  const handleChunkDragEnd = (event: DragEndEvent, itemIndex: number) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const chunks = items[itemIndex].chunks;
    const oldIndex = chunks.findIndex((chunk) => chunk.id === active.id);
    const newIndex = chunks.findIndex((chunk) => chunk.id === over.id);
    const newChunks = arrayMove(chunks, oldIndex, newIndex).map((c, i) => ({
      ...c,
      sort: i + 1,
    }));
    const newItems = [...items];
    newItems[itemIndex].chunks = newChunks;
    setItems(newItems);
  };

  const handleItemChange = (index: number, newItem: ListItem) => {
    const newItems = [...items];
    newItems[index] = newItem;
    setItems(newItems);
  };

  const handleDeleteItem = (index: number) => {
    const newItems = items
      .filter((_, i) => i !== index)
      .map((item, idx) => ({ ...item, sort: idx + 1 }));
    setItems(newItems);
  };

  const handleAddItem = () => {
    const newItem: ListItem = {
      id: nanoid(),
      sort: items.length + 1,
      text: '',
      translation: '',
      chunks: [],
    };
    setItems([...items, newItem]);
  };

  const handleAddChunk = (itemIndex: number) => {
    const newItems = [...items];
    const newChunk: ChunkItem = {
      id: nanoid(),
      sort: newItems[itemIndex].chunks.length + 1,
      text: '',
      phonetic: '',
      definition: '',
      chunkType: '',
    };
    newItems[itemIndex].chunks.push(newChunk);
    setItems(newItems);
  };

  const handleAddUpload: UploadProps['beforeUpload'] = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target?.result as string);
        if (Array.isArray(parsed)) {
          const startIndex = items.length;
          const appendedItems = parsed.map(
            (item: any, idx: number): ListItem => ({
              ...item,
              id: nanoid(),
              sort: startIndex + idx + 1,
              chunks: (item.chunks || []).map(
                (c: any, i: number): ChunkItem => ({
                  ...c,
                  id: nanoid(),
                  sort: i + 1,
                })
              ),
            })
          );
          setItems([...items, ...appendedItems]);
          message.success('追加成功');
        } else {
          message.error('格式错误');
        }
      } catch {
        message.error('JSON 解析失败');
      }
    };
    reader.readAsText(file);
    return false; // 阻止默认上传行为
  };

  const handleSave = async () => {
    await updateArticleContent(id as string, items);
    message.success('数据已保存到控制台');
  };

  const handleUpload: UploadProps['beforeUpload'] = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target?.result as string);
        if (Array.isArray(parsed)) {
          const withIds = parsed.map(
            (item: any, idx: number): ListItem => ({
              ...item,
              id: nanoid(),
              sort: idx + 1,
              chunks: (item.chunks || []).map(
                (c: any, i: number): ChunkItem => ({
                  ...c,
                  id: nanoid(),
                  sort: i + 1,
                })
              ),
            })
          );
          setItems(withIds);
          message.success('导入成功');
        } else {
          message.error('格式错误');
        }
      } catch {
        message.error('JSON 解析失败');
      }
    };
    reader.readAsText(file);
    return false;
  };

  useEffect(() => {
    setItems(paragraphList);
  }, [paragraphList]);

  return (
    <div className={styles.container}>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={items.map((item) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          {items.map((item, index) => (
            <SortableItem
              key={item.id}
              item={item}
              index={index}
              onChange={handleItemChange}
              onDelete={handleDeleteItem}
              onAddChunk={handleAddChunk}
              onChunkDragEnd={handleChunkDragEnd}
            />
          ))}
        </SortableContext>
      </DndContext>

      <div className={styles.actions}>
        <Space>
          <Button
            icon={<PlusOutlined />}
            onClick={handleAddItem}
            type='primary'
          >
            添加段落
          </Button>
          <Button icon={<SaveOutlined />} onClick={handleSave} type='default'>
            保存
          </Button>
          <Upload showUploadList={false} beforeUpload={handleUpload}>
            <Button icon={<UploadOutlined />}>导入覆盖 JSON</Button>
          </Upload>
          <Upload showUploadList={false} beforeUpload={handleAddUpload}>
            <Button icon={<UploadOutlined />}>追加段落 JSON</Button>
          </Upload>
        </Space>
      </div>
    </div>
  );
};

export default SortableEditableList;

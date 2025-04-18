import React, { useState, useRef, useEffect } from 'react';
import {
  Card,
  Progress,
  Typography,
  Space,
  Button,
  Row,
  Col,
  Divider,
} from 'antd';
import {
  SoundOutlined,
  LeftOutlined,
  RightOutlined,
  StarOutlined,
  StarFilled,
} from '@ant-design/icons';
import styles from './index.module.scss';

const { Title, Text, Paragraph } = Typography;

const rawData = [
  {
    sort: 1,
    text: 'Quitting smoking is often seen as a daunting task, largely because of the fear of loss. Many people worry they’ll become anxious, irritable, or unable to focus without cigarettes. Yet research consistently shows that nicotine withdrawal causes only mild physical symptoms. What truly makes quitting difficult is the psychological dependence. Once a person fully realizes that smoking offers no real benefits, the illusion begins to crumble—much like a scam loses power once it’s exposed.',
    translation:
      '戒烟常常被认为是一项艰巨的任务，很大程度上是因为人们害怕失去。许多人担心没有香烟他们会变得焦虑、易怒或无法集中注意力。然而，研究一致表明，尼古丁戒断只会引起轻微的身体症状。真正使戒烟困难的是心理依赖。当一个人完全意识到吸烟没有真正的好处时，这种幻觉就开始破灭——就像骗局一旦被揭穿就会失去力量一样。',
    chunks: [
      {
        sort: 0,
        text: 'Quitting',
        phonetic: '[ˈkwɪtɪŋ]',
        definition: 'v. 戒掉（现在分词，原型 quit）',
        chunkType: 'word',
      },
      {
        sort: 1,
        text: 'daunting',
        phonetic: '[ˈdɔːntɪŋ]',
        definition: 'adj. 令人畏惧的',
        chunkType: 'word',
      },
      {
        sort: 2,
        text: 'quitting smoking',
        phonetic: '[ˈkwɪtɪŋ ˈsmoʊkɪŋ]',
        definition: '戒烟',
        chunkType: 'phrase',
      },
      {
        sort: 3,
        text: 'seen as a daunting task',
        phonetic: '[siːn æz ə ˈdɔːntɪŋ tæsk]',
        definition: '被视为一项艰巨的任务',
        chunkType: 'phrase',
      },
      {
        sort: 4,
        text: 'fear of loss',
        phonetic: '[fɪr əv lɔːs]',
        definition: '对失去的恐惧',
        chunkType: 'phrase',
      },
      {
        sort: 5,
        text: 'Quitting smoking is often seen as a daunting task, largely because of the fear of loss.',
        phonetic: '',
        definition:
          '戒烟常常被认为是一项艰巨的任务，很大程度上是因为人们害怕失去。',
        chunkType: 'sentence',
      },
      {
        sort: 6,
        text: 'irritable',
        phonetic: '[ˈɪrɪtəbl]',
        definition: 'adj. 易怒的',
        chunkType: 'word',
      },
      {
        sort: 7,
        text: 'unable to focus',
        phonetic: '[ʌnˈeɪbl tuː ˈfoʊkəs]',
        definition: '无法集中注意力',
        chunkType: 'phrase',
      },
      {
        sort: 8,
        text: 'Many people worry they’ll become anxious, irritable, or unable to focus without cigarettes.',
        phonetic: '',
        definition: '许多人担心没有香烟他们会变得焦虑、易怒或无法集中注意力。',
        chunkType: 'sentence',
      },
      {
        sort: 9,
        text: 'nicotine',
        phonetic: '[ˈnɪkətiːn]',
        definition: 'n. 尼古丁',
        chunkType: 'word',
      },
      {
        sort: 10,
        text: 'withdrawal',
        phonetic: '[wɪðˈdrɔːəl]',
        definition: 'n. 戒断',
        chunkType: 'word',
      },
      {
        sort: 11,
        text: 'nicotine withdrawal',
        phonetic: '[ˈnɪkətiːn wɪðˈdrɔːəl]',
        definition: '尼古丁戒断',
        chunkType: 'phrase',
      },
      {
        sort: 12,
        text: 'physical symptoms',
        phonetic: '[ˈfɪzɪkl ˈsɪmptəmz]',
        definition: '身体症状',
        chunkType: 'phrase',
      },
      {
        sort: 13,
        text: 'Yet research consistently shows that nicotine withdrawal causes only mild physical symptoms.',
        phonetic: '',
        definition: '然而，研究一致表明，尼古丁戒断只会引起轻微的身体症状。',
        chunkType: 'sentence',
      },
      {
        sort: 14,
        text: 'psychological',
        phonetic: '[ˌsaɪkəˈlɑːdʒɪkl]',
        definition: 'adj. 心理的',
        chunkType: 'word',
      },
      {
        sort: 15,
        text: 'dependence',
        phonetic: '[dɪˈpendəns]',
        definition: 'n. 依赖',
        chunkType: 'word',
      },
      {
        sort: 16,
        text: 'psychological dependence',
        phonetic: '[ˌsaɪkəˈlɑːdʒɪkl dɪˈpendəns]',
        definition: '心理依赖',
        chunkType: 'phrase',
      },
      {
        sort: 17,
        text: 'What truly makes quitting difficult is the psychological dependence.',
        phonetic: '',
        definition: '真正使戒烟困难的是心理依赖。',
        chunkType: 'sentence',
      },
      {
        sort: 18,
        text: 'illusion',
        phonetic: '[ɪˈluːʒn]',
        definition: 'n. 幻觉',
        chunkType: 'word',
      },
      {
        sort: 19,
        text: 'crumble',
        phonetic: '[ˈkrʌmbl]',
        definition: 'v. 崩溃',
        chunkType: 'word',
      },
      {
        sort: 20,
        text: 'scam',
        phonetic: '[skæm]',
        definition: 'n. 骗局',
        chunkType: 'word',
      },
      {
        sort: 21,
        text: 'loses power',
        phonetic: '[ˈluːzɪz ˈpaʊər]',
        definition: '失去力量',
        chunkType: 'phrase',
      },
      {
        sort: 22,
        text: 'Once a person fully realizes that smoking offers no real benefits, the illusion begins to crumble—much like a scam loses power once it’s exposed.',
        phonetic: '',
        definition:
          '当一个人完全意识到吸烟没有真正的好处时，这种幻觉就开始破灭——就像骗局一旦被揭穿就会失去力量一样。',
        chunkType: 'sentence',
      },
    ],
  },
  {
    sort: 3,
    text: 'iQuitting smoking is often seen as a daunting task, largely because of the fear of loss. Many people worry they’ll become anxious, irritable, or unable to focus without cigarettes. Yet research consistently shows that nicotine withdrawal causes only mild physical symptoms. What truly makes quitting difficult is the psychological dependence. Once a person fully realizes that smoking offers no real benefits, the illusion begins to crumble—much like a scam loses power once it’s exposed.',
    translation:
      '戒烟常常被认为是一项艰巨的任务，很大程度上是因为人们害怕失去。许多人担心没有香烟他们会变得焦虑、易怒或无法集中注意力。然而，研究一致表明，尼古丁戒断只会引起轻微的身体症状。真正使戒烟困难的是心理依赖。当一个人完全意识到吸烟没有真正的好处时，这种幻觉就开始破灭——就像骗局一旦被揭穿就会失去力量一样。',
    chunks: [
      {
        sort: 0,
        text: 'Quitting',
        phonetic: '[ˈkwɪtɪŋ]',
        definition: 'v. 戒掉（现在分词，原型 quit）',
        chunkType: 'word',
      },
      {
        sort: 1,
        text: 'daunting',
        phonetic: '[ˈdɔːntɪŋ]',
        definition: 'adj. 令人畏惧的',
        chunkType: 'word',
      },
      {
        sort: 2,
        text: 'quitting smoking',
        phonetic: '[ˈkwɪtɪŋ ˈsmoʊkɪŋ]',
        definition: '戒烟',
        chunkType: 'phrase',
      },
      {
        sort: 3,
        text: 'seen as a daunting task',
        phonetic: '[siːn æz ə ˈdɔːntɪŋ tæsk]',
        definition: '被视为一项艰巨的任务',
        chunkType: 'phrase',
      },
      {
        sort: 4,
        text: 'fear of loss',
        phonetic: '[fɪr əv lɔːs]',
        definition: '对失去的恐惧',
        chunkType: 'phrase',
      },
      {
        sort: 5,
        text: 'Quitting smoking is often seen as a daunting task, largely because of the fear of loss.',
        phonetic: '',
        definition:
          '戒烟常常被认为是一项艰巨的任务，很大程度上是因为人们害怕失去。',
        chunkType: 'sentence',
      },
      {
        sort: 6,
        text: 'irritable',
        phonetic: '[ˈɪrɪtəbl]',
        definition: 'adj. 易怒的',
        chunkType: 'word',
      },
      {
        sort: 7,
        text: 'unable to focus',
        phonetic: '[ʌnˈeɪbl tuː ˈfoʊkəs]',
        definition: '无法集中注意力',
        chunkType: 'phrase',
      },
      {
        sort: 8,
        text: 'Many people worry they’ll become anxious, irritable, or unable to focus without cigarettes.',
        phonetic: '',
        definition: '许多人担心没有香烟他们会变得焦虑、易怒或无法集中注意力。',
        chunkType: 'sentence',
      },
      {
        sort: 9,
        text: 'nicotine',
        phonetic: '[ˈnɪkətiːn]',
        definition: 'n. 尼古丁',
        chunkType: 'word',
      },
      {
        sort: 10,
        text: 'withdrawal',
        phonetic: '[wɪðˈdrɔːəl]',
        definition: 'n. 戒断',
        chunkType: 'word',
      },
      {
        sort: 11,
        text: 'nicotine withdrawal',
        phonetic: '[ˈnɪkətiːn wɪðˈdrɔːəl]',
        definition: '尼古丁戒断',
        chunkType: 'phrase',
      },
      {
        sort: 12,
        text: 'physical symptoms',
        phonetic: '[ˈfɪzɪkl ˈsɪmptəmz]',
        definition: '身体症状',
        chunkType: 'phrase',
      },
      {
        sort: 13,
        text: 'Yet research consistently shows that nicotine withdrawal causes only mild physical symptoms.',
        phonetic: '',
        definition: '然而，研究一致表明，尼古丁戒断只会引起轻微的身体症状。',
        chunkType: 'sentence',
      },
      {
        sort: 14,
        text: 'psychological',
        phonetic: '[ˌsaɪkəˈlɑːdʒɪkl]',
        definition: 'adj. 心理的',
        chunkType: 'word',
      },
      {
        sort: 15,
        text: 'dependence',
        phonetic: '[dɪˈpendəns]',
        definition: 'n. 依赖',
        chunkType: 'word',
      },
      {
        sort: 16,
        text: 'psychological dependence',
        phonetic: '[ˌsaɪkəˈlɑːdʒɪkl dɪˈpendəns]',
        definition: '心理依赖',
        chunkType: 'phrase',
      },
      {
        sort: 17,
        text: 'What truly makes quitting difficult is the psychological dependence.',
        phonetic: '',
        definition: '真正使戒烟困难的是心理依赖。',
        chunkType: 'sentence',
      },
      {
        sort: 18,
        text: 'illusion',
        phonetic: '[ɪˈluːʒn]',
        definition: 'n. 幻觉',
        chunkType: 'word',
      },
      {
        sort: 19,
        text: 'crumble',
        phonetic: '[ˈkrʌmbl]',
        definition: 'v. 崩溃',
        chunkType: 'word',
      },
      {
        sort: 20,
        text: 'scam',
        phonetic: '[skæm]',
        definition: 'n. 骗局',
        chunkType: 'word',
      },
      {
        sort: 21,
        text: 'loses power',
        phonetic: '[ˈluːzɪz ˈpaʊər]',
        definition: '失去力量',
        chunkType: 'phrase',
      },
      {
        sort: 22,
        text: 'Once a person fully realizes that smoking offers no real benefits, the illusion begins to crumble—much like a scam loses power once it’s exposed.',
        phonetic: '',
        definition:
          '当一个人完全意识到吸烟没有真正的好处时，这种幻觉就开始破灭——就像骗局一旦被揭穿就会失去力量一样。',
        chunkType: 'sentence',
      },
    ],
  },
];

const processData = (paragraph) => {
  const sentences = paragraph.chunks.filter((c) => c.chunkType === 'sentence');
  return sentences.map((sentence) => {
    const relatedChunks = paragraph.chunks.filter(
      (chunk) =>
        chunk.chunkType !== 'sentence' &&
        chunk.sort < sentence.sort &&
        chunk.text &&
        sentence.text.includes(chunk.text)
    );
    return {
      sentence,
      relatedChunks,
    };
  });
};

export default function EnglishStudy() {
  const [current, setCurrent] = useState(0);
  const [highlighted, setHighlighted] = useState(null);
  const [favorites, setFavorites] = useState({});
  const [activeSentence, setActiveSentence] = useState(null);

  const paragraph = rawData[current];
  const structuredSentences = processData(paragraph);

  const refs = useRef({ paragraph: null, sentences: [] });

  const handlePlay = (text, idx = null) => {
    const utterance = new SpeechSynthesisUtterance(text);
    if (idx !== null) {
      utterance.onstart = () => setActiveSentence(idx);
      utterance.onend = () => setActiveSentence(null);
    }
    speechSynthesis.speak(utterance);
  };

  const scrollToRef = (ref) => {
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const keyFor = (text) => `${current}-${text}`;

  useEffect(() => {
    refs.current.sentences = refs.current.sentences.slice(
      0,
      structuredSentences.length
    );
  }, [structuredSentences.length]);

  return (
    <div className={styles.container}>
      <Progress
        percent={((current + 1) / rawData.length) * 100}
        showInfo={false}
        strokeColor='#1677ff'
      />

      <div style={{ display: 'flex' }}>
        <div className={styles.mainContent}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              type='default'
              icon={<LeftOutlined />}
              disabled={current === 0}
              onClick={() => setCurrent((prev) => Math.max(0, prev - 1))}
            >
              上一段
            </Button>
            <Button
              type='default'
              icon={<RightOutlined />}
              disabled={current === rawData.length - 1}
              onClick={() =>
                setCurrent((prev) => Math.min(rawData.length - 1, prev + 1))
              }
            >
              下一段
            </Button>
          </div>

          <Card
            bordered
            className={styles.paragraphCard}
            ref={(el) => (refs.current.paragraph = el)}
          >
            <Title level={4}>{paragraph.text}</Title>
            <Text type='secondary'>{paragraph.translation}</Text>
          </Card>

          {structuredSentences.map(({ sentence, relatedChunks }, idx) => (
            <Card
              key={idx}
              title={`句子 ${idx + 1}`}
              className={styles.sentenceCard}
              style={{ marginTop: 24 }}
              extra={
                <Button
                  icon={<SoundOutlined />}
                  onClick={() => handlePlay(sentence.text, idx)}
                  type='text'
                />
              }
              ref={(el) => (refs.current.sentences[idx] = el)}
            >
              <Paragraph>{sentence.text}</Paragraph>
              <Text type='secondary'>{sentence.definition}</Text>

              <Divider dashed style={{ margin: '16px 0' }}>
                相关词块
              </Divider>

              <Row gutter={[16, 16]}>
                {relatedChunks.map((chunk, index) => {
                  const isHighlighted = highlighted === chunk.text;
                  const favKey = keyFor(chunk.text);
                  const isFavorite = favorites[favKey];

                  return (
                    <Col xs={24} sm={12} md={8} lg={6} key={index}>
                      <Card
                        size='small'
                        hoverable
                        className={`${styles.chunkCard} ${isHighlighted ? styles.active : ''}`}
                        onClick={() => setHighlighted(chunk.text)}
                      >
                        <Space
                          direction='vertical'
                          size={4}
                          style={{ width: '100%' }}
                        >
                          <div className={styles.chunkHeader}>
                            <Text strong>{chunk.text}</Text>
                            <Space>
                              <Button
                                type='text'
                                icon={<SoundOutlined />}
                                size='small'
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handlePlay(chunk.text);
                                }}
                              />
                              <Button
                                type='text'
                                icon={
                                  isFavorite ? (
                                    <StarFilled style={{ color: '#fadb14' }} />
                                  ) : (
                                    <StarOutlined />
                                  )
                                }
                                size='small'
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleFavorite(favKey);
                                }}
                              />
                            </Space>
                          </div>
                          <Text type='secondary'>{chunk.phonetic}</Text>
                          <Text>{chunk.definition}</Text>
                        </Space>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            </Card>
          ))}
        </div>

        <div className={styles.sideMap}>
          <div
            className={styles.mapParagraph}
            onClick={() => scrollToRef(refs.current.paragraph)}
          >
            Paragraph {paragraph.sort}
          </div>
          {structuredSentences.map((_, i) => (
            <div
              key={i}
              className={`${styles.mapSentence} ${activeSentence === i ? styles.active : ''}`}
              onClick={() => scrollToRef(refs.current.sentences[i])}
            >
              {structuredSentences[i].sentence.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

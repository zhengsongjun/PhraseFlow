import React from 'react';
import Header from './components/Header/Header';
import menuData from '../config/menu';
import layoutConfig from '../config/config';
import BaseLayout from './components/BaseLayout/BaseLayout';

const App: React.FC = () => {
  return (
    <BaseLayout
      layoutConfig={layoutConfig}
      menu={menuData}
      header={<Header layout={layoutConfig.layout} />}
    />
  );
};

export default App;

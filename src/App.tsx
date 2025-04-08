import React from 'react';
import Header from './components/Header/Header';
import menuData from '../config/menu';
import layoutConfig from '../config/config';
import BaseLayout from './components/BaseLayout/BaseLayout';
import { Route, Routes } from 'react-router-dom';
import Login from './page/Login/Login';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route
        path='/*'
        element={
          <BaseLayout
            layoutConfig={layoutConfig}
            menu={menuData}
            header={<Header layout={layoutConfig.layout} />}
          />
        }
      ></Route>
    </Routes>
  );
};

export default App;

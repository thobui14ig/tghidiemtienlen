/* eslint-disable prettier/prettier */
import type { Node } from 'react';
import React from 'react';
import Login from './src/component/Auth/Login';

import MainProvider from './src/context/Main.context';
import Navigation from './src/Navigation/Navigation';



const App: () => Node = () => {
  return (
    <>
    <MainProvider>
      <Navigation />
    </MainProvider>
    </>
  );
};

export default App;

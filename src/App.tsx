import React from 'react';
import './App.css';
import MainPage from './MainPage';
import { ParametersContextProvider } from './ParametersContext';

const App = () => {
  return <ParametersContextProvider><MainPage/></ParametersContextProvider>
}

export default App;

import React from 'react';
import './App.css';
import {TestApp} from "./TestApp";
import {App} from "./App";

interface IProps {
    testMode?: string;
}

const AppLoader = (props:IProps) => {
  const
      {testMode} = props;

  if (testMode == "demo") {
      return <TestApp/>
  } else {
      //боевое приложение ещё не готово
      return <App/>;
  }
};

export default AppLoader;

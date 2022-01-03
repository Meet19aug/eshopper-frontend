import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from "react-redux";
import store from "./store"
import { position, transition, Provider as AlertProvider, transitions, positions } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
  timeout:5000,
  position : positions.BOTTOM_CENTER,
  // it give transition to alert 
  transition : transitions.SCALE,
}
ReactDOM.render(
  // to give access for redux store to all elemet of frontend we bind app in Provider and passes store 
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
    <App />
    </AlertProvider>
  </Provider>,
  document.getElementById('root')
);


import React, {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './app';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {store} from "./services/store";

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
    // В StrictMode реакт может вызывать некоторые эффекты не нескольку раз
    <StrictMode>
      <Provider store={store}>
          <App/>
      </Provider>
    </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

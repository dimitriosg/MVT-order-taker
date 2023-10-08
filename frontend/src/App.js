/* eslint-disable no-unused-vars */
// src/App.js
import React from 'react';
import AppRoutes from './AppRoutes';
import { store, persistor } from './redux/store.js';
import Modal from 'react-modal';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import 'bootstrap-toggle/css/bootstrap-toggle.min.css';



// Set the app element for react-modal
Modal.setAppElement('#root');

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ReduxContent />
      </PersistGate>
    </Provider>
  );
}

const ReduxContent = () => {
  return (
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
  );
}
  
export default App;

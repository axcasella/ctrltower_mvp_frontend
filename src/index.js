import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { configureStore } from '@reduxjs/toolkit';
import globalReducer from "state";
import { Provider } from "react-redux";
import { api } from "state/api";
import { setupListeners } from "@reduxjs/toolkit/query";

// Load the persisted state from localStorage
const persistedState = localStorage.getItem('reduxState')
  ? JSON.parse(localStorage.getItem('reduxState'))
  : {};

const store = configureStore({
  reducer: {
    global: globalReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefault) => getDefault().concat(api.middleware),
  preloadedState: persistedState,  // Provide the persisted state here
});

// Save the current state to localStorage whenever it changes
store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()))
});

setupListeners(store.dispatch);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
  </React.StrictMode>
);
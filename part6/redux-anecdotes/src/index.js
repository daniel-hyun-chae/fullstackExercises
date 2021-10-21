import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'


ReactDOM.render(
  //Wrap App component with Provider component provided by react-redux which gives app the access to the store
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
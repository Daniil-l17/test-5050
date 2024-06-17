import React from 'react'
import ReactDOM from 'react-dom/client'
import './style/global.scss'
import { Router } from './Router/Router'
import { Provider } from 'react-redux'
import { store } from './redux/store'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
    <Router/>
    </Provider>
  </React.StrictMode>,
)

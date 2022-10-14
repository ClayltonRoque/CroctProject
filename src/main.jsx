import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {CroctProvider} from '@croct/plug-react'


ReactDOM.createRoot(document.getElementById('root')).render(
  <CroctProvider appId='00000000-0000-0000-0000-000000000000'>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </CroctProvider>
)

import { ConfigProvider } from 'antd'
import { themeConfig } from './styles/theme'
import { BrowserRouter as Router } from 'react-router-dom';
import { MainLayout } from '../src/layouts/mainLayout';
import './App.css'
import { IndicatorRoutes } from './config/routesConfig';

export const App = () => (
  <ConfigProvider theme={themeConfig}>
    <Router>
      <IndicatorRoutes>
        <MainLayout />
      </IndicatorRoutes>
    </Router>
  </ConfigProvider>
)
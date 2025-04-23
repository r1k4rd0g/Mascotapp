import { ConfigProvider } from 'antd'
import { themeConfig } from './styles/theme'
import { BrowserRouter as Router } from 'react-router-dom';
import { MainLayout } from '../src/layouts/mainLayout';
import { IndicatorRoutes } from './config/routesConfig';
import MessageHistoryProvider from './context/messageHistory/messageHistoryProvider';


export const MascotApp = () => (
  <ConfigProvider theme={themeConfig}>
    <Router>
      <MessageHistoryProvider>
        <IndicatorRoutes>
          <MainLayout />
        </IndicatorRoutes>
      </MessageHistoryProvider>
    </Router>
  </ConfigProvider>
)

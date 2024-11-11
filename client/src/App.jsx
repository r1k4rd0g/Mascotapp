import { ConfigProvider} from 'antd'
import { themeConfig } from './styles/theme'
import { MainLayout } from './containers/mainLayout'
import './App.css'

export const App = () => (
  <ConfigProvider theme={themeConfig}>
    <MainLayout />
  </ConfigProvider>
)



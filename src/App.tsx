import { ChakraProvider } from '@chakra-ui/react'
import GlobalStyle from './core/styles/global'
import { BrowserRouter } from 'react-router-dom'

import './index.css'
import Routes from './routes'
import { ToastProvider } from './core/providers/toast'

const App: React.FC = () => {
  return (
    <>
      <ChakraProvider>
        <ToastProvider>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </ToastProvider>
      </ChakraProvider>
      <GlobalStyle />
    </>
  ) 
}

export default App
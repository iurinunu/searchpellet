import '../styles/globals.scss'

import { ThemeProvider, CSSReset, ChakraProvider } from '@chakra-ui/react';
import { Global, css } from '@emotion/react';

import { AuthProvider } from '@/lib/auth';
import theme from '@/styles/theme';
import { AppProps } from 'next/dist/shared/lib/router/router';

import { Provider } from 'react-redux'
import store from '../app/store'


const GlobalStyle = ({ children }: any) => {
  return (
    <>
      <CSSReset />
      <Global
        styles={css`
          html {
            min-width: 360px;
            scroll-behavior: smooth;
            background-color: #edf2f7;
          }

          #__next {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }
        `}
      />
      {children}
    </>
  );
};

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <GlobalStyle />
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
      </AuthProvider>
    </ChakraProvider>
  );
};

export default App;
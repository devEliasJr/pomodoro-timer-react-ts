import { ThemeProvider } from 'styled-components'
// import { Button } from './components/Button'
import { BrowserRouter } from 'react-router-dom'
import { defaultTheme } from './styles/themes/default'
import { GlobalStyle } from './styles/global'
import { Router } from './components/Router'

const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
      <Router />
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  )
}

export default App

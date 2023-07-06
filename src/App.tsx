import { ThemeProvider } from "styled-components";
// import { Button } from './components/Button'
import { BrowserRouter } from "react-router-dom";
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";
import { Router } from "./components/Router";
import { CyclesContextProvider } from "./contexts/CyclesContext";

const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CyclesContextProvider >
          <Router />
        </CyclesContextProvider>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  );
};

export default App;

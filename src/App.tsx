import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import { GlobalStyle } from "./global";
import { Router } from "./Router";
import { defaultTheme } from "./styles/themes/default";
import { CycleContextProvide } from "./contexts/CycleContext";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CycleContextProvide>
          <Router />
        </CycleContextProvide>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  );
}

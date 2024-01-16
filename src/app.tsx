import { BrowserRouter as Router } from "react-router-dom";
import ErrorBoundaryComp from './components/error-boundary.comp';
import AppRoutes from './app.routes';
import { Provider } from "react-redux";
import store from "./store";
import { theme } from "./theme";
import { ThemeProvider } from "@mui/material";

function App() {


  return (
      <ErrorBoundaryComp>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <Router>
              <AppRoutes />
            </Router>
          </ThemeProvider>
        </Provider>
      </ErrorBoundaryComp>
  );
}

export default App;

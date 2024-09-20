import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import StoreContextProvider from "./Context/StoreContext.jsx";
import store from "./context/store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <StoreContextProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </StoreContextProvider>
    </BrowserRouter>
  </StrictMode>
);

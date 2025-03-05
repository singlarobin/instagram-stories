import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App.tsx";
import { store } from "./store";
import GlobalStyle from "./GlobalStyles";
import { Toaster } from "./ui-components/index.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Provider store={store}>
            <App />
            <GlobalStyle />
            <Toaster />
        </Provider>
    </StrictMode>
);

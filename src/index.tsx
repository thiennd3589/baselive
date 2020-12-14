import React from "react";
import ReactDOM from "react-dom";
import i18n from "i18next";
import AOS from "aos";
import { toast } from "react-toastify";
import { Provider } from "react-redux";
import ScrollToTop from "components/ScrollTop";
import { initReactI18next } from "react-i18next";
import { HashRouter as Router } from "react-router-dom";
import translateEN from "./i18n/en.json";
import translateVI from "./i18n/vi.json";
import App from "./App";
import store from "redux-saga/store";
import "./index.scss";
import "aos/dist/aos.css";
import "semantic-ui-css/semantic.min.css";
import "react-toastify/dist/ReactToastify.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

//notification
toast.configure();

//translation
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: translateEN,
      },
      vi: {
        translation: translateVI,
      },
    },
    lng: "en",
    fallbackLng: "en",

    interpolation: {
      escapeValue: false,
    },
  });

//animation
AOS.init({
  duration: 700,
  startEvent: "load",
});

window.addEventListener("load", () => {
  AOS.refresh();
});

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

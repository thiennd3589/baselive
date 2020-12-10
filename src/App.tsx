import React, { useEffect } from "react";
import Router from "components/Router";
import i18n from "i18next";
import { useSelector } from "react-redux";
import { State } from "redux-saga/reducers";
import "./App.scss";

function App() {
  const language = useSelector((state: State) => state.language);
  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);
  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;

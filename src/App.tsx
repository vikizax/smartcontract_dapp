import React, { createContext, useReducer } from "react";
import Layout from "./container/Layout";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DataPage from "./pages/DataPage";
import InteractPage from "./pages/InteractPage";
import { AppContext, initialData } from "./state/context";
import { reducer } from "./state/reducer";

function App() {
  const [state, dispatch] = useReducer(reducer, initialData);
  return (
    <Layout>
      <AppContext.Provider value={{ state, dispatch }}>
        <Routes>
          <Route path="/">
            <Route path="home" element={<HomePage />} />
            <Route path="data" element={<DataPage />} />
            <Route path="smart-contract" element={<InteractPage />} />
          </Route>
        </Routes>
      </AppContext.Provider>
    </Layout>
  );
}

export default App;

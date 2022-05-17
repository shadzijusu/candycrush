import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import GameComponent from "./components/GameComponent";
import AboutComponent from "./components/AboutComponent";
import HomeComponent from "./components/HomeComponent";
const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomeComponent />}></Route>
        <Route path="/game" element={<GameComponent />}></Route>
        <Route path="/about" element={<AboutComponent />}></Route>
      </Routes>
    </Layout>
  );
};

export default App;

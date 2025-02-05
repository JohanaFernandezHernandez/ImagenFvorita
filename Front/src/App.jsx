import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { HomePage } from "./pages/HomePage/HomePage";
import { Footer, Header } from "./Components";


function App() {
  return (
    <BrowserRouter>
     <Header/>
      <Routes>
        <Route path="/" element={<HomePage />} />

      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;

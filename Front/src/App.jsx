import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { HomePage } from "./pages/HomePage/HomePage";
import { Footer, Header } from "./Components";
import CreateImage from "./pages/CreateImage/CreateImage";


function App() {
  return (
    <BrowserRouter>
     <Header/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateImage />} />

      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;

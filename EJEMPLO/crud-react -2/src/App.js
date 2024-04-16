import { Route, Routes, BrowserRouter } from "react-router-dom";
import Crud from './components/Crud';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Crud></Crud>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import MainRouter from "./MainRouter";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="left-bottom" />
      <MainRouter />
    </BrowserRouter>
  );
}

export default App;

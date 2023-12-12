import { Route, Routes } from "react-router-dom";
import { Home } from "./page/Home";
import { Send } from "./page/Send";

function App() {
  return (
    <div className="h-screen max-w-[38rem] p-[16px]" style={{ margin: '0 auto' }}>
      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path={'/Send'} element={<Send />} />
      </Routes>
    </div>
  );
}

export default App;

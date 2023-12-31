import { Route, Routes } from "react-router-dom";
import { Home } from "./page/Home";
import { Send } from "./page/Send";
import { Deposit } from "./page/Deposit";
import { Withdraw } from "./page/Withdraw";
import { Transaction } from "./page/Transaction";

function App() {
  return (
    <div className="h-screen max-w-[38rem]" style={{ margin: '0 auto' }}>
      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path={'/send'} element={<Send />} />
        <Route path={'/deposit'} element={<Deposit />} />
        <Route path={'/withdraw'} element={<Withdraw />} />
        <Route path={'/tx/:txId'} element={<Transaction />} />
      </Routes>
    </div>
  );
}

export default App;

import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Dashboard from "../components/Dashboard";
import AppLayout from "../pages/AppLayout";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/*<Route index element={<Homepage/>}/>*/}
        <Route path='' element={<AppLayout/>}>
          <Route index element={<Navigate replace to='dashboard'/>}/>
          <Route path='dashboard' element={<Dashboard/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

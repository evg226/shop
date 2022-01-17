import './App.css';
import {useDispatch} from "react-redux";
import {loadFullCategories, loadProductsPage, userSigninQuery} from "./store/action";
import {useEffect} from "react";
import {BrowserRouter} from "react-router-dom";
import {AppRouter} from "./router";
import {AppNavbar} from "./router/appNavbar";
import {useLocation} from "react-router";

function App() {
  const dispatch=useDispatch();
  useEffect(()=>{
    // dispatch(userSigninQuery("admin","1"));
    dispatch(loadFullCategories());
    dispatch(loadProductsPage(1,6));
  })



  return (
      <BrowserRouter>
          <header>
              <AppNavbar />

          </header>
        <AppRouter />
      </BrowserRouter>
  );
}

export default App;

import { FC, useEffect } from "react";

import "./App.css";
import "./css/loader.css";

import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/redux-hoock";
import { fetchGetProducts } from "../store/action";
import { setFavoriteArray } from "../store/ProductSlice";

const App: FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    if (pathname == "/") navigate("/products");
  }, []);

  useEffect(() => {
    dispatch(fetchGetProducts()).then(() => {
      dispatch(setFavoriteArray(localStorage.getItem("favorite")));
    });
  }, []);
  return (
    <>
      <div className="container">
        <Outlet></Outlet>
     
      </div>
    </>
  );
};

export default App;

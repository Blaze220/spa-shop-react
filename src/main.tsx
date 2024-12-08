import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import store from "../store/index.ts";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductList from "./ProductList.tsx";
import Product from "./Product.tsx";
import ProductCreateForm from "./ProductCreateForm.tsx";

const router = createBrowserRouter(
  [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "products", element: <ProductList /> },
      { path: "create-product", element: <ProductCreateForm /> },
      { path: "products/:id", element: <Product /> },
    ],
  },
],
// {basename: "/spa-shop-react/"}
);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

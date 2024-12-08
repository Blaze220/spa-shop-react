import { FC, useEffect, useState } from "react";

import { useAppSelector } from "../hooks/redux-hoock";

import ProductCard from "./ProductCard";
import { NavLink } from "react-router-dom";
import Paginathion from "./PaginathionList";
import { IProduct } from "../store/ProductSlice";

const ProductList: FC = () => {
  const products = useAppSelector((state) => state.product.products);
  const load = useAppSelector((state) => state.product.isLoading);
  let [max, setMax] = useState<number>(products.length);
  const [category, setCategory] = useState<string>("Все категории");
  const [page, setPage] = useState<number>(1);
  const [s, setS] = useState<string[]>([]);
  const [search, setSearch] = useState<string>("");
  useEffect(() => {
    if (s.length == 0 && products.length !== 0) {
      let l: any[] = [];
      for (let i = 0; i < products.length; i++) {
        if (!l.includes(products[i].category)) {
          l.push(products[i].category);
        }
      }
      setS(l);
    }
    setMax(products.length);
  }, [products, s]);

  const changeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
    let count = 0;
    if (e.target.value == "Избранное") {
      count = products.filter((i) => i.like == true).length;
      setMax(count);
    } else if (e.target.value == "Все категории") {
      count = products.length;
      setMax(count);
    } else {
      count = products.filter((i) => i.category == e.target.value).length;
      if (count == 0) {
        return <p>ничего не найдено</p>;
      }
      setMax(count);
    }

    setPage(1);
  };

  const productElement = (product: IProduct) => {
    return (
      <ProductCard
        id={product.id}
        key={product.id}
        price={product.price}
        title={product.title}
        image={product.image}
        description={product.description}
        category={product.category}
        like={product.like}
      ></ProductCard>
    );
  };

  const searchProducts = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    let count = 0;
    if (e.target.value.length == 0) {
      count = products.length;
    } else if (category == "Все категории") {
      count = products.filter(
        (i) =>
          i.title.toLowerCase().includes(e.target.value.toLowerCase()) == true
      ).length;
    } else if (category == "Избранное") {
      count = products.filter(
        (i) =>
          i.title.toLowerCase().includes(e.target.value.toLowerCase()) ==
            true && i.like == true
      ).length;
    } else {
      count = products.filter(
        (i) =>
          i.title.toLowerCase().includes(e.target.value.toLowerCase()) ==
            true && i.category == category
      ).length;
    }
    setMax(count);
    setPage(1);
  };
  return (
    <>
      <div className="header">
        <div className="select">
          <select
            onChange={(e) => {
              changeCategory(e);
            }}
          >
            <option>Все категории</option>
            <option>Избранное</option>
            {s.map((i) => (
              <option key={i}>{i}</option>
            ))}
          </select>
        </div>

        <div className="search-block">
          <p>Поиск</p>
          <input
            type="text"
            value={search}
            onChange={(e) => {
              searchProducts(e);
            }}
          />
        </div>

        <button>
          <NavLink to={"/create-product"} className="nav">
            Добавить товар
          </NavLink>
        </button>
      </div>

      <div className="flex-container">
        {load && <span className="loader"></span>}

        {search.trim().length !== 0
          ? products
              .filter((i) => {
                if (category == "Все категории") {
                  return i.title.toLowerCase().includes(search.toLowerCase());
                } else if(category == "Избранное"){
                  return i.title.toLowerCase().includes(search.toLowerCase()) && i.like == true;
                }else {
                  return (
                    i.title.toLowerCase().includes(search.toLowerCase()) &&
                    i.category == category
                  );
                }
              })
              .slice(
                page - 1 == 0 ? 0 : (page - 1) * 10,
                page - 1 == 0 ? page * 10 : page * 10
              )
              .map((product) => productElement(product))
          : category == "Все категории"
          ? products
              .slice(
                page - 1 == 0 ? 0 : (page - 1) * 10,
                page - 1 == 0 ? page * 10 : page * 10
              )
              .map((product) => productElement(product))
          : category == "Избранное"
          ? products

              .filter((i) => i.like == true)
              .slice(
                page - 1 == 0 ? 0 : (page - 1) * 10,
                page - 1 == 0 ? page * 10 : page * 10
              )
              .map((product) => productElement(product))
          : products

              .filter((i) => i.category == category)
              .slice(
                page - 1 == 0 ? 0 : (page - 1) * 10,
                page - 1 == 0 ? page * 10 : page * 10
              )
              .map((product) => productElement(product))}
      </div>

      <Paginathion setPage={setPage} pageValue={page} maxLimit={max} />
    </>
  );
};

export default ProductList;

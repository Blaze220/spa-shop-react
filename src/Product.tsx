import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hoock";
import {
  IProduct,
  editProduct,
  getProductToId,
  setIsLike,
} from "../store/ProductSlice";
import Module from "./modal";
import edit from "./assets/edit.png";
const Product: FC = () => {
  const { id } = useParams();
  const { product, products } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isEditProduct, setIsEditProduct] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");

  useEffect(() => {
    dispatch(getProductToId({ id }));
    if (product) {
      setTitle(product.title);
      setDescription(product.description);
      setPrice(product.price);
    }
  }, [product, products]);

  const editProductN = () => {
    setIsEditProduct(false);
    const pr: IProduct = {} as IProduct;
    pr.description = description;
    pr.price = price;
    pr.title = title;
    pr.id = product.id;
    pr.image = product.image;
    pr.like = product.like;

    dispatch(editProduct(pr));
  };

  return (
    <>
      {isEditProduct && (
        <Module isModule={setIsEditProduct}>
          <label htmlFor="">наименоване</label>
          <input
            type="text"
            placeholder="наименоване"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <label htmlFor="">цена</label>
          <input
            type="text"
            placeholder="цена"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
          <label htmlFor="">описание</label>
          <input
            type="text"
            placeholder="описание"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <button onClick={() => editProductN()}>Изменить</button>
        </Module>
      )}
      <div className="header-block">
        <svg
          onClick={() => {
            navigate("/products");
          }}
          fill="#000000"
          height="40px"
          width="40px"
          version="1.1"
          id="Capa_1"
          viewBox="0 0 219.151 219.151"
        >
          <g>
            <path
              d="M109.576,219.151c60.419,0,109.573-49.156,109.573-109.576C219.149,49.156,169.995,0,109.576,0S0.002,49.156,0.002,109.575
		C0.002,169.995,49.157,219.151,109.576,219.151z M109.576,15c52.148,0,94.573,42.426,94.574,94.575
		c0,52.149-42.425,94.575-94.574,94.576c-52.148-0.001-94.573-42.427-94.573-94.577C15.003,57.427,57.428,15,109.576,15z"
            />
            <path
              d="M94.861,156.507c2.929,2.928,7.678,2.927,10.606,0c2.93-2.93,2.93-7.678-0.001-10.608l-28.82-28.819l83.457-0.008
		c4.142-0.001,7.499-3.358,7.499-7.502c-0.001-4.142-3.358-7.498-7.5-7.498l-83.46,0.008l28.827-28.825
		c2.929-2.929,2.929-7.679,0-10.607c-1.465-1.464-3.384-2.197-5.304-2.197c-1.919,0-3.838,0.733-5.303,2.196l-41.629,41.628
		c-1.407,1.406-2.197,3.313-2.197,5.303c0.001,1.99,0.791,3.896,2.198,5.305L94.861,156.507z"
            />
          </g>
        </svg>
    
      </div>
      <div className={product ? "product-flex" : "product-flex center"}>
        {product ? (
          <>
            <div className="image-block">
              <img src={product.image} alt={product.title} />
            </div>
            <div className="info-block">
              <h4>{product.title}</h4>
              <p>{product.description}</p>
              <p className="prie">{product.price}$</p>
              <div className="block-svg-l">
                <svg
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(setIsLike({ id }));
                  }}
                  width=" 35px"
                  height="35px"
                  vertical-align="middle"
                  fill={product.like ? "pink" : "black"}
                  overflow="hidden"
                  viewBox="0 0 1040 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M511.139399 975.999776c-11.093662 0-22.039969-3.549849-31.311123-10.650571C464.938148 953.71319 114.940822 701.298344 24.013927 481.870796c-0.543376-1.182942-0.986467-2.415003-1.430582-3.697205-14.446014-35.502585-21.744233-68.885903-21.744233-99.30982 0-1.478677 0.049119-2.859118 0.147356-4.240581-0.493234-4.191462-0.986467-9.368368-0.986467-15.137769 0-171.793668 133.875057-311.48622 298.370505-311.48622 81.065294 0 158.036339 35.255968 213.606982 95.363951 55.523571-60.107983 132.397403-95.363951 213.609029-95.363951 164.396187 0 298.370505 139.792836 298.370505 311.48622 0 5.719258-0.444115 10.454096-0.839111 14.004969 0.197498 1.527796 0.245593 3.402493 0.245593 5.472642 0 26.922163-6.014994 55.818283-18.342764 88.214111-4.487198 12.623505-10.108219 25.493627-17.20894 39.397289-0.493234 0.641613-0.936325 1.38044-1.331321 2.071172l-0.344854 0.838088c-1.035586 1.77646-1.873674 3.64911-2.76088 5.473665-2.959402 5.7694-6.360871 12.42703-10.850116 19.379373C854.036004 738.822982 555.469024 955.044512 542.748305 965.004351 533.428032 972.302571 522.382465 975.999776 511.139399 975.999776L511.139399 975.999776 511.139399 975.999776z" />
                </svg>
                <svg
                  fill="#000000"
                  onClick={() => {
                    setIsEditProduct(true);
                  }}
                  width="40px"
                  height="40px"
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M 25 4.03125 C 24.234375 4.03125 23.484375 4.328125 22.90625 4.90625 L 13 14.78125 L 12.78125 15 L 12.71875 15.3125 L 12.03125 18.8125 L 11.71875 20.28125 L 13.1875 19.96875 L 16.6875 19.28125 L 17 19.21875 L 17.21875 19 L 27.09375 9.09375 C 28.246094 7.941406 28.246094 6.058594 27.09375 4.90625 C 26.515625 4.328125 25.765625 4.03125 25 4.03125 Z M 25 5.96875 C 25.234375 5.96875 25.464844 6.089844 25.6875 6.3125 C 26.132813 6.757813 26.132813 7.242188 25.6875 7.6875 L 16 17.375 L 14.28125 17.71875 L 14.625 16 L 24.3125 6.3125 C 24.535156 6.089844 24.765625 5.96875 25 5.96875 Z M 4 8 L 4 28 L 24 28 L 24 14.8125 L 22 16.8125 L 22 26 L 6 26 L 6 10 L 15.1875 10 L 17.1875 8 Z" />
                </svg>
              </div>
            </div>
          </>
        ) : (
          <span className="loader"></span>
        )}
      </div>
    </>
  );
};

export default Product;

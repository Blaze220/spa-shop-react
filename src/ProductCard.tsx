import { FC } from "react";
import { IProduct, deleteProduct, setIsLike } from "../store/ProductSlice";
import { useAppDispatch } from "../hooks/redux-hoock";
import { NavLink } from "react-router-dom";

const ProductCard: FC<IProduct> = ({ image, title, id, description, like }) => {
  const dispatch = useAppDispatch();

  return (
    <>
      <NavLink className={"card_block"} to={`/products/${id}`}>
        <div className="image_block">
          <img src={image} alt={title} />
        </div>
        <div className="text-block">
          <p className="title">{title}</p>
          <p>{description.slice(0, 100)}...</p>
          <div className="block-svg">
            <svg
              onClick={(e) => {
                e.preventDefault();
                dispatch(setIsLike({ id }));
              }}
              width=" 35px"
              height="35px"
              vertical-align="middle"
              fill={like ? "pink" : "black"}
              overflow="hidden"
              viewBox="0 0 1040 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M511.139399 975.999776c-11.093662 0-22.039969-3.549849-31.311123-10.650571C464.938148 953.71319 114.940822 701.298344 24.013927 481.870796c-0.543376-1.182942-0.986467-2.415003-1.430582-3.697205-14.446014-35.502585-21.744233-68.885903-21.744233-99.30982 0-1.478677 0.049119-2.859118 0.147356-4.240581-0.493234-4.191462-0.986467-9.368368-0.986467-15.137769 0-171.793668 133.875057-311.48622 298.370505-311.48622 81.065294 0 158.036339 35.255968 213.606982 95.363951 55.523571-60.107983 132.397403-95.363951 213.609029-95.363951 164.396187 0 298.370505 139.792836 298.370505 311.48622 0 5.719258-0.444115 10.454096-0.839111 14.004969 0.197498 1.527796 0.245593 3.402493 0.245593 5.472642 0 26.922163-6.014994 55.818283-18.342764 88.214111-4.487198 12.623505-10.108219 25.493627-17.20894 39.397289-0.493234 0.641613-0.936325 1.38044-1.331321 2.071172l-0.344854 0.838088c-1.035586 1.77646-1.873674 3.64911-2.76088 5.473665-2.959402 5.7694-6.360871 12.42703-10.850116 19.379373C854.036004 738.822982 555.469024 955.044512 542.748305 965.004351 533.428032 972.302571 522.382465 975.999776 511.139399 975.999776L511.139399 975.999776 511.139399 975.999776z" />
            </svg>
            <img
              src="delete-button.svg"
              alt="delete"
              onClick={(e) => {
                e.preventDefault();
                dispatch(deleteProduct({ id }));
              }}
            />
          </div>
        </div>
      </NavLink>
    </>
  );
};

export default ProductCard;

import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hoock";
import { IProduct, editProduct, getProductToId, setIsLike } from "../store/ProductSlice";
import Module from "./modal";
import edit from "./assets/edit.png"
const Product: FC = () => {
  const { id } = useParams();
  const {product,products} = useAppSelector((state) => state.product)
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const [isEditProduct,setIsEditProduct] = useState<boolean>(false)
  const [title,setTitle] = useState<string>("")
  const [description,setDescription] = useState<string>("")
  const [price,setPrice] = useState<string> ("")


  useEffect(() => {
    dispatch(getProductToId({ id }))
    if(product){
      setTitle(product.title)
      setDescription(product.description)
      setPrice(product.price)
    }

  }, [product,products]);


  const editProductN=()=>{
    setIsEditProduct(false)
    const pr:IProduct = {} as IProduct
    pr.description = description
    pr.price = price
    pr.title = title 
    pr.id = product.id
    pr.image = product.image
    pr.like = product.like
  

    dispatch(editProduct(pr))
  }

  return (
    <>
    
    {isEditProduct && (<Module isModule={setIsEditProduct}>
      <label htmlFor="">наименоване</label>
        <input type="text" placeholder="наименоване" value={title} onChange={e=>{setTitle(e.target.value)}}/>
        <label htmlFor="">цена</label>
        <input type="text" placeholder="цена"  value={price} onChange={e=>{setPrice(e.target.value)}}/>
        <label htmlFor="">описание</label>
        <input type="text" placeholder="описание" value={description} onChange={e=>{setDescription(e.target.value)}}/>
        <button onClick={()=>editProductN()}>Изменить</button>

        </Module>)}
    <div className="header-block">
        <img src="back.png" alt=""  onClick={()=>{navigate("/products")}}/>
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
                  e.preventDefault()
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
              <img src={edit} alt="" onClick={()=>{setIsEditProduct(true)}} />
            </div>
           
          </div>
          </>
      ) : (
        (<span className="loader"></span>)
      )}

      </div>
    </>
  );
};

export default Product;

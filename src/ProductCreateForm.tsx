import { FC, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { IProduct, setProduct } from "../store/ProductSlice";
import { useAppDispatch } from "../hooks/redux-hoock";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
const ProductCreateForm: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState,watch } = useForm<IProduct>({
    mode: "onChange",
  });
  const titleError = formState.errors.title?.message;
  const descrError = formState.errors.description?.message;
  const categoryError = formState.errors.category?.message;
  const image = watch("image")


  useEffect(()=>{

  },[image])

  const onSubmit: SubmitHandler<IProduct> = (data) => {
    data.id = uuidv4();
    console.log(data);
    data.like = false;
    dispatch(setProduct(data));
  };

  return (
    <>
      <div className="header-block">
        <img
          src="/back.png"
          alt=""
          onClick={() => {
            navigate("/products");
          }}
        />
      </div>
      <div className="create-block">
      
        <form onSubmit={handleSubmit(onSubmit)}>
        <img src={image} alt="" />
          <div className="createImageBlock"></div>
          <label htmlFor="">ссылка на фото</label>
          <input
            type="text"
            placeholder="ссылка на фото"
            {...register("image")}
          />
          <label htmlFor="">название</label>
          <input
            type="text"
            placeholder="название"
            {...register("title", {
              required: "пустое поле",
              minLength: {
                value: 8,
                message: "значение меньше 8 символов",
              },
              maxLength: {
                value: 90,
                message: "значение больше 90 символов",
              },
            })}
          />
          {titleError && <p>{titleError}</p>}
          <label htmlFor="">описание</label>
          <textarea
            placeholder="описание"
            {...register("description", {
              required: "пустое поле",
              minLength: {
                value: 8,
                message: "значение меньше 8 символов",
              },
              maxLength: {
                value: 1000,
                message: "значение больше 1000 символов",
              },
            })}
          />
          {descrError && <p>{descrError}</p>}
          <label htmlFor="">цена</label>
          <input
            type="number"
            placeholder="цена"
            {...register("price", {
              required: "пустое поле",
              value: "0",
            })}
          />
          <label htmlFor="">категория</label>
          <input
            type="text"
            placeholder="категория"
            {...register("category", {
              required: "пустое поле",
              minLength: {
                value: 8,
                message: "значение меньше 8 символов",
              },
              maxLength: {
                value: 30,
                message: "значение больше 20 символов",
              },
            })}
          />
          {categoryError && <p>{categoryError}</p>}
          <button type="submit" disabled={!formState.isValid}>Добавить</button>
        </form>
      </div>
    </>
  );
};

export default ProductCreateForm;

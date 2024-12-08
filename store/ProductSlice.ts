import {
  ActionReducerMapBuilder,
  PayloadAction,
  createSlice,
} from "@reduxjs/toolkit";
import { fetchGetProducts } from "./action";

export interface IProduct {
  id: string;
  title: string;
  price: string;
  image: string;
  description: string;
  category: string;
  like: boolean;
}

type TProduct = {
  error?: string | null;
  products: IProduct[];
  isLoading: boolean;
  product: IProduct;
  favoriteArray: string[];
};

const initialState: TProduct = {
  error: "",
  products: [],
  isLoading: false,
  product: {} as IProduct,
  favoriteArray: [],
};



const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setIsLike(state, { payload }: PayloadAction<any>) {
      state.products.map((i) => {
        if (i.id == payload.id) {
          if (i.like !== undefined) {
            i.like = !i.like;
            if (i.like) {
              state.favoriteArray.push(i.id);
            } else {
              state.favoriteArray = state.favoriteArray.filter(
                (id) => id !== payload.id
              );
            }
          } else {
            i.like = true;
            state.favoriteArray.push(i.id);
          }
        }
      });
      if (state.product?.id) {
        state.product.like = !state.product.like;
      }
      localStorage.setItem("favorite", JSON.stringify(state.favoriteArray));
    },
    setFavoriteArray(state, { payload }: PayloadAction<string | null>) {
      if (payload) {
        state.favoriteArray = JSON.parse(payload);
        JSON.parse(payload).map((i: string) => {
          state.products[state.products.findIndex((s) => s.id == i)].like =
            true;
        });
      }
    },
    getProductToId(state, { payload }: PayloadAction<any>) {
      state.product =
        state.products[state.products.findIndex((i) => i.id == payload.id)];
    },
    deleteProduct(state, { payload }: PayloadAction<any>) {
      state.products = state.products.filter((i) => {
        return i.id !== payload.id;
      });
      if (
        localStorage.getItem("mewProduct") !== undefined &&
        localStorage.getItem("mewProduct") !== null
      ) {
        const ar = JSON.parse(
          localStorage.getItem("mewProduct") || "[]"
        ).filter((i: any) => {
          return i.id !== payload.id;
        });
        localStorage.setItem("mewProduct", JSON.stringify(ar));
      }
    },
    setProduct(state, { payload }: PayloadAction<IProduct>) {
      state.products.push(payload);
      let arrayNewProducts = [];

      if (
        localStorage.getItem("mewProduct") !== undefined &&
        localStorage.getItem("mewProduct") !== null
      ) {
        arrayNewProducts = JSON.parse(
          localStorage.getItem("mewProduct") || "[]"
        );
        arrayNewProducts.push(payload);
        localStorage.setItem("mewProduct", JSON.stringify(arrayNewProducts));
      } else {
        arrayNewProducts.push(payload);
        localStorage.setItem("mewProduct", JSON.stringify(arrayNewProducts));
      }
    },
    editProduct(state, { payload }: PayloadAction<IProduct>) {
      state.products[state.products.findIndex((i) => i.id == payload.id)] =
        payload;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<TProduct>) => {
    builder
      .addCase(
        fetchGetProducts.fulfilled,
        (state: TProduct, action: PayloadAction<any>) => {
          state.products = action.payload;
          if (
            localStorage.getItem("mewProduct") !== undefined &&
            localStorage.getItem("mewProduct") !== null
          ) {
            state.products.push(
              ...JSON.parse(localStorage.getItem("mewProduct") || "[]")
            );
          }
          state.isLoading = false;
          state.error = "";
        }
      )
      .addCase(
        fetchGetProducts.rejected,
        (state: TProduct, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      )
      .addCase(fetchGetProducts.pending, (state: TProduct, _) => {
        state.isLoading = true;
        state.error = "";
      });
  },
});

export const {
  setIsLike,
  deleteProduct,
  getProductToId,
  setFavoriteArray,
  setProduct,
  editProduct,
} = productSlice.actions;
export default productSlice.reducer;

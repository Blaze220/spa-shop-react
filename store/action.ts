import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";




export const fetchGetProducts = createAsyncThunk(
    "product/fetchGetProducts",
    async()=>{
        try{
            const response = await axios("https://fakestoreapi.com/products")
            if(response.data){
                return response.data
            }
        }catch(error:any){
            return "нет связи с хостом"
        }
    } 
)
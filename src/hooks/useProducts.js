import { useContext } from "react"
import { ProductContext } from "../context/ProductContext"
import { setProductsAction, startProductsLoadingAction, stopProductsLoadingAction } from "../actions/productAction";

export const useProducts=()=>{
    const {state:{products,productsLoading},dispatch}=useContext(ProductContext);

    const setProducts=(productList)=>setProductsAction(dispatch,productList);
    const startProductsLoading=()=>startProductsLoadingAction(dispatch);
    const stopProductsLoading=()=>stopProductsLoadingAction(dispatch)

    return {products,productsLoading,startProductsLoading,stopProductsLoading,setProducts}
}
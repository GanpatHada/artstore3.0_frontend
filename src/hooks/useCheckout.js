import { useContext } from "react"
import { CheckoutContext } from "../context/CheckoutContext"
import { removeAddressAction, setAddressAction, setAmountAction, setProductsAction } from "../actions/checkoutAction";

export const useCheckout=()=>{
    const{state,dispatch}=useContext(CheckoutContext);
    const {amount,selectedAddress,products}=state;
    const setAddress=(addressId)=>setAddressAction(dispatch,addressId);
    const setAmount=(amount)=>setAmountAction(dispatch,amount);
    const removeAddress=()=>removeAddressAction(dispatch);
    const setProducts=(products)=>setProductsAction(dispatch,products)
    return {amount,selectedAddress,setAddress,setAmount,removeAddress,setProducts,products}
}
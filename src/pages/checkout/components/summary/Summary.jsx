import "./Summary.css";
import { useCheckout } from "../../../../hooks/useCheckout";
import { useUser } from "../../../../hooks/useUser";
import { FaAngleDown } from "react-icons/fa";
import { useState } from "react";


const ItemsSummary = () => {
  const { products } = useCheckout()
  return (
    <div id="items-summary">
      {
        products.map((product, index) => {
          return <div key={product.productId}>
            <div>
              <h5>{index + 1}. {product.title}({product.quantity})</h5>
              <p className="rupees">{product.price}*{product.quantity}</p>
            </div>
            <div>
              <span className="rupees">{product.price * product.quantity}</span>
            </div>
          </div>
        })
      }
    </div>
  )
}

const Summary = () => {
  const { amount, products } = useCheckout();
  const { user: { cart } } = useUser();
  const [showItemsSummary,setShowItemsSummary]=useState(false)

  const deliveryCharge = amount < 500 ? 50 : 0

  const getItemsQuantity = () => {
    const totalQuantity = products.reduce((acc, cur) => {
      acc = acc + cur.quantity;
      return acc;
    }, 0)
    return totalQuantity
  }

  return (
    <div id="summary-box">
      <h2>Summary</h2>
      <div id="summary-box-content">
        <div>
          <p>Items ({getItemsQuantity()}) : <strong className="rupees">{amount}</strong></p>
          <button className="all-centered" style={{transform:`rotate(${showItemsSummary?'180deg':'0deg'})`}} onClick={()=>setShowItemsSummary(!showItemsSummary)}><FaAngleDown /></button>
        </div>
       {showItemsSummary && <ItemsSummary />}
        <p>Delivery charge : <span className="rupees">{deliveryCharge}</span></p>
        <p>Cash on Delivery charge : <span className="rupees">0</span></p>
        <p>other charges : <span className="rupees">0</span></p>
        <h2>Order Total : <span className="rupees" >{amount + deliveryCharge}</span></h2>
      </div>
    </div>
  );
};

export default Summary;

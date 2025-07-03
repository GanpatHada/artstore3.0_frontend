import './OrderItems.css'


const OrderItem=()=>{
return(
    <div className="order-item">
         <section className="image-section">
            <img src="https://cdn-icons-png.flaticon.com/512/5038/5038590.png" alt="" />
         </section>
         <section className="info-section">
             <a href="/">Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis nemoconsectetur, adipisicing elit. Dolorem aspernatur
             </a>
         </section>
         <section className="action-section">
               <button className='secondary-btn'>Write Review</button>
               <button className='secondary-btn'>View your product</button>
         </section>
    </div>
)
}

const OrderItemHeader=()=>{
   return(
    <header>
           <ul>
            <li>
                <p>ORDER PLACED</p>
                <p>content this is</p>
            </li>
            <li>
                <p>TOTAL</p>
                <p>content this is</p>
            </li>
            <li>
                <p>SHIP TO</p>
                <p>content this is</p>
            </li>
            <li>
                <p>ORDER # SDFKSJFLJSLJSFKJ</p>
                <p><button className='secondary-text-btn'>View order details</button></p>
            </li>
            </ul>  
    </header>
   )
}


const OrderItems = () => {
  return (
    <div className='order-items'>
        <OrderItemHeader/>
        <OrderItem/>
        <OrderItem/>
    </div>
  )
}

export default OrderItems

import './CartItemLoader.css';

const CartItemLoader = ({ count = 1 }) => {
  return (
    <div className='cart-item-loader-wrapper'>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="cart-item-loader"></div>
      ))}
    </div>
  );
};

export default CartItemLoader;
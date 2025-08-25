import "./WishlistItemLoader.css";

const WishlistItemLoader = ({ count = 1 }) => {
  return (
    <div className="loader-wrapper">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} id="wishlist-item-loader">
        </div>
      ))}
    </div>
  );
};

export default WishlistItemLoader;

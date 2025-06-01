import "./ProductInfo.css";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import ProductActions from "../product_actions/ProductActions";
import ProductImage from "../product_image/ProductImage";
import ProductDescription from "../product-description/ProductDescription";
import StarsCreator from "../../../../components/stars_creator/StarsCreator";
import Ratings from "../ratings/Ratings";
import Reviews from "../reviews/Reviews";
import { useProductDetails } from "../../../../hooks/useProductDetails";
import { useEffect, useRef, useState } from "react";
import { CiDiscount1 } from "react-icons/ci";
import PostReview from "../post-review/PostReview";

const BankOffers = () => {
  const {
    productDetails: { bankOffers },
  } = useProductDetails();
  const bankOffersSlide = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollButtons = () => {
    const el = bankOffersSlide.current;
    if (!el) return;

    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth);
  };

  const handleSlide = (slide) => {
    console.log(bankOffersSlide.current.scrollLeft);
    switch (slide) {
      case "LEFT":
        bankOffersSlide.current.scrollBy({ left: -190, behavior: "smooth" });
        break;
      case "RIGHT":
        bankOffersSlide.current.scrollBy({ left: 190, behavior: "smooth" });
        break;

      default:
        return null;
    }
  };

  useEffect(() => {
    const el = bankOffersSlide.current;
    if (!el) return;
    updateScrollButtons();
    el.addEventListener("scroll", updateScrollButtons);

    return () => {
      el.removeEventListener("scroll", updateScrollButtons);
    };
  }, []);
  return (
    <section id="offers-section">
      <header>
        <span>
          <CiDiscount1 />
        </span>
        <h2>Offers</h2>
      </header>
      <div id="bank-offers">
        {canScrollLeft && (
          <button id="slide-left-button" onClick={() => handleSlide("LEFT")}>
            <MdChevronLeft />
          </button>
        )}
        {canScrollRight && (
          <button id="slide-right-button" onClick={() => handleSlide("RIGHT")}>
            <MdChevronRight />
          </button>
        )}
        <div id="bank-offers-wrapper" ref={bankOffersSlide}>
          {bankOffers.map((offer, index) => {
            return (
              <div key={index} className="bank-offer">
                <h5>{offer.bank}</h5>
                <p>{offer.details}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const RatingsPopup = () => {
  return <div id="ratings-popup">
    <Ratings/>
  </div>;
};

const ProductHeadline = () => {
  const [showRatingsPopup, setShowRatingsPopup] = useState(false);
  const {
    productDetails: { title, category, artist, averageRatings, reviews },
  } = useProductDetails();
  return (
    <div id="product-headline">
      <h3 id="title">{title}</h3>
      <h5 id="artist-name">more from artist {artist.fullName}</h5>
      <div id="reviews">
        <span
          id="average-ratings"
          onMouseEnter={() => setShowRatingsPopup(true)}
          onMouseLeave={()=>setShowRatingsPopup(false)}
        >
          <StarsCreator starsCount={averageRatings} />
          {showRatingsPopup && <RatingsPopup />}

        </span>
        <a href="#reviews-section" id="reviews-count">({reviews.length} reviews)</a>
      </div>
    </div>
  );
};

const ProductDetails = () => {
  const {
    productDetails: { tags, discount, price, descriptions,medium,weight,category,surface,dimensions:{height,width,thickness}},
  } = useProductDetails();

  return (
    <section id="product-details">
      {tags.length > 0 && <div className="tag">{tags[0]}</div>}
      <section id="price-section">
        <div>
          <span id="discount">{discount}%</span>
          <strong id="price">{price}</strong>
        </div>
        <strike id="actual-price">
          M.R.P. :<span>{price.toLocaleString()}</span>
        </strike>
      </section>
      <section id="key-details">
        <h4>Key Details</h4>
        <p><strong>Category : </strong><span><strong>{category}</strong></span></p>
        <p><strong>Medium : </strong><span>{medium}</span></p>
        <p><strong>Weight : </strong><span>{weight}gm</span></p>
        <p><strong>Height : </strong><span>{height}</span></p>
        <p><strong>width : </strong><span>{width}gm</span></p>
        <p><strong>thickness : </strong><span>{thickness}cm</span></p>
        <p><strong>surface : </strong><span>{surface}</span></p>
      </section>
      <ProductDescription descriptions={descriptions} />
      <BankOffers />
    </section>
  );
};

const ProductInfo = () => {
  return (
    <div id="product-info">
      <ProductImage />
      <ProductHeadline />
      <ProductDetails />
      <ProductActions />
      <Ratings />
      <PostReview/>
      <Reviews />
    </div>
  );
};

export default ProductInfo;

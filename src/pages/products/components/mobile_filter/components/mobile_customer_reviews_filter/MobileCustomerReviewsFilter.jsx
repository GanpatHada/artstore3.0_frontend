import StarsCreator from "../../../../../../components/stars_creator/StarsCreator";
import "./MobileCustomerReviewsFilter.css";
import filters from '../../../../../../data/filters.json'
import { useFilters } from "../../../../../../hooks/useFilters";
import { FaCheck } from "react-icons/fa";
const MobileCustomerReviewsFilter = () => {
  const customerReviews= filters.find(filter=>filter.name==='Customer Reviews') ;
  const {state:{ratings:appliedRatings},setMinimumRatingFilter}=useFilters();
  return(
    <section id="mobile-customer-reviews-filter">
        <header>
            <h4>Customer Reviews</h4>
        </header>
        <main>
           {customerReviews.options.map((review,index)=>{
            return <div className={`option ${appliedRatings===review&&'selected'}`}
                  onClick={()=>setMinimumRatingFilter(review)}>
                 {appliedRatings===review&&<span className="all-centered"><FaCheck /></span>}
                 <StarsCreator key={index} starsCount={review} showCount={false}/>
                 {index!==0&&<span>& above</span>}
            </div>
           })}
           
        </main>
    </section>
  );
};

export default MobileCustomerReviewsFilter;

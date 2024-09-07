import React from 'react'
import './NoItem.css'
import no_item_wishlist from '../../images/empty_wishlist.png';
import no_item_cart from '../../images/empty_cart.png';
import { makeCapitalize } from '../../utils/GlobalUtils';
const NoItem = ({type='product'}) => {  
  return (
    <div id='no-item' className='all-centered'>
        <section className='image-section'>
           {type.toLowerCase()==='cart'&&<img src={no_item_cart} alt="" />}
           {type.toLowerCase()==='wishlist'&&<img src={no_item_wishlist} alt="" />}
        </section>
        <h2>Your {makeCapitalize(type)} is Empty</h2>
    </div>
  )
}

export default NoItem
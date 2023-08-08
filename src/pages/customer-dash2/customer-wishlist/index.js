import React from 'react'
import style from './index.module.css'
import globle from '../customerDashGloble.module.css'
import WishlistCard from './wishlistCard'
// import { ProductData } from '../../productData';

const Wishlist = () => {


  return (
    <>
      <div className={style.wishlistContainer}>
        <div className={globle.header}>
          <h5>Wishlist</h5>
          <p>your wishes are ought to be fulfilled soon</p>
        </div>
        <section className={style.productList}>
          {
            // ProductData.map((elem) => <WishlistCard key={elem.id} {...elem} />)
          }
        </section>
      </div>
    </>
  )
}

export default Wishlist
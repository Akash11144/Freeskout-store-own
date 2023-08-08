import React, { useMemo } from "react";
import Styles from "./index.module.css";
import { useNavigate } from "react-router-dom";
import AddDelProduct from "../../components/AddDelProduct";
import { formatCurrency } from "../../utlils/variables-and-small functions";
//////////////////////////////////////////////////////////////////

const Cartlist = (props) => {
  const { item, inventory } = props;
  const { skuId, productName, productId, quantity, price, discount, image } =
    item;

  // console.log("inventory : ", item, inventory);

  const navigate = useNavigate();

  const discountedPrice = useMemo(() => {
    return quantity * price - (quantity * price * discount) / 100;
  }, [quantity, price, discount]);

  const isOutOfStock = useMemo(() => {
    return !inventory || !inventory.available || inventory.available < quantity;
  }, [inventory]);

  const available = useMemo(() => {
    if (inventory && inventory.available >= 0) return inventory.available;
    return 0;
  }, [inventory]);

  // ----------------------------------------------------------------------

  return (
    <div>
      <hr className={Styles.hr} />
      <div
        className={`${Styles.item} pe-3 ${
          isOutOfStock ? `${Styles.outOfStock} pb-3` : ""
        }`}
      >
        <picture
          style={{ cursor: "pointer" }}
          onClick={() => navigate(`/product-info/${productId}`)}
        >
          <img src={image} alt="" />
        </picture>
        <div className={Styles.info}>
          <div
            onClick={() => navigate(`/product-info/${productId}`)}
            className={Styles.title}
          >
            {productName}
          </div>
          <div
            onClick={() => navigate(`/product-info/${productId}`)}
            className={Styles.colorInfo}
          >
            <p>{skuId}</p>
          </div>
        </div>
        <div className={Styles.itemQty}>{quantity}</div>
        <div className={Styles.price}>
          <p>
            {formatCurrency(discountedPrice)}
            <br />
            <s style={{ fontSize: "12px", marginLeft: "5px" }}>
              {formatCurrency(quantity * price)}
            </s>
          </p>
        </div>
      </div>
      <div
        className={`d-flex justify-content-end align-items-end pe-4 ${
          isOutOfStock ? Styles.outOfStock : ""
        }`}
      >
        <AddDelProduct
          productID={productId}
          skuId={skuId}
          isOutOfStock={isOutOfStock}
          available={available}
        />
      </div>
      {isOutOfStock && (
        <div
          className={`${Styles.outOfStock} container py-4 text-center mb-0 italic bold`}
        >
          <hr />
          <p className="mb-0 mt-3">Item went out of stock. Please remove it.</p>
        </div>
      )}
    </div>
  );
};

export default Cartlist;

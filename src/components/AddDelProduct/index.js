import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { useCart, useUserSetting } from "../../state-managers/cart-state";
import { setItemServer } from "../../utlils/functions";
import DeleteIcon from "../commonComponents/delete";
import LoaderImg from "../../assets/gif/smileyLoading.gif";

// ////////////////////////////////////

const AddDelProduct = (props) => {
  const {
    productID,
    skuId,
    isOutOfStock = false,
    available = Infinity,
  } = props;

  const [quantity, setQuantity] = useState(0);
  const [pageLoading, setPageLoading] = useState(false);
  const [addLoader, setAddLoader] = useState(false);
  const [subLoader, setSubLoader] = useState(false);
  const [delLoader, setDelLoader] = useState(false);
  const [pageError, setPageError] = useState(false);

  const incCartData = useCart((state) => state.incCartData);
  const delCartData = useCart((state) => state.delCartData);
  const delCartAllData = useCart((state) => state.delCartAllData);
  const cartData = useCart((state) => state.cartData);

  const userToken = useUserSetting((state) => state.token);
  const userInfo = useUserSetting((state) => state.info);

  // -----------------------------------

  useEffect(() => {
    // console.log(
    //   "add-del-product use-effect: ",
    //   productID,
    //   skuId,
    //   isOutOfStock,
    //   available,
    //   "and data: ",
    //   cartData ? cartData : 0
    // );
    getQuantity();
  }, [productID, skuId]);

  function getQuantity() {
    // console.log("add-delete getQuantity() => ", cartData);
    const item = cartData.find(
      (ele) => ele?.product === productID && ele?.skuId === skuId
    );
    setQuantity(item ? item.quantity : 0);
  }

  const HandleAdd = async (a, b) => {
    // console.log("available", available);
    console.time();
    setAddLoader(true);
    if (userToken) {
      if (await setItemServer(true, false, productID, skuId)) {
        incCartData(a, b);
        getQuantity();
        console.timeEnd();
        toast.success("Item added successfully");
        setAddLoader(false);
        return;
      }
      console.timeEnd();
      toast.info("Something went wrong try again later!");
      setAddLoader(false);
      return;
    }
    incCartData(a, b);
    getQuantity();
    toast.success("Item added successfully");
    setAddLoader(false);
    console.timeEnd();
    return;
  };

  const HandleDelete = async (a, b) => {
    setSubLoader(true);
    console.time();
    if (userToken) {
      if (await setItemServer(false, false, productID, skuId)) {
        delCartData(a, b);
        toast.error("Item removed from cart");
        getQuantity();
        console.timeEnd();
        setSubLoader(false);
        return;
      }
      console.timeEnd();
      toast.info("Something went wrong try again later!");
      setPageError("Something went wrong try again later!");
      setSubLoader(false);
      return;
    }
    delCartData(a, b);
    toast.error("Item removed from cart");
    getQuantity();
    setSubLoader(false);
    console.timeEnd();
  };

  const HandleDeleteAll = async (a, b, c) => {
    // console.time();
    setDelLoader(true);
    if (userToken) {
      if (await setItemServer(false, true, productID, skuId)) {
        delCartAllData(a, b, c);
        toast.error("Item removed from cart");
        getQuantity();
        console.timeEnd();
        setDelLoader(false);
        return;
      }
      console.timeEnd();
      toast.info("Something went wrong try again later!");
      setPageError("Something went wrong try again later!");
      setDelLoader(false);
      return;
    }
    delCartAllData(a, b, c);
    toast.error("Item removed from cart");
    getQuantity();
    setPageLoading(false);
    // console.timeEnd();
  };

  // console.log("inside add-del-pro render", productID, skuId, quantity);
  return (
    <div className="mt-auto">
      <>
        {isOutOfStock ? (
          <>
            <Button
              className="bg-light-subtle border-0 me-2"
              onClick={() => HandleDeleteAll(productID, skuId, quantity)}
            >
              <DeleteIcon width={20} height={20} color={"Red"} />
            </Button>
            <Button variant="outline-secondary" disabled={true}>
              Out of Stock
            </Button>
          </>
        ) : !quantity ? (
          <Button
            disabled={pageLoading || isOutOfStock}
            onClick={() => HandleAdd(productID, skuId)}
            className="w-100"
          >
            + Add To Cart
          </Button>
        ) : (
          <div
            className="d-flex align-items-center justify-content-center"
            style={{
              gap: "5px",
              margin: "unset !important",
              padding: "unset !important",
            }}
          >
            <>
              <Button
                // variant="danger"
                className="bg-white border-0"
                onClick={() => HandleDeleteAll(productID, skuId, quantity)}
                disabled={
                  pageLoading ||
                  isOutOfStock ||
                  addLoader ||
                  delLoader ||
                  subLoader
                }
              >
                {delLoader ? (
                  <>
                    <div
                      class="spinner-border text-dark"
                      role="status"
                      style={{ width: "16px", height: "16px" }}
                    >
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  </>
                ) : (
                  <DeleteIcon width={20} height={20} color={"Red"} />
                )}
              </Button>
              {!isOutOfStock && (
                <>
                  <Button
                    onClick={() => HandleDelete(productID, skuId)}
                    disabled={
                      pageLoading ||
                      isOutOfStock ||
                      addLoader ||
                      delLoader ||
                      subLoader
                    }
                  >
                    {subLoader ? (
                      <>
                        <div
                          class="spinner-border text-light"
                          role="status"
                          style={{ width: "16px", height: "16px" }}
                        >
                          <span class="visually-hidden">Loading...</span>
                        </div>
                      </>
                    ) : (
                      <span style={{ fontSize: "16px" }}>-</span>
                    )}
                  </Button>
                  <span>{quantity}</span>
                  <Button
                    disabled={
                      pageLoading ||
                      available - quantity <= 0 ||
                      addLoader ||
                      subLoader ||
                      delLoader
                    }
                    onClick={() => HandleAdd(productID, skuId)}
                  >
                    {addLoader ? (
                      <>
                        <div
                          class="spinner-border text-light"
                          role="status"
                          style={{ width: "16px", height: "16px" }}
                        >
                          <span class="visually-hidden">Loading...</span>
                        </div>
                      </>
                    ) : (
                      <span style={{ fontSize: "16px" }}>+</span>
                    )}
                  </Button>
                </>
              )}
            </>
          </div>
        )}
      </>
    </div>
  );
};
export default AddDelProduct;

import React, { useEffect, useState } from "react";
import { useUserSetting, useWishList } from "../../state-managers/cart-state";
import { setWishlistServer } from "../../utlils/functions";
import likeStyle from "./index.module.css";
import { AiFillHeart } from "react-icons/ai";
import MyToast from "../toast";
import { toast } from "react-toastify";

function Like(props) {
  const { productID, skuId } = props;

  const [liked, setLiked] = useState(false);

  const addList = useWishList((state) => state.addList);
  const delList = useWishList((state) => state.delList);
  const list = useWishList((state) => state.list);
  const token = useUserSetting((state) => state.token);

  function getLiked() {
    if (!list || !list.length) {
      setLiked(false);
      return;
    }
    for (let i = 0; i < list.length; i++) {
      if (list[i].product === productID && list[i].skuId === skuId) {
        setLiked(true);
        return;
      }
    }
    setLiked(false);
  }

  useEffect(() => {
    getLiked();
  }, [productID, skuId]);

  const HandleAdd = async () => {
    setLiked((cur) => !cur);
    if (token) {
      if (liked) {
        if (setWishlistServer(false, productID, skuId)) {
          delList(productID, skuId);
          toast.warning("Wishlist Cleared");
        }
        return;
      }
      if (setWishlistServer(true, productID, skuId)) {
        addList(productID, skuId);
        toast.info("Product wishlisted");
      }
      return;
    }
    if (liked) {
      delList(productID, skuId);
    } else {
      addList(productID, skuId);
    }
  };
  return (
    <button
      className={likeStyle.btn}
      onClick={(e) => {
        e.preventDefault();
        HandleAdd();
      }}
      // style={{ position: "absolute", top: "0", right: "0", zIndex: "97" }}
    >
      <AiFillHeart
        className={`${likeStyle.likeCont} ${
          liked ? likeStyle.red : likeStyle.grey
        }`}
      />
    </button>
  );
}
export default Like;

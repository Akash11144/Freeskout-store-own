import React, { useEffect, useState } from "react";
import Pagination from "../../../components/commonComponents/pagination";
import { SelectBox } from "../../../components/commonComponents/select-box";
import {
  getMyOrdersPageCount,
  getMyPaginatedOrders,
  getTrackingInfo,
} from "../../../config/configService";
import { ITEMS_PER_PAGE_OPTIONS } from "../../../constants";
import { useUserSetting } from "../../../state-managers/cart-state";
import style from "./orderHistory.module.css";
import OrderHistoryProduct from "./orderHistoryProduct";
import ProductStatusNav from "./productStatusNav";
import Loader from "../../../assets/gif/circularLoader.gif";
const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [totalCount, setTotalCount] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [trackingData, setTrackingData] = useState({});
  const [loading, setLoading] = useState(false);

  let userToken = useUserSetting((state) => state.token);
  let influencerData = useUserSetting((state) => state.influencerList);
  let addInfluencerState = useUserSetting((state) => state.addInfluencer);

  // ----------------------- useEffects -----------------------

  useEffect(() => {
    fetchOrders(page);
  }, [page, itemsPerPage]);

  useEffect(() => {
    fetchOrderCount(itemsPerPage);
  }, [itemsPerPage]);

  useEffect(() => {
    fetchTrackingInfo(orders);
  }, [orders]);

  const fetchOrders = async (pg = 1, itemCount = 3) => {
    try {
      setLoading(true);
      let params = {
        page: pg,
        itemsPerPage: itemCount,
      };
      const res = await getMyPaginatedOrders(params);
      // console.log("orders", res);
      if (!res || res.issue) throw new Error("something went wrong");
      setOrders(res.result);
    } catch (error) {
      // console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrderCount = async (itemCount = 3) => {
    try {
      setLoading(true);
      let params = {
        itemsPerPage: itemCount,
      };
      const res = await getMyOrdersPageCount(params);
      if (!res || res.issue) throw new Error("something went wrong");
      setPageCount(res.result.count);
      setTotalCount(res.result.totalDocs);
    } catch (error) {
      // console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTrackingInfo = async (orderList) => {
    try {
      const awbs = orderList.map((item) => {
        return item.awbData.response.data.awb_code;
      });

      if (awbs.length) {
        const res = await getTrackingInfo(awbs);
        if (res.result && res.result.trackingData) {
          setTrackingData(res.result.trackingData);
        }
      }
    } catch (error) {}
  };

  const getOrderTrackingFromMap = (orderItem, trackingMap) => {
    const awb = orderItem.awbData.response.data.awb_code;
    const data = (trackingMap && trackingMap[awb]) || null;
    return data;
  };

  // ----------------------- useEffects -----------------------

  return (
    <div className={`${style.orderHistory}`}>
      <div className={`${style.ohWrapper}`}>
        <div className={`${style.ohHeader}`}>
          <h5 className={`${style.ohPageNavHeading}`}>Order history</h5>
          <p className={`${style.ohPageNavPara}`}>
            Check the status of recent and old orders & keep track of your
            records
          </p>
        </div>
        {loading ? (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "grid",
              placeItems: "center",
            }}
          >
            <img src={Loader} alt="loader" style={{ width: "100% " }} />
          </div>
        ) : !orders || !orders.length ? (
          <>No orders found</>
        ) : (
          <>
            {orders.map((item, index) => (
              <div
                key={`${item.id ? item.id : index}`}
                className={`${style.ohProductContain}`}
              >
                <ProductStatusNav
                  order={item}
                  orderTrackingData={getOrderTrackingFromMap(
                    item,
                    trackingData
                  )}
                />
                <OrderHistoryProduct
                  key={`${item.id ? item.id : index}`}
                  order={item}
                  orderTrackingData={getOrderTrackingFromMap(
                    item,
                    trackingData
                  )}
                />
                <hr></hr>
              </div>
            ))}

            <div className="d-flex justify-content-between align-content-end my-3 gap-2 mt-2">
              <div className="">
                <SelectBox
                  labelStyles={"size12 mb-1"}
                  inputStyles={"mx-w-5rem"}
                  label={"Items per page"}
                  optionsData={ITEMS_PER_PAGE_OPTIONS}
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(e);
                  }}
                />
              </div>
              <div className="mt-2">
                <Pagination
                  page={page}
                  setPage={setPage}
                  pageCount={pageCount}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;

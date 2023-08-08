import { lazy, Suspense, useEffect } from "react";
import { useLocation, useRoutes } from "react-router-dom";
import Homepage from "./pages/homepage";
import Loader from "./components/loader";
import CategoryProducts from "./components/homePageComponents/popularCategories/categoriesPage";

// ----------------------------------------------------------
const UserLogin = lazy(() => import("./components/login"));
const AllProducts = lazy(() => import("./pages/all-products"));
const Brandspecific = lazy(() => import("./pages/brand-specific-produts"));
const CustomerDash2 = lazy(() => import("./pages/customer-dash2"));
const ProductInfo = lazy(() => import("./pages/product-info"));
const Cart = lazy(() => import("./pages/cart"));
const WishList = lazy(() => import("./pages/wishlist-page"));
const ShippingInfo = lazy(() => import("./pages/shipping-info/Index.jsx"));

// ------------------------------------------------------------

export function MainRoutes() {
  const ScrollToTop = () => {
    const location = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [location.pathname]);

    return null;
  };
  let element = useRoutes([
    {
      path: "/",
      element: <Homepage />,
    },
    {
      path: "/login",
      element: (
        <Suspense fallback={<Loader></Loader>}>
          <ScrollToTop />
          <UserLogin />
        </Suspense>
      ),
    },
    {
      path: "/product-info/:productID",
      element: (
        <Suspense fallback={<Loader></Loader>}>
          <ScrollToTop />
          <ProductInfo />
        </Suspense>
      ),
    },
    {
      path: "/combo-info/:comboID",
      element: (
        <Suspense fallback={<Loader></Loader>}>
          <h1> combo products </h1>
        </Suspense>
      ),
    },
    {
      path: "/cart",
      element: (
        <Suspense fallback={<Loader></Loader>}>
          <ScrollToTop />
          <Cart />
        </Suspense>
      ),
    },
    {
      path: "/wishlist",
      element: (
        <Suspense fallback={<Loader></Loader>}>
          <ScrollToTop />
          <WishList />
        </Suspense>
      ),
    },
    {
      path: "/shipping-info/:productID/:skuID",
      element: (
        <Suspense fallback={<Loader></Loader>}>
          <ScrollToTop />
          <ShippingInfo />
        </Suspense>
      ),
    },
    {
      path: "/shipping-info-cart/",
      element: (
        <Suspense fallback={<Loader></Loader>}>
          <ScrollToTop />
          <ShippingInfo />
        </Suspense>
      ),
    },
    {
      path: "/noInternet",
      element: (
        <Suspense fallback={<Loader></Loader>}>
          <ScrollToTop />
          <h1>NO INTERNET</h1>
        </Suspense>
      ),
    },
    {
      path: "/profile/*",
      element: (
        <Suspense fallback={<Loader></Loader>}>
          <ScrollToTop />
          <CustomerDash2></CustomerDash2>
        </Suspense>
      ),
    },

    {
      path: "/pastOrders",
      element: (
        <Suspense fallback={<Loader></Loader>}>
          <ScrollToTop />
        </Suspense>
      ),
    },
    {
      path: "/all-products",
      element: (
        <Suspense fallback={<Loader></Loader>}>
          <ScrollToTop />
          <AllProducts />
        </Suspense>
      ),
    },
    {
      path: "/brandProducts/:brandId",
      element: (
        <Suspense fallback={<Loader></Loader>}>
          <ScrollToTop />
          {<Brandspecific />}
        </Suspense>
      ),
    },
    {
      path: "/categoryProducts/:categoryId",
      element: (
        <Suspense fallback={<Loader></Loader>}>
          <ScrollToTop />
          {<CategoryProducts />}
        </Suspense>
      ),
    },
    {
      path: "*",
      element: (
        <Suspense fallback={<Loader></Loader>}>
          <ScrollToTop />
          <h1>PAGE NOT FOUND</h1>
        </Suspense>
      ),
    },
  ]);
  return element;
}

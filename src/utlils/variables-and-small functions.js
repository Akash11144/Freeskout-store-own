const CURRENCY_FORMATTER = new Intl.NumberFormat("en-IN", {
  currency: "INR",
  style: "currency",
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
});

const dateTimeOptions = {
  timeZone: "IST",
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "numeric",
};
const dateTimeFormatter = new Intl.DateTimeFormat("en-US", dateTimeOptions);
export const dateTimeFormat = dateTimeFormatter.format;

export const formatCurrency = (number) => {
  return CURRENCY_FORMATTER.format(number);
};

// ---------------------------------------------------------------

const d = new Date();

export function CurrentDate() {
  return d.toDateString();
}

export function CurrentTime() {
  return d.toTimeString();
}

// ------------------------------------------------------------------
let local = "https://shopapi.freeskout.com";
let heroku = "https://com-bk.herokuapp.com";
export const LOCAL_LINK = "https://shopapi.freeskout.com";
export const DIMENSITY_GET_ROUTE_INFO =
  "https://dimensityapi.freeskout.com/imp/unsecuredRouteInfo";

// -------------------------------------------------------------------

export const ONE_DAY = 86400000;

// -------------------------------------------------------------------

export const CheckValidSlug = (a, b) => {
  console.log(a, b);

  if (!a) {
    if (Date.now() - new Date(b[1]).getTime() > ONE_DAY) return false;
    else return b[0];
  } else if (!b) {
    if (Date.now() - new Date(a.time).getTime() > ONE_DAY) return false;
    else return a.name;
  } else {
    // let a1 = new Date('Wed Nov 16 2022 18:30:55 GMT+0530 (India Standard Time)');
    // let a2 = new Date('Wed Nov 16 2022 18:30:54 GMT+0530 (India Standard Time)');
    let a1 = new Date(a.time);
    let a2 = new Date(b[1]);
    let a3 = a1.getTime();
    let a4 = a2.getTime();
    let a5 = Date.now();
    let a6 = a5 - a3 > ONE_DAY;
    let a7 = a5 - a2 > ONE_DAY;
    // console.log("checking", ONE_DAY, a1, a2, a3, a4, a5, (a5 - a3), (a5 - a4), a6, a7);
    if (a6 && a7) return false;
    else {
      if (a6) return b[0];
      else if (a7) return a.name;
      else {
        if (a3 < a4) return b[0];
        else return a.name;
      }
    }
  }
};

// -------------------------------------------------------------------

export const calculateTotalPrice = (storeOrder) => {
  if (
    !storeOrder ||
    !storeOrder.order_items ||
    !storeOrder.order_items.length
  ) {
    // console.log("hehehehehe");
    return null;
  }
  if (isNaN(storeOrder.shipping_charges)) {
    // console.log("hereree");
    return null;
  }

  const shippingAmount = storeOrder.shipping_charges;
  const subtotalAmount = storeOrder.sub_total;
  const discountAmount = storeOrder.total_discount;

  return subtotalAmount - discountAmount + shippingAmount;
};

export const hasInventory = (inventory) => {
  if (!Object.keys(inventory).length) return false;
  const itemInventory = inventory[Object.keys(inventory)[0]];
  if (
    itemInventory &&
    !isNaN(itemInventory.currentCount) &&
    itemInventory.currentCount > 0
  )
    return true;
  return false;
};

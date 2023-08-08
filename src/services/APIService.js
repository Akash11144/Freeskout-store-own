// export const baseUrl = "https://crmapi.freeskout.com";
// export const baseUrl = "https://shopapi.freeskout.com";
// export const baseUrl = "http://localhost:1122";
export const baseUrl = "";
export const testUrl =
  "https://4tzlgwpziwmx7wd4fah2oel4eu0qngrz.lambda-url.ap-south-1.on.aws";
export const bannerUrl =
  "https://634vykyced3g7dhkzaha2geaae0nzltj.lambda-url.ap-south-1.on.aws";
export const brandUrl =
  "https://rqrv2ppafxtq5xswrdd6p3qxdu0gzaxr.lambda-url.ap-south-1.on.aws";
export const cartUrl =
  "https://j27vz43y7a6jqzs4zwbw5trr3e0tmcze.lambda-url.ap-south-1.on.aws";
export const cloudinaryUrl =
  "https://kfxcgx5zlvnfm3nihiw4irxzpe0mmeif.lambda-url.ap-south-1.on.aws";
export const dataUrl =
  "https://w3cojffb66doe6tmozb4csm23i0trnen.lambda-url.ap-south-1.on.aws";
export const emailUrl =
  "https://agxexo37klmx5ytqlpbbzvizfm0addww.lambda-url.ap-south-1.on.aws";
export const influencerListUrl =
  "https://lqdg7yal73sphmuxhuwa24i7mu0wwwpz.lambda-url.ap-south-1.on.aws";
export const influencerUrl =
  "https://2zq4kau2lgldu5tagkcoloet6e0wsxzc.lambda-url.ap-south-1.on.aws";
export const inventoryUrl =
  "https://kahhin5jpjv42plp2vizgjojei0mfvvf.lambda-url.ap-south-1.on.aws";
export const orderUrl =
  "https://3gslsnf6zavqc7fysf5zsxhke40uhlwr.lambda-url.ap-south-1.on.aws";
export const paymentUrl =
  "https://hhxjqutc5jm4otdsjy6cr3quiq0iivdw.lambda-url.ap-south-1.on.aws";
export const productComboUrl =
  "https://4jratchygy6wgg52ur66idet6i0ebgbs.lambda-url.ap-south-1.on.aws";
export const productUrl =
  "https://a5ru77hfxfm27murp5ndhmxko40bpojo.lambda-url.ap-south-1.on.aws";
export const reviewUrl =
  "https://5xl7r5mvsy6nuwbpzmkzdq4c5a0jgotz.lambda-url.ap-south-1.on.aws";
export const shippingUrl =
  "https://5w644hjwkxd63zjofb7sv5ux7m0masln.lambda-url.ap-south-1.on.aws";
export const storeDataUrl =
  "https://jup7ourch62sf2vlkrkdlk3ju40zqibb.lambda-url.ap-south-1.on.aws";
export const userUrl =
  "https://g2k24klyc4phvprgyef2opvhau0yjvia.lambda-url.ap-south-1.on.aws";
export const wishlistUrl =
  "https://uvsg4obe4t74dunkmxmfs4b7qe0tpuxp.lambda-url.ap-south-1.on.aws";
export const categoryUrl =
  "https://xzxiydpnlxpsv52bxu74347fti0tvtip.lambda-url.ap-south-1.on.aws";

///////////////////////  API V1  /////////////////////////////////

const apiPath = "";

const basePrefix = baseUrl + apiPath;

const { getAuthToken } = require("./storageService");

const getHeaders = (multipart = false) => {
  let headers = multipart
    ? {}
    : {
        "Content-Type": "application/json",
      };

  const authToken = getAuthToken();

  if (authToken) {
    headers.authorization = authToken;
  }

  return headers;
};

export const GET = (path, signal) => {
  // console.log("inside get allCombos function: ", path, signal);
  return new Promise((resolve, reject) => {
    fetch(basePrefix + path, {
      method: "GET",
      headers: getHeaders(),
      signal,
    })
      .then((response) => response.json())
      .then(resolve)
      .catch(reject);
  });
};

export const GET_UNAUTHENTICATED = (path, signal) => {
  return new Promise((resolve, reject) => {
    fetch(basePrefix + path, { signal })
      .then((response) => response.json())
      .then(resolve)
      .catch(reject);
  });
};

export const POST = (path, data) => {
  return new Promise((resolve, reject) => {
    fetch(basePrefix + path, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .then(resolve)
      .catch(reject);
  });
};

export const POSTFILE = (path, file) => {
  const formData = new FormData();
  formData.append("file", file);
  return new Promise((resolve, reject) => {
    fetch(basePrefix + path, {
      method: "POST",
      headers: getHeaders(true),
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .then(resolve)
      .catch(reject);
  });
};

export const PUT = (path, data) => {
  return new Promise(async (resolve, reject) => {
    fetch(basePrefix + path, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .then(resolve)
      .catch(reject);
  });
};

export const PATCH = (path, data) => {
  return new Promise(async (resolve, reject) => {
    fetch(basePrefix + path, {
      method: "PATCH",
      headers: getHeaders(),
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .then(resolve)
      .catch(reject);
  });
};

export const DELETE = (path, data) => {
  return new Promise(async (resolve, reject) => {
    fetch(basePrefix + path, {
      method: "DELETE",
      headers: getHeaders(),
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .then(resolve)
      .catch(reject);
  });
};

// --------------------------------

export const handleApiErrors = (error) => {
  let message = "An unknown error occurred.";

  if (error.response) {
    message = `Server error: ${error.response.status} ${error.response.statusText}`;
  } else if (error.request) {
    message = "Network error: Unable to fetch data.";
  } else {
    message = `Request error: ${error.message}`;
  }
  return message;
};

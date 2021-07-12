const jsonServer = require("json-server");
const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const router = jsonServer.router("db.json");
server.use(jsonServer.bodyParser);
server.use(middlewares);

const _404 = ({ stustsCode }) => {
  return { success: false, stustsCode };
};

router.render = (req, res) => {
  //console.log("router.render -> req", req._parsedOriginalUrl.path);
  switch (req.method) {
    case "GET":
      if (
        req._parsedOriginalUrl.path ==
        "/merchant/store/store_id/branch/branch_id/order?type=all"
      )
        return res.json({
          success: true,
          results: {
            incoming: res.locals.data,
            reservation: res.locals.data,
          },
        });
      if (
        req._parsedOriginalUrl.path ==
        "/merchant/store/store_id/branch/branch_id/order?type=incoming"
      )
        return res.json({
          success: true,
          results: {
            incoming: res.locals.data,
          },
        });
      if (
        req._parsedOriginalUrl.path ==
        "/merchant/store/store_id/branch/branch_id/order?type=reservation"
      )
        return res.json({
          success: true,
          results: {
            reservation: res.locals.data,
          },
        });
      return res.json({
        success: true,
        results: res.locals.data,
      });
    case "POST":
      if (req.originalUrl == "/api/mobile/sign-in") {
        res.statusCode = 200;
        return res.json({
          success: true,
          results: {
            _id: "1",
            userName: "zhlee1997",
            fullName: "Lee Zonghan",
            identityNumber: "970619075581",
            passportNumber: null,
            email: "leezonghan1997@gmail.com",
            mobile: "60124389885",
            address: "253, 9, Lorong Seoul, Taman Seoul, 09000, Kulim Kedah",
            isSubscribed: false,
            numberOfUnreadMessages: "21",
            profileImage:
              "https://i.pinimg.com/474x/bc/d4/ac/bcd4ac32cc7d3f98b5e54bde37d6b09e.jpg",
          },
        });
      } else if (req.originalUrl == "/api/mobile/sign-out") {
        res.statusCode = 200;
        return res.json({
          success: true,
          results: {},
        });
      }
      return res.json({
        success: true,
        results: res.locals.data,
      });
    case "PATCH":
      return res.json({
        success: true,
        results: res.locals.data,
      });
    case "DELETE":
      return res.json({
        success: true,
        results: res.locals.data,
      });
    default:
      next();
      break;
  }
};
server.use(
  jsonServer.rewriter({
    //--------merchant route-----------//
    // "/merchant/riders": "/riders",
    //"/merchant/signout": "/empty", //sign a merchant out
    //"/merchant/signin/google": "/user", //sign a merchant in

    "/api/mobile/talikhidmat/create": "/talikhidmat", // POST new case

    "/api/mobile/bus?routeId=1": "/busStation", // GET bus stations
    "/api/mobile/bus?routeId=2": "/busStation2", // GET bus stations
    "/api/mobile/bus/1/stations/:stationId": "/station", // GET one bus station
    "/api/mobile/bus/2/stations/:stationId": "/station2", // GET one bus station

    "/api/mobile/live": "/cctvCoordinates", // GET CCTV
    "/api/mobile/live/:liveId": "/cctvDetail", // GET CCTV detail

    "/api/mobile/support/termsAndCondition": "/termsAndCondition", // GET terms and condition
    "/api/mobile/support/privacyPolicy": "/privacyPolicy", // GET privacy policy

    "/merchant/user": "/user", //PATCH user info
    "/merchant/payout": "/payout/1", // get a merchant payout option //PATCH GET DELETE
    "/merchant/store": "/store", //get all merchant store //POST GET
    "/merchant/store/:store_id": "/store/:store_id", // get a merchant store //PATCH GET DELETE
    "/merchant/store/store_id/branch": "/branches", //get all branch of a store//POST GET
    "/merchant/store/store_id/branch/:branch_id": "/branches/:branch_id", //get a branch of a store//PATCH GET DELETE
    "/merchant/store/store_id/branch/branch_id/order?type=all": "/orders", //get all order
    "/merchant/store/store_id/branch/branch_id/order?type=incoming": "/orders", //get incoming order
    "/merchant/store/store_id/branch/branch_id/order?type=reservation":
      "/orders", //get reservation order
    "/merchant/store/store_id/branch/branch_id/order/:consumer_transactions_id":
      "/orders/:consumer_transactions_id", //PATCH update the order status
    "/merchant/store/store_id/product?type=food": "/food", //get store food //GET POST
    "/merchant/store/store_id/product/:product_id?type=food":
      "/food/:product_id", //GET PACTH
    "/merchant/store/store_id/product?type=goods": "/goods", //get store goods //GET POST
    "/merchant/store/store_id/product/:product_id?type=goods":
      "/goods/:product_id", //GET PACTH
    "/merchant/store/:store_id/food_variation": "/food_variation", //GET POST food_variation
    "/merchant/store/:store_id/food_variation/:food_variation_id":
      "/food_variation/:food_variation_id",
    "/merchant/store/store_id/branch/branch_id/catalogues?type=food":
      "/foods_catalogues", //GET POST FOOD CATALOGUES
    "/merchant/store/store_id/branch/branch_id/catalogues?type=goods":
      "/goods_catalogues", //GET POST GOODS CATALOGUES
    "/merchant/store/store_id/branch/branch_id/catalogues/:catalogues_id?type=food":
      "/foods_catalogues/:catalogues_id", //PATCH DELETE FOOD CATALOGUES
    "/merchant/store/store_id/branch/branch_id/catalogues/:catalogues_id?type=goods":
      "/goods_catalogues/:catalogues_id", //PATCH DELETE GOODS CATALOGUES
    //was "/foods_catalogues/:branch_id"
    //--------merchant route-----------//
  })
);
router.db._.id = "_id"; // set id option here
server.db = router.db;

server.use(router);

server.listen(3000, () => {
  console.log("JSON Server is running");
});

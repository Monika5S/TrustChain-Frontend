import {
  createCampaign,
  dashboard,
  logout,
  menu,
  money,
  payment,
  profile,
  withdraw,
} from "../assets";

export const navlinks = {
  customer: [
    {
      name: "dashboard",
      imgUrl: dashboard,
      link: "/user-dashboard/products",
    },

    {
      name: "purchasedproducts",
      imgUrl: createCampaign,
      link: "/user-dashboard/purchased-products",
    },

    {
      name: "payments",
      imgUrl: payment,
      link: "/user-dashboard/payments",
    },

    {
      name: "profile",
      imgUrl: profile,
      link: "/user-dashboard/profile",
    },
  ],
  store: [
    {
      name: "store",
      imgUrl: dashboard,
      link: "/store-dashboard/products",
    },
    {
      name: "product",
      imgUrl: createCampaign,
      link: "/store-dashboard/create-product",
    },
    {
      name: "orders",
      imgUrl: payment,
      link: "/store-dashboard/orders",
    },
    {
      name: "profile",
      imgUrl: profile,
      link: "/store-dashboard/store-profile",
    },
  ],
  charityOrg: [
    {
      name: "dashboard",
      imgUrl: dashboard,
      link: "/charity-dashboard/charity-campaigns",
    },
    {
      name: "campaign",
      imgUrl: createCampaign,
      link: "/charity-dashboard/create-campaign",
    },
    {
      name: "donations",
      imgUrl: payment,
      link: "/charity-dashboard/donations",
    },
    {
      name: "profile",
      imgUrl: profile,
      link: "/charity-dashboard/profile",
    },
  ],
};

import {
  createCampaign,
  dashboard,
  logout,
  payment,
  profile,
  withdraw,
} from "../assets";

export const navlinks = {
  customer: [
    {
      name: "dashboard",
      imgUrl: dashboard,
      link: "/all-campaigns",
    },
    {
      name: "campaign",
      imgUrl: createCampaign,
      link: "/create-campaign",
    },
    // {
    //   name: "dashboard",
    //   imgUrl: dashboard,
    //   link: "/all-campaigns",
    // },
    // {
    //   name: "store",
    //   imgUrl: payment,
    //   link: "/store-dashboard/cooperative-store",
    // },
    // {
    //   name: 'withdraw',
    //   imgUrl: withdraw,
    //   link: '/',
    //   disabled: true,
    // },
    {
      name: "profile",
      imgUrl: profile,
      link: "/profile",
    },
    // {
    //   name: "logout",
    //   imgUrl: logout,
    //   link: "/",
    //   disabled: true,
    // },
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
      name: "profile",
      imgUrl: profile,
      link: "/charity-dashboard/profile",
    },
  ],
};

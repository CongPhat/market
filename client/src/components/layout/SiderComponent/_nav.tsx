import {
  faTachometerAlt,
  faUsersCog,
  faUserFriends,
  faLaptopMedical,
} from "@fortawesome/free-solid-svg-icons";

export const routerSidebar = [
  {
    name: {
      USA: "Dashboard",
      VNM: "Trang Chủ",
    },
    flgAwesome: true,
    icon: faTachometerAlt,
    path: "/dashboard",
    permissionCode: "ALLOW",
    activePath: ["/dashboard", "/"],
    children: [],
    exact: true,
  },
  {
    name: {
      USA: "Devices",
      VNM: "Thiết bị",
    },
    flgAwesome: true,
    icon: faLaptopMedical,
    path: "DEVICES",
    permissionCode: "ALLOW",
    activePath: ["DEVICES", "DEVICE_CREATE", "DEVICE_DETAIL"],
    children: [],
  },
  {
    name: {
      USA: "Customers",
      VNM: "Khách hàng",
    },
    flgAwesome: true,
    icon: faUserFriends,
    path: "CUSTOMERS",
    permissionCode: "ALLOW",
    activePath: ["CUSTOMERS", "CUSTOMER_CREATE", "CUSTOMER_DETAIL"],
    children: [],
  },
  {
    name: {
      USA: "Users",
      VNM: "Người dùng",
    },
    flgAwesome: true,
    icon: faUsersCog,
    path: "USERS",
    permissionCode: "ALLOW",
    activePath: ["USERS", "USER_CREATE", "USER_DETAIL"],
    children: [],
  },
];

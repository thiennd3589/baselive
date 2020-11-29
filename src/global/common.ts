import { Menu } from "interfaces/common";

interface GlobalInterface {
  menu: Menu[];
  //User
  isAuthenticated: boolean;
  user: {
    token?: string;
  };
}

export let Global: GlobalInterface = {
  menu: [
    {
      title: "Basic info",
      route: "/basicInfo",
      icon: "info circle",
    },
    {
      title: "Detail",
      route: "/eventDetail",
      icon: "keyboard",
    },
    {
      title: "Online event page",
      route: "/onlineEvent",
      icon: "edge",
    },
    {
      title: "Ticket",
      route: "/ticket",
      icon: "ticket",
    },
    {
      title: "Publish",
      route: "/publish",
      icon: "announcement",
    },
  ],
  //User
  isAuthenticated: false,
  user: {
    token: undefined,
  },
};

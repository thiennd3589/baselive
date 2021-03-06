import { Menu } from "interfaces/common";

export enum LANG {
  EN = "en",
  VI = "vi",
}

interface GlobalInterface {
  menu: Menu[];
  //User
  isAuthenticated: boolean;
  user: {
    token?: string | null;
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
      title: "Stage",
      route: "/stage",
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
    token: null,
  },
};

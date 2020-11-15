interface GlobalInterface {
  isAuthenticated: boolean;
  user: {
    token?: string;
  };
}

export let Global: GlobalInterface = {
  isAuthenticated: false,
  user: {
    token: undefined,
  },
};

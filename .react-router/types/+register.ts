import "react-router";

declare module "react-router" {
  interface Register {
    params: Params;
  }
}

type Params = {
  "/": {};
  "/organization": {};
  "/organization/:id": {
    "id": string;
  };
  "/organization/:id/list": {
    "id": string;
  };
  "/organization/:id/map": {
    "id": string;
  };
  "/profile": {};
  "/profile/:id": {
    "id": string;
  };
};
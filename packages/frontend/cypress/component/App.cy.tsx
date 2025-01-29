import React from "react";
import { mount } from "@cypress/react18";
import App from "../../src/App";

describe("App", () => {
  it("mounts without error", () => {
    mount(<App />);
  });
});

/// <reference path="../typings/globals/mocha/index.d.ts" />
/// <reference path="../typings/globals/chai/index.d.ts" />
/// <reference path="../typings/globals/promises-a-plus/index.d.ts" />
/// <reference path="../typings/globals/chai-as-promised/index.d.ts" />

import * as React from "react";
import { shallow } from "enzyme";
import App from "../src/App";

const expect = chai.expect;

describe("<App />", () => {
  it("is a h1", () => {
    let wrapper = shallow(<App />);
    expect(wrapper.is("h1")).to.be.true;
  });
});

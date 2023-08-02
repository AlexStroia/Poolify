import React from "react";
import { render } from "@testing-library/react";
import { NewComponent } from "../src/components/NewComponent";
import { BrowserRouter } from "react-router-dom";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn().mockReturnValue({
    authentication: {
      user: { userId: "test_user_id", email: "test_user_email" },
    },
    dashboard: {
      loading: false,
      errorMessage: null,
    },
  }),
}));

describe("NewComponent", () => {
  it("matches the snapshot", () => {
    const { asFragment } = render(
      <BrowserRouter>
        <NewComponent />
      </BrowserRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

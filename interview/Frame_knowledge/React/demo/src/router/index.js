import React from "react";
import { Route, Switch } from "react-router-dom";
import asyncComponent from "../components/AsyncComponent";

const AsyncPureComponent = asyncComponent(() => import("../pages/PureComponent"));
const AsyncMemo = asyncComponent(() => import("../pages/Memo"));
const AsyncForwardRef = asyncComponent(() => import("../pages/ForwardRef"));

export default ({ childProps }) =>
    <Switch>
        <Route
            path="/purecomponent"
            exact
            component={AsyncPureComponent}
            props={childProps}
        />
        <Route
            path="/memo"
            exact
            component={AsyncMemo}
            props={childProps}
        />
        <Route
            path="/forwardref"
            exact
            component={AsyncForwardRef}
            props={childProps}
        />
    </Switch>;

import React from "react";
import { Route, Switch } from "react-router-dom";
import asyncComponent from "../components/AsyncComponent";

const AsyncElement = asyncComponent(() => import("../pages/test"));

export default ({ childProps }) => {
        return <Switch>
                <Route
                    path="/:param"
                    exact
                    component={AsyncElement}
                    props={childProps}
                />
        </Switch>
};

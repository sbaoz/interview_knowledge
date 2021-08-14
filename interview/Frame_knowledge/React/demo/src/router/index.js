import React from "react";
import { Route, Switch } from "react-router-dom";
import asyncComponent from "../components/AsyncComponent";

const AsyncElement = asyncComponent(() => import("../pages/React进阶实践指南Demo/06/类组件生命周期"));

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

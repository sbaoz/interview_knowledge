import React from "react";
import { Route, Switch } from "react-router-dom";
import asyncComponent from "../components/AsyncComponent";

const AsyncElement = asyncComponent(() => import("../pages/hooks/useEffect"));

export default ({ childProps }) => {
        return <Switch>
                <Route
                    path="/"
                    exact
                    component={AsyncElement}
                    props={childProps}
                />
        </Switch>
};

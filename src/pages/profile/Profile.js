import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {createAuthProvider} from "../../Entity/AuthProvider";
import AuthPage from "./auth/AuthPage";
import ProfilePage from "./profile/ProfilePage";
import ProfileSellerPage from "./seller/ProfileSellerPage";
import CreateProduct from "./product/CreateProduct";

export const {useAuth, authFetch, login, logout} = createAuthProvider();

export default function Profile() {
    return (
        <Router>
            <Switch>
                {!useAuth() && <Route path={'/profile'} component={AuthPage} />}
                <Route exact={true} path={'/profile/seller'} component={ProfileSellerPage} />
                <Route exact={true} path={'/profile/addProduct'} component={CreateProduct}/>
                <Route exact={true} path={'/profile/products'} component={ProfilePage}/>
                <Route exact={true} path={'/profile'} component={ProfilePage} />
            </Switch>
        </Router>
        );
}
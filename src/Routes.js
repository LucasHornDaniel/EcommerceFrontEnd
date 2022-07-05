import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signup from './user/Signup';
import Signin from './user/Signin';
import UserDashboard from './user/UserDashboard';
import Home from './core/Home';
import Menu from './core/Menu'
import PrivateRoute from './auth/PrivateRoute';
import AdminDashboard from './user/AdminDashboard';
import AdminRoute from './auth/AdminRoute';
import CreateCategory from './admin/CreateCategory';
import CreateProduct from './admin/CreateProduct';
import Shop from './core/Shop';
import Product from './core/Product';
import Cart from './core/Cart';




const Routes = () => {
    return (
        
        <BrowserRouter>
            <Menu/>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/shop" exact component={Shop} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signup} />
                <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
                <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
                <AdminRoute path="/create/category" exact component={CreateCategory} />
                <AdminRoute path="/create/product" exact component={CreateProduct} />
                <Route path="/product/:productId" exact component={Product} />
                <Route path="/cart" exact component={Cart} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
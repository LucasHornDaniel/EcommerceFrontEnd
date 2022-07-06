import React, {useState, useEffect} from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import Card from "./Card";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";

const Chekout = ({products}) => {
    const getTotal = () =>{
        return products.reduce((currentValue, nextValue)=> {
            return currentValue + nextValue.count * nextValue.price;
        }, 0);
    };

    const showCheckout = () => {
        return isAuthenticated() ? (
            <button className="btn btn-success">Finalizar Compra</button>
        ): (
            <Link to="/signin">
                <button className="btn btn-primary">Fazer login</button>
            </Link>
        );


    }

    const createOrderData = {
        products: products,
        transaction_id: Response.tr
    }

    


    return (
        <div>
            <h2>Total :R${getTotal()}</h2>
            {showCheckout()}
        </div>
    );
};

   


export default Chekout;
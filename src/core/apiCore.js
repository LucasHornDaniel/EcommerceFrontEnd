import { API } from "../config";
import queryString from "query-string";

export const getProducts = async sortBy => {
    try {
        const response = await fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`, {
            method: "GET"
        });
        return await response.json();
    } catch (err) {
        return console.log(err);
    }
};

export const getCategories = async () => {
    try {
        const response = await fetch(`${API}/categories`, {
            method: "GET"
        });
        return await response.json();
    } catch (err) {
        return console.log(err);
    }
};

export const getFilteredProducts = async (skip, limit, filters = {}) => {
    const data = {
        limit,
        skip,
        filters
    };
    try {
        const response = await fetch(`${API}/products/by/search`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
};

export const list = async params => {
    const query = queryString.stringify(params);
    console.log("query", query);
    try {
        const response = await fetch(`${API}/products/search?${query}`, {
            method: "GET"
        });
        return await response.json();
    } catch (err) {
        return console.log(err);
    }
};

export const read = async productId => {
    try {
        const response = await fetch(`${API}/product/${productId}`, {
            method: "GET"
        });
        return await response.json();
    } catch (err) {
        return console.log(err);
    }
};

export const listRelated = async productId => {
    try {
        const response = await fetch(`${API}/products/related/${productId}`, {
            method: "GET"
        });
        return await response.json();
    } catch (err) {
        return console.log(err);
    }
};




export const createOrder = async (userId, token, createOrderData) => {
    try {
        const response = await fetch(`${API}/order/create/${userId}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ order: createOrderData })
        });
        return await response.json();
    } catch (err) {
        return console.log(err);
    }
};
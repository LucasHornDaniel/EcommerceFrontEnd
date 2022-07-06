import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';

import { createProduct, getCategories, getProduct, updateProduct } from './apiAdmin';

const UpdateProduct = ({match}) => {
    const [values, setValues] = useState({
        name: '',
        discription: '',
        price: '',
        categories: [],
        category: '',
        shipping: '',
        quantity: '',
        photo: '',
        loading: false,
        error: '',
        createdProduct: '',
        redirectToProfile: false,
        formData: new FormData()
    });

    const { user, token } = isAuthenticated();
    const {
        name,
        discription,
        price,
        category,
        categories,
        quantity,
        loading,
        error,
        createdProduct,
        formData
    } = values;

const init = (productId) => {
    getProduct(productId).then(data => {
        if(data.error){
            setValues({...values, error:data.error})
        }else{
            setValues({...values, 
                name: data.name, 
                discription: data.discription, 
                price:data.price, 
                category:data.category._id, 
                shipping: data.shipping, 
                quantity: data.quantity, 
                formData: new FormData })
            initCategories()
        }
    })
}

    const initCategories = () => {
        getCategories().then(data => {
            
            if (data.error) {
                console.log(error);
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    categories: data,
                    formData: new FormData()
                });
                
            }
        });
    };

    useEffect(() => {
        init(match.params.productId);
    }, []);

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: '', loading: true });

        updateProduct(match.params.productId, user._id, token, formData).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    name: '',
                    discription: '',
                    photo: '',
                    price: '',
                    quantity: '',
                    loading: false,
                    createdProduct: data.name
                });
            }
        });
    };

    const newPostForm = () => (
        <form className="mb-3" onSubmit={clickSubmit}>
            <h4>Foto do produto</h4>
            <div className="form-group">
                <label className="btn btn-dark">
                    <input onChange={handleChange('photo')} type="file" name="photo" accept="image/*" />
                </label>
            </div>

            <div className="form-group">
                <label className="text-muted">Nome</label>
                <input onChange={handleChange('name')} type="text" className="form-control" value={name} />
            </div>

            <div className="form-group">
                <label className="text-muted">Descrição</label>
                <textarea onChange={handleChange('discription')} className="form-control" value={discription} />
            </div>

            <div className="form-group">
                <label className="text-muted">Preço</label>
                <input onChange={handleChange('price')} type="number" className="form-control" value={price} />
            </div>

            <div className="form-group">
                <label className="text-muted">Categoria</label>
                <select onChange={handleChange('category')} className="form-control">
                    <option>Selecione uma categoria</option>
                    { categories &&
                        categories.map((c, i) => (
                            <option key={i} value={c._id}>
                                {c.name}
                            </option>
                        ))} 
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">Envio</label>
                <select onChange={handleChange('shipping')} className="form-control">
                    <option>Selecione</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">Quantidade</label>
                <input onChange={handleChange('quantity')} type="number" className="form-control" value={quantity} />
            </div>

            <button className="btn btn-outline-primary">Editar Produto</button>
        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: createdProduct ? '' : 'none' }}>
            <h2>{`${createdProduct}`} Produto criado com sucesso</h2>
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        );

    return (
        <Layout title="Editar produto" description={`Ola ${user.name}`}>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showLoading()}
                    {showSuccess()}
                    {showError()}
                    {newPostForm()}
                </div>
            </div>
        </Layout>
    );
};

export default UpdateProduct;
import React,{useState, useEffect} from "react";
import { getProducts } from "./apiCore";
import Layout from "./Layout";
import Card from "./Card";
import Search from "./Search";


const Home = () => {
    const [productsBySell, setproductsBySell] = useState([])
    const [productsByArrivals, setproductsByArrival] = useState([])
    const [error, seterror] = useState(false)


    const loadProductsBySell = () => {
       getProducts('sold').then(data =>{
        if(data.error) {
            seterror(data.error)
        }else{
            setproductsBySell(data)
        }
       })
    }

    const loadProductsByArrival = () => {
        getProducts('createdAt').then(data =>{
         if(data.error) {
             seterror(data.error)
         }else{
             setproductsByArrival(data)
         }
        })
     }

     useEffect(()=> {
        loadProductsByArrival()
        loadProductsBySell()
     }, [])

    return (
    <Layout title="Home Page" description="Falcon Ecommerce" className="container-fluid">
        <Search />
        
        <h2 className="mb-2">Mais vendidos</h2>
        <div className="row">
            {productsBySell.map((product, i) => (<Card key={i} product={product}/>))}
        </div>

        <h2 className="mb-5">Novos Produtos</h2>
        <div className="row">     
            {productsByArrivals.map((product, i) => (<Card key={i} product={product}/>))}
        </div>

    </Layout>
    );
};


export default Home;
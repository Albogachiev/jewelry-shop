import React from "react";
import Card from "../Card";
import axios from "axios";
import AppContext from "./context";

export const Orders = () => {
    const [orders, setOrders] = React.useState([]);
    const {addToCard,onAddToFavorite} = React.useContext(AppContext)
    const [loading, setLoading] = React.useState(true)
    React.useEffect(() => {
        (async ()=> {
            try {
                const {data} = await axios.get('https://6454fbfcf803f3457636e268.mockapi.io/card')
                setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []))
                setLoading(false)
            } catch (error) {
                console.log('заказы>>>>', error)
            }
        })()
    }, [])
    return (
        <>
        <div className='search-input'>
        <h1 className='zagolovok'>Мои заказы</h1>
        </div>
        <div className='cards'>
    <div className='content'>
        {(loading ? [...Array(8)] : orders).map((obj,index) => (
            <Card 
                key={index}
                {...obj}
                loading={loading} 
                />
        ))}
    </div>
    </div>
        </>

    )
};
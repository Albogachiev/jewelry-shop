import React, { useContext, useState } from 'react';
import Info from './Info'
import axios from 'axios';

import AppContext from './pages/context';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms)) //создаем интервал в 1 сек

const Drawer = ({onCloseCart, items, onRemove}) => {
    const {cartItems,setCartItems} = useContext(AppContext);
    const [isComplete, setIsComplete] = React.useState(false);
    const [orderId, setOrderId] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);

    const onClickComplete = async (obj) =>{
        try {
            setIsLoading(true)
            const {data} = await axios.post('https://6454fbfcf803f3457636e268.mockapi.io/card', {items:cartItems});
            setOrderId(data.id);
            setIsComplete(true);
            // await axios.put('https://6454fbfcf803f3457636e268.mockapi.io/card', []) // пут заменит массив на то что нам нужно, и после совершения заказа, очищаем корзину
            setCartItems([]);

            for(let i = 0; i < cartItems.length; i++){ //можно создать такуюю функ чтобы удалять заказы после оформления поочередно, через секунду удаляются 
                const item = cartItems[i];
                await axios.delete('https://6454fbfcf803f3457636e268.mockapi.io/card/' + item.id);
                await delay(1000); //будем выполнять удаление из корсины с интервалом в 1 сек
            }
        } catch (error) {
            alert('Не удалось создать заказ.')
        }
        setIsLoading(false)
    }
    return (
    <div className='overlay'>
    <div className='drawer'>
        <h2>Корзина <img onClick={onCloseCart} className='imgexit' alt='imgExit' src='/img/exit.svg' /></h2>     
        
        
        
    <div className="items">
        {
            items.length > 0 ?

            items.map((obj) => (
                <div key={obj.id} className='cartItem'>
                    <img width={80} src={obj.imageUrl} alt='a1' />
                    <div>
                    <p>{obj.title}</p>
                    <b className='cina'>{obj.price}</b>
                    </div>
                    <img className='imgexit2' alt='imgExit' src='/img/exit.svg' onClick={()=> onRemove(obj.id)} />
                </div>
            ))

       : 

       <Info 
        discription={isComplete ? 'Заказ оформлен!' : 'Корзина пуста.'}
        img={isComplete ? '/img/complete-order.jpg' : '/img/cartEmpty.jpg'}
        butName={'Вернуться назад'}
        title={isComplete ? `Ваш заказ ${orderId} скоро будет передан курьерской доставке.` : 'Добавьте хоть одно изделие, чтобы сделать заказ.'}  
        but={onCloseCart}      
        />
        } 
    </div>
        {items.length > 0 && 
        <div className="cartTotalBlock">  
        <ul>
            <li>
                <span>Итого:</span>
                <div></div>
                <b>12 333 руб.</b>
            </li>
            <li>
                <span>Налог 5%: </span>
                <div></div>
                <b>700 руб.</b>
            </li>
        </ul>
        <button disabled={isLoading} onClick={onClickComplete}>Оформить заказ</button>
        </div>}

        
    </div>
    </div>
    )
}
export default Drawer;
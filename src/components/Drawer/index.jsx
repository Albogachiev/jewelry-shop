import React from 'react';
import Info from '../Info'
import axios from 'axios';
import { useCart } from '../hooks/useCart';
import styles from './Drawer.module.scss';


const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const Drawer = ({onCloseCart, items, onRemove, opened}) => {
    const [isComplete, setIsComplete] = React.useState(false);
    const [orderId, setOrderId] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const {cartItems, setCartItems, summBasket} = useCart()

    const onClickComplete = async (obj) =>{
        try {
            setIsLoading(true)
            const {data} = await axios.post('https://6454fbfcf803f3457636e268.mockapi.io/card', {items:cartItems});
            setOrderId(data.id);
            setIsComplete(true);
            setCartItems([]);

            for(let i = 0; i < cartItems.length; i++){
                const item = cartItems[i];
                await axios.delete('https://6454fbfcf803f3457636e268.mockapi.io/card/' + item.id);
                await delay(1000); 
            }
        } catch (error) {
            alert('Не удалось создать заказ.')
        }
        setIsLoading(false)
    }
    return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
    <div className={styles.drawer}>
        <h2>Корзина <img onClick={onCloseCart} className='imgexit' alt='imgExit' src='/img/exit.svg' /></h2>     
        
        
        
    <div className="items">
        {
            items.length > 0 ?

            items.map((obj) => (
                <div key={obj.id} className={styles.cartItem}>
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
                <b>{summBasket} руб.</b>
            </li>
            <li>
                <span>Скидка 10%: </span>
                <div></div>
                <b>{Math.round(summBasket / 100 * 10)} руб.</b>
            </li>
        </ul>
        <button disabled={isLoading} onClick={onClickComplete}>Оформить заказ</button>
        </div>}

        
    </div>
    </div>
    )
}
export default Drawer;
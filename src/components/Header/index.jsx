import React from 'react';
import { Link } from 'react-router-dom'
import { useCart } from '../hooks/useCart';
import styles from "./Header.module.scss";

const Header = (props) => {
    const { summBasket } = useCart()
    return ( 
        <div>

        <header>
            <Link to='/'>
        <div className={styles.headerLeft}>
            <img className={styles.logoImg} alt='логотип' src='/img/logoPremium.jpg' />
            <div className={styles.headerInfo}>
                <h3>JEWELRY SHOP</h3>
                <p>Изделия премиум качества</p>
            </div>
        </div>
            </Link>
       <ul className={styles.headerRight}>
            <li style={{cursor:"pointer"}} className={styles.basket}>
                <img onClick={props.onClickCart} alt='корзина юзера' src='/img/basket.svg' />
                <span onClick={props.onClickCart}>{summBasket}</span>
            </li>
            <li>
                <Link to='/favorites'>
                <img alt='иконкаДизЛайк' className={styles.liked} src='/img/noLiked.svg' />
                </Link>
            </li>
            <li>
            <Link to='/orders'>
            <img alt='иконка юзера' src='/img/userIcon.svg' />
            </Link>
            </li>
        </ul>
    </header>
        </div>
    )
}
export default Header;
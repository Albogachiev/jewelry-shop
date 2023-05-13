import React from 'react';
import { Link } from 'react-router-dom'

const Header = (props) => {
    return ( 
        <div>

        <header>
            <Link to='/'>
        <div className='headerLeft'>
            <img className='logoImg' alt='логотип' src='/img/logoPremium.jpg' />
            <div className='headerInfo'>
                <h3>JEWELRY SHOP</h3>
                <p>Изделия премиум качества</p>
            </div>
        </div>
            </Link>
       <ul className='headerRight'>
            <li style={{cursor:"pointer"}} className='basket'>
                <img onClick={props.onClickCart} alt='корзина юзера' src='/img/basket.svg' />
                <span onClick={props.onClickCart}>1205 руб.</span>
            </li>
            <li>
                <Link to='/favorites'>
                <img alt='иконкаДизЛайк' className='liked' src='/img/noLiked.svg' />
                </Link>
            </li>
            <img alt='иконка юзера' src='/img/userIcon.svg' />
            <li>

            </li>
        </ul>
    </header>
        </div>
    )
}
export default Header;
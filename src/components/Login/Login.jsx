import React from "react";
import styles from "./Login.module.scss";
import axios from 'axios';

export const Login = () =>{
    const [name, setName] = React.useState();
    const [phone, setPhone] = React.useState();
    const [password, setPassword] = React.useState();
    let matchs = '';
    const loginData = async (name,phone,password) => {
        try {
            const obj = {name,phone,password};
            const {data} = await axios.post('http://localhost:3001/login', obj );
        } catch (error) {
            console.log('>>>>', error);
        };
    };
    
    return ( 
        <>
            <div className={styles.containerLogin}> 
                      <input onChange={(event) => setName(event.target.value)} placeholder="Имя Фамилия" name='name' type="text" id='I.F'></input>
                      <input onChange={(event) => setPhone(event.target.value)} placeholder="Номер телефона" name='phone' type="text" id='numberPhone'></input>      
                      <input onChange={(event) => setPassword(event.target.value)} placeholder="Пароль" name='password' type="password" id='password'></input>
                      <button onClick={() => loginData(name,phone,password)} className='btnUsers'>Отправить</button>
            </div>
        </>
    )
}
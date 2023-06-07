import React from "react";
import styles from "./Login.module.scss";
import axios from 'axios';

export const Registration = () =>{
    const [name, setName] = React.useState();
    const [phone, setPhone] = React.useState();
    const [password, setPassword] = React.useState();
    const coocki = {}

    const registrationData = async () => {
        // try {
        //     const obj = {name,phone,password};
        //     const response = await fetch('http://localhost:3001/registration', {
        //         method: 'POST',
        //         credentials: 'include',//--cookie
        //         headers: {
        //           'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(obj),
        //       });
        //       const data = await response.json();
        //       console.log('<<<>',data)
        // } catch (error) {
        //     console.log('>>>>', error);
        // };
        console.log(name,phone,password)
    };
    
    return ( 
        <>
        {coocki.user ?
        <h1>Yeas COOCKIE</h1> : 
            <div className={styles.containerLogin}> 
                      <input onChange={(event) => setName(event.target.value)} placeholder="Имя Фамилия" name='name' type="text" id='I.F'></input>
                      <input onChange={(event) => setPhone(event.target.value)} placeholder="Номер телефона" name='phone' type="text" id='numberPhone'></input>      
                      <input onChange={(event) => setPassword(event.target.value)} placeholder="Пароль" name='password' type="password" id='password'></input>
                      <button onClick={registrationData} className='btnUsers'>Отправить</button>
            </div>
        }
        </>
    )
}
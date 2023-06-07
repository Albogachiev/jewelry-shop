import React from 'react';
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header';
import Home from './components/pages/Home';
import Favorites from './components/pages/Favorites';
import Drawer from './components/Drawer';
import { Login } from './components/Login/Login';
import { Registration } from './components/Login/Registration';
import axios from 'axios';
import AppContext from './components/pages/context';
import { Orders } from './components/pages/Orders';

function App() {
    const [isLoading, setIsLoading] = React.useState(true);
    const [searchValue, setSearchValue] = React.useState('')
    const [cartOpened, setCartOpened] = React.useState(false)
    const [items, setItems] = React.useState([]);
    const [cartItems, setCartItems] = React.useState([]);
    const [favorited, setFavorited] = React.useState([]);

    React.useEffect(()=>{
        async function fetchData(){
            try {
                const cardRespons = await axios.get('https://6454fbfcf803f3457636e268.mockapi.io/card')
                const favoritRespons = await axios.get('https://6454fbfcf803f3457636e268.mockapi.io/card')
                const itemRespons = await axios.get('http://localhost:3001/items')
                
                setCartItems(favoritRespons.data)
                setFavorited(cardRespons.data)
                setItems(itemRespons.data)
                setIsLoading(false)
            } catch (error) {
                alert(' Ошибка при запросе данных ->>', error)
            }
        } 
        fetchData()
    }, []);

    const onAddToFavorite = async (obj) => {
        try {
            if(favorited.find((favObj) => Number(favObj.id) === Number(obj.id))){
                axios.delete(`https://6454fbfcf803f3457636e268.mockapi.io/card/${obj.id}`)
            }else{
                const {data} = await axios.post('https://6454fbfcf803f3457636e268.mockapi.io/card', obj);
                setFavorited((prev) => [...prev, data])
            }
        } catch (error) {
            alert('ошибка при добавлении в закладки', error);
            console.log('ошибка при добавлении в закладки', error);
        }
    }

    const onRemove = (id) => {
        try {
            axios.delete(`https://6454fbfcf803f3457636e268.mockapi.io/card/${id}`);
            setCartItems((prev) => prev.filter(item => Number(item.id) !== Number(id)))
        } catch (error) {
            alert('Ошибка при удалении из корзины', error)
            console.log('Ошибка при удалении из корзины', error)
        }
    }

    const onChangeSearch = (event) => {
        setSearchValue(event.target.value)
    }
    
    const addToCard = async (obj) =>{
        try {
            const findItem = cartItems.find(prev => Number(prev.parentId) === Number(obj.id))
            if(findItem){
                setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)));
                await axios.delete(`https://6454fbfcf803f3457636e268.mockapi.io/card/${findItem.id}`);
            }else{
                setCartItems((prev) => [...prev, obj])
                const {data} = await axios.post('https://6454fbfcf803f3457636e268.mockapi.io/card', obj);
                setCartItems((prev) => prev.map(item => {
                    if(item.parentId === data.parentId){
                        return {
                            ...item,
                            id: data.id
                        }
                    }
                    return item
                }))
            }
        } catch (error) {
            alert('Ошибка при добавлении в корзину', error)
            console.log('Ошибка при добавлении в корзину', error)
        }
    }
    const isItemAdded = (id) =>{
        return cartItems.some(item => Number(item.parentId) === Number(id))
    }
  return (                    
    <AppContext.Provider value={{cartItems,addToCard,favorited,items,isItemAdded, onAddToFavorite,setCartItems,cartItems}}>

      <div className='wrapper'>
        <Drawer items={cartItems} onCloseCart={()=> setCartOpened(false)} onRemove={onRemove} opened={cartOpened} />

         <Header onClickCart={()=> setCartOpened(true)}/>

        
        <Routes>
        <Route path='/' element={<Home 
        cartItems={cartItems}
         onChangeSearch={onChangeSearch}
         onAddToFavorite={onAddToFavorite}
         addToCard={addToCard}
         searchValue={searchValue}
         items={items}/>} 
         isLoading = {isLoading}
         />


            <Route path='/favorites' element={<Favorites onAddToFavorite={onAddToFavorite}  />} />


            <Route path='/orders' element={<Orders />} />


            <Route path='/login' element={<Login />} />
            <Route path='/registration' element={<Registration />} />
        </Routes>

    </div>
    </AppContext.Provider>
  );
}

export default App;
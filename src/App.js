import React from 'react';
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header/Header';
import Home from './components/pages/Home';
import Favorites from './components/pages/Favorites';
import Drawer from './components/Drawer';
import axios from 'axios';
import AppContext from './components/pages/context';
import { Orders } from './components/pages/Orders';

function App() {
    const [isLoading, setIsLoading] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState('')
    const [cartOpened, setCartOpened] = React.useState(false)
    const [items, setItems] = React.useState([]);
    const [cartItems, setCartItems] = React.useState([]);
    const [favorited, setFavorited] = React.useState([]);

    React.useEffect(()=>{
        async function fetchData(){
            const cardRespons = await axios.get('https://6454fbfcf803f3457636e268.mockapi.io/card')
            const favoritRespons = await axios.get('https://6454fbfcf803f3457636e268.mockapi.io/card')
            const itemRespons = await axios.get('https://6454fbfcf803f3457636e268.mockapi.io/items')
            
            setCartItems(favoritRespons.data)
            setFavorited(cardRespons.data)
            setItems(itemRespons.data)
            setIsLoading(false)
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
            console.log('>>>>>>', error)
        }
    }

    const onRemove = (id) => {
        axios.delete(`https://6454fbfcf803f3457636e268.mockapi.io/card/${id}`);
        setCartItems((prev) => prev.filter(item => item.id !== id))
    }

    const onChangeSearch = (event) => {
        setSearchValue(event.target.value)
    }
    
    const addToCard = (obj) =>{
        if(cartItems.find(prev => Number(prev.id) === Number(obj.id))){
            axios.delete(`https://6454fbfcf803f3457636e268.mockapi.io/card/${obj.id}`);
            setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
        }else{
            axios.post('https://6454fbfcf803f3457636e268.mockapi.io/card', obj);
            setCartItems((prev) => [...prev, obj])
        }
    }
    const isItemAdded = (id) =>{
        return cartItems.some(item => Number(item.id) === Number(id))
    }
  return (                    
    <AppContext.Provider value={{cartItems,addToCard,favorited,items,isItemAdded, onAddToFavorite,setCartItems,cartItems}}>

      <div className='wrapper'>
      // import AppContext from '../pages/context'; {/* {cartOpened ? <Drawer items={cartItems} onCloseCart={()=> setCartOpened(false)} onRemove={onRemove} /> : null} */}
    
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
        //  isItemAdded = {isItemAdded}
         />
        </Routes>
        <Routes>
            <Route path='/favorites' element={<Favorites onAddToFavorite={onAddToFavorite}  />} />
        </Routes>
        <Routes>
            <Route path='/orders' element={<Orders />} />
        </Routes>

</div>
    </AppContext.Provider>
  );
}

export default App;
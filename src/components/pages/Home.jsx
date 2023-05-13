import React from "react"
import Card from "../Card";


const Home = ({items,onChangeSearch,onAddToFavorite, addToCard, searchValue,isLoading}) => {
    const renderItems = () =>{
        const filteredItems = items.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()))
      return (isLoading ? [...Array(8)] : filteredItems)
                .map((obj, index) => 
               ( <Card
                onFavorite={(item) => onAddToFavorite(item)}
                key={index}
                onPlus={(item) => addToCard(item)}
                {...obj}
                loading={isLoading}
                />)
            )
    }

    return (
        <>
        <div className='search-input'>
        <h1 className='zagolovok'>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все изделия'}</h1>
        <div className='search-block'>
            <img className='search' alt='search' src='/img/search.svg' />
            <input onChange={onChangeSearch} placeholder='поиск' />
        </div>
        </div>
        <div className='cards'>
    <div className='content'>
        {renderItems()}
    </div>
    </div>
        </>

    )
}
export default Home;
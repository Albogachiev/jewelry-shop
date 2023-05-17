import React from "react"
import Card from "../Card";
import AppContext from "../pages/context";

const Favorites = ({ addToCard}) => {
    const {favorited,onAddToFavorite} = React.useContext(AppContext)
    const [favaritedImg] = React.useState(true)
    return (
        <>
        <div className='search-input'>
        <h1 className='zagolovok'>Мои закладки</h1>
        </div>
        <div className='cards'>
    <div className='content'>
        {favorited
        .map((obj, index) => (
            <Card
            favaritedImg={favaritedImg}
            onFavorite={(obj) => onAddToFavorite(obj)}
            key={index}
            id={obj.id}
            title={obj.title}
            price={obj.price}
            imageUrl={obj.imageUrl}
            />
        ))}
    </div>
    </div>
        </>
    

    )
}
export default Favorites;
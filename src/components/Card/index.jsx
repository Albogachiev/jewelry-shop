import React from "react";
import style from "./Card.module.scss";
import ContentLoader from "react-content-loader";
import AppContext from '../pages/context';

const Card = ({id,title,price,imageUrl, favaritedImg = false,onFavorite,onPlus, loading = false}) =>{
    
    const [favorite, setFavorite] = React.useState(favaritedImg)
    const {isItemAdded} = React.useContext(AppContext);
    // console.log('id>>>', isItemAdded(id))
    
    const onClickPlus = () => {
        onPlus({id,title,price,imageUrl})
    }
    const like = () =>{
        onFavorite({id,title,price,imageUrl})
        setFavorite(!favorite)
    }
    return (
       
        <div className={style.card}>
            {loading ? 
             (<ContentLoader 
             speed={2}
             width={150}
             height={265}
             viewBox="0 0 150 265"
             backgroundColor="#f3f3f3"
             foregroundColor="#ecebeb"
           >
             
           <rect x="26" y=
         "25" rx="0" ry=
         "0" width="300" height="100" /> 
             <rect x="28" y=
         "143" rx="0" ry=
         "0" width="282" height="17" /> 
             <rect x="29" y=
         "171" rx="0" ry=
         "0" width="282" height="17" /> 
             <rect x="35" y=
         "201" rx="0" ry=
         "0" width="70" height="10" />
           </ContentLoader>) : (
           <>
           {onFavorite && 
           <img onClick={like} alt='liked' className={style.liked} src={favorite ? '/img/yeaLiked.svg' : '/img/noLiked.svg'} />
           }
           <img className={style.imgJewelry} src={imageUrl} alt='imgCard' />
           <p>{title}</p>
           <div className={style.infoProduct}>
           <div className={style.price}>
               <span>Цена:</span>
               <b>{price} руб</b>
           </div>
                   {onPlus && (<img 
                   onClick={onClickPlus} 
                   className={isItemAdded(id) ? style.onClick : style.imgAdd} 
                   src={ isItemAdded(id) ? '/img/addedPlus.svg' : '/img/add.svg'} alt='' />)
                    }
           </div>
           </>)
           }
            
        </div>
    )
}
export default Card;


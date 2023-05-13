import React from 'react';
import AppContext from './pages/context';

const Info = ({title, discription,img,butName,but}) => {
    const {} = React.useContext(AppContext)
  return (
    <div>
      <div className='cartEmpty'>
        <img src={img} />
        <h2>{discription}</h2>
        <p className=''>{title}</p>
        <button onClick={but}>
           {butName}
        </button>
        </div>
    </div>
  )
}

export default Info

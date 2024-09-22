import { useEffect, useState } from "react";
import useFetch from "./useFetch";
import Carusel from "./Carusel";

const titleStyle = {
    width: 'fit-content',
    fontVariant: 'small-caps',
    position: 'relative',
    display: 'grid',
    placeItems: 'center',
    minWidth:'100%'
};

const Header = ({ url }) => {
    const { data: prodotto, isLoading } = useFetch(url);
    const [selectId,setId] = useState(0)

    // fun to increment id product
    const nextProduct = () =>{
        setId(prevValue =>{
            if(prevValue + 1 === prodotto.length){
                return 0;
            }else{
                return prevValue + 1
            }
        });
    }

    // fun to decrement id product
    const prevProduct = () =>{
        setId( prevValue =>{
            if(prevValue - 1 < 0){
                return prodotto.length -1
            }else{
                return prevValue -1
            }
        })
    }

    /* if(prodotto){
      console.log(prodotto[selectId])
    } */



    if (isLoading) {
        return (<h1>Loading...</h1>)
    }

    return (
        <section style={titleStyle}>
            <h1>Shop</h1>
            <div className="underline"></div>
            {prodotto.length > 0 ?
            ( <Carusel {...prodotto[selectId]} next={nextProduct} prev={prevProduct} /> ) 
            :
            ( <h2 className="p-4 shadow">Welcome!</h2>)}
        </section>
    );
};


export default Header;

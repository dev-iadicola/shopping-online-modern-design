import { useEffect, useState } from "react";
import useFetch from "./useFetch";
import Carusel from "./Carusel";

const titleStyle = {
    width: 'fit-content',
    fontVariant: 'small-caps',
    position: 'relative',
    display: 'grid',
    placeItems: 'center',
};

const Header = ({ url }) => {
    const { data: prodotto, isLoading } = useFetch(url);
    const [selectId,setId] = useState(0)

    if(prodotto){
      console.log(prodotto[selectId])
    }



    if (isLoading) {
        return (<h1>Loading...</h1>)
    }

    return (
        <section style={titleStyle}>
            <h1>Shop</h1>
            <div className="underline"></div>
            {prodotto.length > 0 ?( <Carusel {...prodotto[selectId]} />) :( <h2 className="p-4 shadow">Welcome!</h2>)}
        </section>
    );
};


export default Header;

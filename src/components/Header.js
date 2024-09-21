import { useEffect, useState } from "react";
import useFetch from "./useFetch";

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
            {prodotto.length > 0 ?( <Carusel data={...prodotto[selectId]} />) :( <h2 className="p-4 shadow">Welcome!</h2>)}
        </section>
    );
};

const Carusel = ({ id, title,  }) => {
  return (
      <div>
          <h2>All Products</h2>
           
                <div className="d-flex mx-auto justify-content-center">
                <img src={item.image} alt={item.title} className="object-fit-cover border rounded " height={700} />

                </div>
                  <h3>{item.title}</h3>
                  <p>{item.price}</p>
                  <p>{item.description}</p>
           
      </div>
  );
};

export default Header;

import { ProductsAPI } from '../data/apiProducts'
import useFetch from './useFetch';
import { useEffect, useState } from 'react';
import Article from './Article';
import Header from './Header';


const getValueFromLocalStorage = () =>{
  if(localStorage.getItem('theme')){
    return localStorage.getItem('theme');
  }else{
    return 'light-mode';
  }
}


function Shop() {

  const [theme, setTheme] = useState(getValueFromLocalStorage());
  const { data, isLoading } = useFetch(ProductsAPI);

  // theme change in html change classname (dark o light)
  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);

  }, [theme])


  // fun arrow change tehme 
  const chagneTheme = () => {
    if (theme === 'light-mode') {
      setTheme('dark-mode')
    } else {
      setTheme('light-mode')
    }
  }

  return (
    <section className="container-lg ">
      <div className=''>
        <button className="btn my-5 fixed-top mx-5" style={{width:'100px'}} onClick={chagneTheme}>
          Change
        </button>

        <Header url={ProductsAPI}/>
        <section className="article-section">
       


          {isLoading ? (
            <h3>Loading...</h3>
          ) :
            (
              data.map(product => <Article key={product.id} {...product} />)
            )
          }
        </section>
      </div>

    </section>
  );
}


export default Shop;

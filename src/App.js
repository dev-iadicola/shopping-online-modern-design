import logo from './logo.svg';
import './App.css';
import { ProductsAPI } from './data/apiProducts';
import useFetch from './components/useFetch';
import { useEffect, useState } from 'react';
import Article from './components/Article'


function App() {

  const [theme,setTheme] = useState('light-mode');
  const { data, isLoading } = useFetch(ProductsAPI);

  // theme change in html change class (dark o light)
  useEffect(()=>{
    document.documentElement.className = theme;

  },[theme])

  // Storage theme selected
  


  // fun cambia tehme 
  const chagneTheme = () =>{
    if(theme === 'light-mode'){
      setTheme('dark-mode')
    }else{
      setTheme('light-mode')
    }
  }

  return (
    <section className="container-lg ">
      <div className=''>
        <button className="btn my-5" onClick={chagneTheme}>
          Change
        </button>
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



export default App;

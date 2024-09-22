import logo from './logo.svg';
import './App.css';
import { ProductsAPI } from './data/apiProducts';
import useFetch from './components/useFetch';
import { useEffect, useState } from 'react';
import Article from './components/Article';
import Header from './components/Header';
import Shop from './components/Shop';




function App() {

 return (
  <Shop/>
 )
}


export default App;

import React from 'react'
import Nav from './Components/Nav';
import Cart from './Components/Cart';
import ProductCard from './Components/productCard';

const Home = () => {
    const [openCart, setOpenCart] = React.useState(false);
  return (
    <div>
      <Nav setOpenCart={setOpenCart} openCart={openCart} />
      <Cart openCart={openCart} setOpenCart={setOpenCart} />
      <ProductCard />
      
    </div>
  )
}

export default Home
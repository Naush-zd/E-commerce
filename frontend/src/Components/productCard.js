import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const ProductCard = () => {
  const navigate = useNavigate()
  const [products, setProducts] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await axios.get('http://localhost:8000/api/v1/products')
        const data = response.data
        setProducts(data)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.log(error)
      }
    }
    fetchProducts()
  }, [])
  if (loading) {
    return <h2>Loading...</h2>
  } else  {
    console.log(products)
  return (
  
    <div classNameName="bg-white">
  <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
    <h2 className="sr-only">Products</h2>
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      
      {products.map((product) => {
        return (
          <div onClick={
            () => navigate(`/product`)
          } key={product.id} className="group relative">
            <div className="w-full h-56 bg-gray-200 aspect-w-1 aspect-h-1 rounded-lg overflow-hidden group-hover:opacity-75">
              <img src={product.images[0]} alt={product.name} className="w-full h-full object-center object-cover"/>
            </div>
            <h3 className="mt-4 text-sm text-gray-700">
              <a href="#">
                <span className="absolute inset-0"/>
                {product.name}
              </a>
            </h3>
            <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
          </div>
        )
      })

     }
   
     
      
      
    </div>
  </div>
</div>
  )
      }
}

export default ProductCard
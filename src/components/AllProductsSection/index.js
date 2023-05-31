import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
// import {async} from 'rxjs'
import ProductCard from '../ProductCard'

import './index.css'

class AllProductsSection extends Component {
  state = {
    productsList: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const response = await fetch('https://apis.ccbp.in/products', {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    })
    const data = await response.json()

    console.log(data)
    if (response.ok === true) {
      const updatedData = data.products.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      this.setState({productsList: updatedData, isLoading: false})
    }
  }

  renderProductsList = () => {
    const {productsList} = this.state
    return (
      <div>
        <h1 className="products-list-heading">All Products</h1>
        <ul className="products-list">
          {productsList.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    return isLoading ? (
      <div className="loader">
        <Loader type="TailSpin" color="#0b69ff" height="50" width="50" />
      </div>
    ) : (
      this.renderProductsList()
    )
  }
}

export default AllProductsSection

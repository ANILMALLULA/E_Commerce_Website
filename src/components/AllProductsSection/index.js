import {Component} from 'react'
import Cookies from 'js-cookie'

import ProductCard from '../ProductCard'
import './index.css'

class AllProductsSection extends Component {
  state = {
    productsList: [],
    loading: false
  }

  componentDidMount() {
    this.getproducts()
  }

  getproducts = async () => {
    this.setState({loading:true})
    let url = "https://apis.ccbp.in/products"
    let jwtToken =  Cookies.get("jwt_token")
    let options = {
      method : "GET",
      headers : {
        Authorization: `Bearer ${jwtToken}`
      }
    }

    let response = await fetch(url,options)

    if (response.ok === true) {
      const fetchedData = await response.json();
      this.setState({loading:false})
      const updatedData = fetchedData.products.map((product) => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }));
      this.setState({
        productsList: updatedData,
      });
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
    const {loading} = this.state

    return <>{loading? <h1>Loading</h1> : this.renderProductsList()}</>
  }
}

export default AllProductsSection

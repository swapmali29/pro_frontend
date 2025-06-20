import React from 'react'
import { useEffect, useState } from 'react';
import { Table, Button } from 'reactstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../assets/product.scss'

export const ProductList = () => {

  const [products, setProducts] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const role = user?.role; // could be 'admin' or 'user'




  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios.get('https://pro-backend-ahba.onrender.com/products')
      .then(res => setProducts(res.data));
  };

  const handleDeleteProduct = (id) => {
    // e.preventDefault();
    console.log(id);

    axios.delete(`https://pro-backend-ahba.onrender.com/products/${id}`).then(() => {
      setProducts(products.filter(pro => pro.id !== id));
      alert('do you want delete this product')
    });

  };

  return (
    <div>
      <div className="row">
        {products.map(pro => (
          <div className="col-lg-3 col-sm-6 d-flex flex-column align-items-center justify-content-center product-item my-3" key={pro.id}>
            <div className={`product ${pro.tag == "out of stock" ? 'overlay_opacity' : ''}`}>
              {pro.images != "" && (
                <img src={pro.images} alt={pro.title} />)}
              {pro.images === "" && (
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png" alt="not avalilabe" />)}
              <div
                className={`tag 
    ${pro.tag == "sale" ? 'bg-red' : ''} 
    ${pro.tag == "new" || pro.tag == "limited edition" ? 'bg-green' : ''} 
    ${pro.tag == "out of stock" ? 'bg-black' : ''}`}
              >
                {pro.tag}
              </div>
              {role === 'admin' && (
                <Link to={`/edit/${pro.id}`}>
                  <div className="edit-tag bg-red">Edit</div>
                </Link>)}
            </div>
            <div className="title pt-4 pb-1">{pro.title}</div>

            <div className="price">₹ {pro.price}</div>
            {role === 'admin' && (
              <button className='delete-btn' onClick={() => handleDeleteProduct(pro.id)}>Delete</button>)}
          </div>
        ))}

      </div>
    </div>
  )
}

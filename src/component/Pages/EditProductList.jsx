import React from 'react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Card,
  CardBody,
  CardTitle,
} from 'reactstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

export const EditProductList = () => {
  const [formData, setFormData] = useState({ title: '', price: '', images: '' , tag : ''});
  const [errors, setErrors] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://pro-backend-ahba.onrender.com/products/${id}`).then(res => {
      setFormData(res.data);
    });

  }, [id]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.position.trim()) newErrors.position = 'Position is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted!")
    axios.put(`https://pro-backend-ahba.onrender.com/products/${id}`, formData).then(() => {
      toast.success('Product updated successfully!');
      navigate('/');
    });

  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-75">
      <Card className="shadow p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <CardBody>
          <CardTitle tag="h4" className="text-center mb-4">
            Edit Product
          </CardTitle>

          <form onSubmit={handleSubmit}>
            <FormGroup>

              <Label for="images">Image</Label>
              <Input
                id="images"
                name="images"
                value={formData.images}
                onChange={handleChange}
                
              />
            </FormGroup>
            <FormGroup>
              <Label for="title">Name</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup>
              <Label for="price">Price</Label>
              <Input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
            </FormGroup>

             <FormGroup>
              <Label for="tag">Tag</Label>
              <Input
                type="text"
                id="teg"
                name="tag"
                value={formData.tag}
                onChange={handleChange}
              />
            </FormGroup>

            {/* <FormGroup>
              <Label for="position">Position</Label>
              <Input
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                invalid={!!errors.position}
              />
              <FormFeedback>{errors.position}</FormFeedback>
            </FormGroup> */}

            <div className="d-grid mt-3">
              <Button color="dark" type="submit">
                Update Product
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}

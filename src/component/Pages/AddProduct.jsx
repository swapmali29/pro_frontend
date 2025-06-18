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

export const AddProduct = () => {
    const [formData, setFormData] = useState({ title: '', price: '', images: '' });
    const [errors, setErrors] = useState({});
    //   const { id } = useParams();
    const navigate = useNavigate();



    const handleChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = e => {
        e.preventDefault();

        axios.post(`https://pro-backend-ahba.onrender.com/products`, formData).then(() => {
            toast.success('Product added successfully!');
            navigate('/');
        });

    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, images: reader.result }); // base64 string
            };
            reader.readAsDataURL(file);
        }
    };


    return (
        <div className="d-flex justify-content-center align-items-center vh-75">
            <Card className="shadow p-4" style={{ width: '100%', maxWidth: '400px' }}>
                <CardBody>
                    <CardTitle tag="h4" className="text-center mb-4">
                        Add Product
                    </CardTitle>

                    <Form onSubmit={handleSubmit} noValidate>
                        <FormGroup>

                            <Label for="images">Image URL</Label>
                            <Input
                                id="images"
                                name="images"
                                value={formData.images}
                                onChange={handleChange}
                                invalid={!!errors.title}
                                required
                            />
                            <FormFeedback>{errors.title}</FormFeedback>
                        </FormGroup>

                        {/* <FormGroup>
                            <Label for="images">Upload Image</Label>
                            <Input
                                type="file"
                                id="images"
                                name="images"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </FormGroup> */}

                        <FormGroup>


                            <Label for="title">Name</Label>
                            <Input
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                invalid={!!errors.title}
                                required
                            />
                            <FormFeedback>{errors.title}</FormFeedback>
                        </FormGroup>

                        <FormGroup>
                            <Label for="price">Price</Label>
                            <Input
                                type="number"
                                id="price"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                invalid={!!errors.price}
                            />
                            <FormFeedback>{errors.price}</FormFeedback>
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
                                Add Product
                            </Button>
                        </div>
                    </Form>
                </CardBody>
            </Card>
        </div>
    );
}

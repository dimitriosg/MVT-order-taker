// src/components/Menu/AddMenuItems.js
import React, { useState, useEffect } from 'react';
import api from '../../api.js';
import '../../styles/menuItem.css';

const AddMenuItem = () => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        category: '',
        image: null
    });

    const [categories, setCategories] = useState([]);
    const [feedback, setFeedback] = useState({
        visible: false,
        type: '',  // 'success' or 'error'
        message: ''
    });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await api.get('/api/menuCategories');
                setCategories(response.data);
                setFormData(prevState => ({ ...prevState, category: response.data[0] }));
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    const handleChange = (e) => {
        if (e.target.type === 'file') {
            setFormData({
                ...formData,
                image: e.target.files[0]
            });
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            });
        }
    }    

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formUploadData = new FormData();
        formUploadData.append('name', formData.name);
        formUploadData.append('price', formData.price);
        formUploadData.append('description', formData.description);
        formUploadData.append('category', formData.category);
        if (formData.image) {
            formUploadData.append('image', formData.image, formData.image.name);
        }

        try {
            const response = await api.post('/api/menuItems/addMenuItem', formUploadData); 

            setFeedback({
                visible: true,
                type: 'success',
                message: 'Menu item added successfully!'
            });

            setTimeout(() => {
                setFeedback(prevState => ({ ...prevState, visible: false }));
            }, 2500);

            setFormData({
                name: '',
                price: '',
                description: '',
                category: '',
                image: null
            });

            console.log(response.data);
            // Add a success message or redirect as needed
        } catch (error) {
            setFeedback({
                visible: true,
                type: 'error',
                message: error.response ? error.response.data.error : 'Error adding menu item. Please try again.'
            });
            setTimeout(() => {
                setFeedback(prevState => ({ ...prevState, visible: false }));
            }, 2500);
        }
    }

    return (
        <div className="menu-item-form">
            <h2>Add New Menu Item</h2>

            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input 
                    type="text" 
                    name="name" 
                    placeholder="Item Name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    type="number" 
                    name="price" 
                    placeholder="Price" 
                    value={formData.price} 
                    onChange={handleChange} 
                    required 
                />
                <textarea 
                    name="description" 
                    placeholder="Description" 
                    value={formData.description} 
                    onChange={handleChange}
                ></textarea>
                <select 
                    name="category" 
                    value={formData.category} 
                    onChange={handleChange}
                >
                    {categories.map((category, index) => (
                        <option 
                            key={index} 
                            value={category}
                        >
                            {category}
                        </option>
                    ))}
                </select>
                <input 
                    type="file" 
                    name="image" 
                    onChange={handleChange} 
                />
                <button type="submit">Add Item</button>
            </form>
            {feedback.visible && (
            <div className={`popup ${feedback.type}`}>
                {feedback.message}
            </div>
            )}

        </div>
    );
}

export default AddMenuItem;

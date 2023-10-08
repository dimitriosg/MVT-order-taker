// src/components/Menu/GetAllMenuItems.js
import React, { useState, useEffect } from 'react';
import api from '../../api.js';
import '../../styles/menuItem.css';

const GetAllMenuItems = () => {
    const [menuItems, setMenuItems] = useState({});
    const [showImages, setShowImages] = useState(true);

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await api.get('/api/menuItems');  // Assuming this endpoint returns all menu items.
                const groupedItems = response.data.reduce((acc, item) => {
                    if (!acc[item.category]) {
                        acc[item.category] = [];
                    }
                    acc[item.category].push(item);
                    return acc;
                }, {});
                setMenuItems(groupedItems);
            } catch (error) {
                console.error("Error fetching menu items:", error);
            }
        };
        fetchMenuItems();
    }, []);   

    return (
        <div className="all-menu-items">
            <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <label className="switch">
                    <input 
                        type="checkbox" 
                        checked={showImages} 
                        onChange={() => setShowImages(prev => !prev)} 
                    />
                    <span className="slider round"></span>
                </label>
                <span style={{ 
                    marginRight: '20px',
                    fontWeight: '600',
                    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
                    color: '#333',
                    fontSize: '0.95em',
                    letterSpacing: '0.5px'
                }}>
                    {showImages ? "Hide Images" : "Show Images"}
                </span>

            </div>

            {Object.keys(menuItems).map(category => (
                <div key={category} className="category-section">
                    <h3>{category}</h3>
                    <ul>
                        {menuItems[category].map(item => (
                            <li key={item._id}>
                                {showImages && (
                                    <img
                                    src={item.image ? `/api/image/${item.image}` : "/uploads/no-image.png"}
                                    alt={item.name}
                                    style={{ width: '0.7cm', height: '0.7cm', objectFit: 'cover' }}
                                    />
                                )}
                                {item.name} - {item.price}€
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default GetAllMenuItems;

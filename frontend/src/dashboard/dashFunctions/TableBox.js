// src/dashboard/dashFunctions/TableBox.js

import React from 'react';
import '../dashCSS/TableBox.css';  // Import the CSS


const TableBox = ({ table, onSelect }) => {
    const tableName = `T${table.number}`;
    return (
        <div className="table-box" onClick={onSelect}>
            <p>{tableName}</p>
        </div>
    );
};

export default TableBox;

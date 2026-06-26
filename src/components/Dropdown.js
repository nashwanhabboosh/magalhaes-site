import React, { useState } from 'react';
import './Dropdown.css';

export default function Dropdown({ label, items, onItemClick, onLabelClick }) {
  const [hoveredItem, setHoveredItem] = useState(null);

  const handleItemClick = (itemLabel) => {
    if (onItemClick) {
      onItemClick(itemLabel);
    }
  };

  const handleLabelClick = () => {
    if (onLabelClick) {
      onLabelClick(label);
    }
  };

  const renderItem = (item, index) => {
    // Check if item has nested children
    const hasChildren = item.children && item.children.length > 0;
    const itemLabel = typeof item === 'string' ? item : item.label;

    return (
      <li
        key={index}
        className={`dropdown-item ${hasChildren ? 'has-submenu' : ''}`}
        onMouseEnter={() => setHoveredItem(index)}
        onMouseLeave={() => setHoveredItem(null)}
      >
        <button 
          className="dropdown-link"
          onClick={() => handleItemClick(itemLabel)}
        >
          {itemLabel}
          {hasChildren && <span className="submenu-arrow">›</span>}
        </button>
        
        {hasChildren && hoveredItem === index && (
          <ul className="dropdown-submenu">
            {item.children.map((child, childIndex) => {
              const childLabel = typeof child === 'string' ? child : child.label;
              return (
                <li key={childIndex} className="dropdown-item">
                  <button 
                    className="dropdown-link"
                    onClick={() => handleItemClick(childLabel)}
                  >
                    {childLabel}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </li>
    );
  };

  return (
    <div className="dropdown">
      <button className="nav-link" onClick={handleLabelClick}>{label}</button>
      <ul className="dropdown-menu">
        {items.map((item, index) => renderItem(item, index))}
      </ul>
    </div>
  );
}
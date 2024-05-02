import React from "react";

function BreadcrumbsData({ breadcrumbs, handleBreadcrumbClick }) {
    console.log('breadcrumbs =>',breadcrumbs);
    
    return (
        <nav aria-label="breadcrumb" className="px-2" style={{ backgroundColor: "rgb(251 242 242)" }}>
            {breadcrumbs.map((breadcrumb, index) => (
                <li key={index} className={`breadcrumb-item fw-bold mt-1 mb-1 ${breadcrumb.active ? 'active-breadcrumb' : ''}`} style={{ cursor: "pointer", textDecoration: 'underline' }}>
                    <span onClick={() => handleBreadcrumbClick(breadcrumb)}>{breadcrumb.label}</span>
                </li>
            ))}
        </nav>
    );
}

export default BreadcrumbsData;

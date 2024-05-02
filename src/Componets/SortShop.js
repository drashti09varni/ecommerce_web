import React, { useEffect, useState } from 'react'
import { BsCartCheckFill } from 'react-icons/bs';
const API_URL = "https://api.hindustanrides.in/api/v1"

const SortShop = ({ fruits, setFruits, sortingOpen, setSortingOpen }) => {

    const [sortingOrder, setSortingOrder] = useState('');

    const fetchAndSortFruits = async (order) => {
        try {
            const response = await fetch(`${API_URL}/sortingProduct?order=${order}`);
            const data = await response.json();
            setFruits(data.result);
        } catch (error) {
            console.error('Error fetching and sorting fruits:', error);
        }
    };

    const handleSortingChange = (event) => {
        const selectedOrder = event.target.value;
        setSortingOrder(selectedOrder);
        setSortingOpen(true);
    };

    useEffect(() => {
        if (sortingOrder) {
            fetchAndSortFruits(sortingOrder);
        }
    }, [sortingOrder]);

    // contunuw shoppinh



    return (
        <div>
            <div className="row g-4">
                <div className="col-xl-3">
                    <div className="input-group w-100 mx-auto d-flex">
                        <input
                            type="search"
                            className="form-control p-3"
                            placeholder="keywords"
                            aria-describedby="search-icon-1"
                        />
                        <span id="search-icon-1" className="input-group-text p-3">
                            <i className="fa fa-search" />
                        </span>
                    </div>
                </div>
                <div className="col-6" />
                <div className="col-xl-3">
                    <div className=" bg-light ps-3 py-3 rounded d-flex justify-content-between mb-4">
                        <label htmlFor="fruits">Default Sorting:</label>
                        <select
                            id="fruits"
                            name="fruitlist"
                            className="border-0 form-select-sm bg-light me-3"
                            form="fruitform"
                            onChange={handleSortingChange}
                        >
                            <option value="">Select Sorting</option>
                            <option value="">Select Sorting</option>
                            <option value="asc">Price : Low to High</option>
                            <option value="desc">Price : High to Low</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SortShop
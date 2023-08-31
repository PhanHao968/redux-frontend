import React, {useEffect, useState} from "react";
import {Table,Modal,Button} from "react-bootstrap";
import ProductsRow from './ProductsRow';
import { useNavigate } from 'react-router-dom';
import {useSelector, useDispatch} from "react-redux";
import {fetchSims, fetchSimsSuccess} from "../actions/ProductAction";
import {deleteProduct, updateProductSimInfo} from '../actions/UpdateProductAction';


const ProductsTable = () => {
    const dispatch = useDispatch();
    const sims = useSelector(state => state.sims.sims);
    const [showFilteredResults, setShowFilteredResults] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [productToDeleteId, setProductToDeleteId] = useState(null);

    const handleDestroyClick = (id) => {
        setProductToDeleteId(id);
        setShowModal(true);
    };

    let navigate = useNavigate()
    const handleDelete = async (id) => {

        try {
            const response = await fetch(`http://localhost:8000/destroy/${id}`, {
                method: "DELETE",
                headers: {
                    accept: 'application/json'
                }
            });
            const result = await response.json();
            if (result.status === "Successfully") {
                dispatch(deleteProduct(id));
                setShowModal(false);
            } else {
                const errorData = await response.json();
                console.error("Error deleting product:", errorData);
                alert("Product delete failed")
            }
        }
            catch (error){
                console.error("Error deleting product:",error);
                alert("An error occurred while deleting the product.");
            }
        }

    const handleUpdate = (id) =>{
        const product = sims.data.filter(sim => sim.id === id)[0];
       if(product){
            dispatch(updateProductSimInfo({
            network: product.network,
            phone_number: product.phone_number,
            price: product.price,
            category: product.category,
            detail: product.detail,
            simId: id
        }));
        navigate("/updateproduct")
       }
    }

    useEffect(() => {
        dispatch(fetchSims());
    }, [dispatch]);

    const searchResults = useSelector(state => state.sims.sims)
    const filteredSims = searchResults.length > 0 ? searchResults : sims.data;

    return(
        <div>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Num</th>
                    <th>Supplier</th>
                    <th>Phone_Number</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Detail</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {filteredSims && filteredSims.map((sim, index) => (
                    <ProductsRow
                        key={sim.id}
                        id={sim.id}
                        num ={index + 1}
                        network = {sim.network}
                        phone_number ={sim.phone_number}
                        price = {sim.price}
                        category = {sim.category}
                        detail = {sim.detail}
                        created_at = {sim.created_at}
                        // handleDelete={handleDelete}
                        handleDestroyClick = {handleDestroyClick}
                        handleUpdate = { handleUpdate }
                    />
                ))}
                </tbody>
                {/* Modal */}
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Deletion</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to delete this product?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={() => handleDelete(productToDeleteId)}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Table>
        </div>
    );
}

export default ProductsTable;

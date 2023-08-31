import React, {useEffect, useState} from "react";
import {Table,Modal,Button} from "react-bootstrap";
import ProductsRow from './ProductsRow';
import {useDispatch, useSelector} from "react-redux";
import {restoreSims, trashSims} from "../actions/ProductAction";
import {deleteProduct} from "../actions/UpdateProductAction";


const TrashTable = () => {
    const dispatch = useDispatch();
    const sims = useSelector(state => state.sims)

    const [showModal, setShowModal] = useState(false);

    const [productToDeleteId, setProductToDeleteId] = useState(null);

    const handleDeleteClick = (id) => {
        setProductToDeleteId(id);
        setShowModal(true);
    };

    const handleRestoreClick = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/restore/${id}`, {
                method: "PUT",
                headers: {
                    accept: 'application/json'
                }
            });
            const result = await response.json();
            if(result.status  === "Successfully"){
                // const restoredProduct = sims.data.find((sim) => sim.id === id);
                // restoredProduct.is_deleted = false;
                dispatch(restoreSims(id))

                // sims({data: [...restoredProduct]});
                alert("Product restored")

            }else {
                const errorData = await response.json();
                console.error("Error restore product:", errorData);
                alert("Product restore failed")
            }

        }catch (error){
            console.error("Error restore product:",error);
            console.log("Detailed error:", error);
            alert("An error occurred while restore the product.");
        }
    }

    const handleDelete = async (id) => {

        try {
            const response = await fetch(`http://localhost:8000/product/${id}`, {
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
        }catch (error){
            // console.error("Error deleting product:",error);
            alert("An error occurred while deleting the product.");
            setShowModal(false);
        }
    }


    useEffect(()=>{
        dispatch(trashSims())
    },[])

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
                {sims.data && sims.data.map((sims, index) => (
                    <ProductsRow
                        key={sims.id}
                        id={sims.id}
                        num ={index + 1}
                        network = {sims.network}
                        phone_number ={sims.phone_number}
                        price = {sims.price}
                        category = {sims.category}
                        detail = {sims.detail}
                        created_at = {sims.created_at}
                        handleDeleteClick = {handleDeleteClick}
                        handleRestoreClick={handleRestoreClick}
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
export default TrashTable;


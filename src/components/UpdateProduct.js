import {Button, Card, Form} from "react-bootstrap";
import React, { useContext, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import { UPDATE_PRODUCT_INFO } from '../constants/UpdateProductConstant';
import updateProductReducer from "../reducers/UpdateProductReducer";
import {updateProductSimInfo} from "../actions/UpdateProductAction";


const UpdateProduct = () => {

	const updateProductInfo = useSelector(state=> state.updateProductInfo);
	const dispatch = useDispatch();
	const updateForm = (e) => {
		const formData = {[e.target.name]: e.target.value};
		dispatch(updateProductSimInfo(formData));
	};

    const postData = async (e) => {

		e.preventDefault();
		console.log(updateProductInfo)

		const url = process.env.REACT_APP_BACKEND_URL + "updateproduct/" + updateProductInfo['simId']

		const response = await fetch(url, {
				method: 'PUT',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json'
			},
			redirect: 'follow',
			referrerPolicy: 'no-referrer',
			body: JSON.stringify({
				"network": updateProductInfo['network'],
				"phone_number": updateProductInfo['phone_number'],
				"price": updateProductInfo['price'],
				"category": updateProductInfo['category'],
				"detail": updateProductInfo['detail'],
                })
            });
        response.json().then(response => {
            if (response.status === 'Successfully') {
                alert("Product update successfully")
            } else {
                alert("Failed to update product")
            }
        });
        dispatch(updateProductSimInfo({
            network: "",
            phone_number: "",
            price: "",
            category: "",
            detail: "",
        }));
    }

    return(
        <Card>
			<Card.Body>
				<Form  onSubmit={postData} >
					<Form.Group controlId='network'>
						<Form.Label>Supplier</Form.Label>
						<Form.Control
							type='text'
							name='network'
							value={updateProductInfo.network}
							onChange={updateForm}
							placeholder='Supplier'
						/>
					</Form.Group>

                    <Form.Group controlId='phone_number'>
						<Form.Label>Phone_Number</Form.Label>
						<Form.Control
							type='text'
							name='phone_number'
							value={updateProductInfo.phone_number}
							onChange={updateForm}
							placeholder='Phone_Number'
						/>
					</Form.Group>

                    <Form.Group controlId='price'>
						<Form.Label>Price</Form.Label>
						<Form.Control
							type='text'
							name='price'
							value={updateProductInfo.price}
							onChange={updateForm}
							placeholder='Price'
						/>
					</Form.Group>

                    <Form.Group controlId='category'>
						<Form.Label>Category</Form.Label>
						<Form.Control
							type='text'
							name='category'
							value={updateProductInfo.category}
							onChange={updateForm}
							placeholder='Category'
						/>
					</Form.Group>

                    <Form.Group controlId='detail'>
						<Form.Label>Detail</Form.Label>
						<Form.Control
							type='text'
							name='detail'
							value={updateProductInfo.detail}
							onChange={updateForm}
							placeholder='Detail'
						/>
					</Form.Group>

					<Button variant='primary' type='submit'>
						Submit
					</Button>
				</Form>
			</Card.Body>
		</Card>
    )
}

export default UpdateProduct;
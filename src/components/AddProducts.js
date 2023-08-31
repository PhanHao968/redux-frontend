import react, {useState} from "react";
import {Form,Button,Card} from "react-bootstrap";


const AddProducts=()=>{
    const [simsInfor, setSimInfor] = useState({
        network: "",
        phone_number: "",
        price: "",
        category: "",
        detail: "",
    })

    const updateForm = (e)=>{
        setSimInfor({
            ...simsInfor,
            [e.target.name] : e.target.value
        });
    };

    const postData = async (e) => {
        e.preventDefault();
        console.log(simsInfor)

        const url = process.env.REACT_APP_BACKEND_URL + "addproducts/"

        const response = await fetch(
            url, {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
                body: JSON.stringify({
                    "network": simsInfor['network'],
                    "phone_number": simsInfor['phone_number'],
                    "price": simsInfor['price'],
                    "category": simsInfor['category'],
                    "detail": simsInfor['detail'],
                })
            });
        response.json().then(response => {
            if (response.status === 'Successfully') {
                alert("Product added successfully")
            } else {
                alert("Failed to add product")
            }
        });
        setSimInfor({
            network: "",
            phone_number: "",
            price: "",
            category: "",
            detail: "",
        });
    }

    return(
        <Card>
            <Card.Body>
                <Form onSubmit = {postData}>
                    <Form.Group controlId="network">
                        <Form.Label>Network</Form.Label>
                        <Form.Control type="text" name="network"
                            value={simsInfor.network} onChange = {updateForm} placeholder="Network" />
                    </Form.Group>

                    <Form.Group controlId="phone_number">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control type="number" name="phone_number"
                                      value={simsInfor.phone_number} onChange = {updateForm} placeholder="Phone Number" />
                    </Form.Group>

                    <Form.Group controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number" name="price"
                                      value={simsInfor.price} onChange = {updateForm}  placeholder="Price" />
                    </Form.Group>

                    <Form.Group controlId="category">
                        <Form.Label>Category</Form.Label>
                        <Form.Control type="text" name="category"
                                      value={simsInfor.category} onChange = {updateForm}  placeholder="Category" />
                    </Form.Group>

                    <Form.Group controlId="detail">
                        <Form.Label>Detail</Form.Label>
                        <Form.Control type="text" name="detail" value={simsInfor.detail} onChange = {updateForm}
                            placeholder="Detail" />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default AddProducts;
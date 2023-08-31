import React, {useState,useEffect} from "react"
import { Navbar, Nav, Form, FormControl, Button, Badge } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import { useLocation } from "react-router-dom";
import {fetchSimsSuccess, clearSearchResults} from "../actions/ProductAction";


const NavBar = () => {

    const [searchSim, setSearchSim] = useState("")
    const sims = useSelector(state => state.sims);
    const dispatch = useDispatch();
    const [showFilteredResults, setShowFilteredResults] = useState(false);

    const [productsInStockCount, setProductsInStockCount] = useState(0);
    const [trashCount, setTrashCount] = useState(0);

    const location = useLocation();
    const isTrashPage = location.pathname === "/trashsim";

    useEffect(() => {
        if(sims.data){
            const inStockCount = sims.data.filter(sim => !sim.is_deleted).length;
            setProductsInStockCount(inStockCount);
            if(isTrashPage){
                const trashSimCount = sims.data.filter(sim => sim.is_deleted).length;
                setTrashCount(trashSimCount);
            }
        }

    }, [sims.data /*,isTrashPage*/]);

    const updateSearch = (e) => {
        setSearchSim(e.target.value)
    }

    const filterSims = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch(`http://localhost:8000/search/?prefix=${searchSim}`);
            const data = await response.json()
            if(data.matching_phone_numbers && data.matching_phone_numbers.length > 0){
                dispatch(fetchSimsSuccess(data.matching_phone_numbers));
                setShowFilteredResults(true);
            }else {
                alert("No matching phone numbers found")
                dispatch(clearSearchResults());
                setShowFilteredResults(false);
            }
        }catch (error){
            console.error("Network error:", error);
        }
    }


    return (
        <Navbar bg="dark" expand="lg" variant="dark" className="mt-auto" >
            <Navbar.Brand href="/"> App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="d-flex justify-content-sm-between">
                <Nav className="mr-auto">
                    <Badge className="mt-2" variant="primary">Products in stock {productsInStockCount} </Badge>
                    <Link to="/trashsim">
                    <Badge className="mt-2" variant="primary">Trash  </Badge> {/*{trashCount}*/}
                    </Link>
                </Nav>

                <Form onSubmit={filterSims} className="d-flex justify-content-between align-items-center">
                    <Link to="/addproduct" className="btn btn-primary flex-grow-1" style={{ whiteSpace: "nowrap" }}>Add Product</Link>
                    <FormControl value= {searchSim} onChange={updateSearch} type="text" placeholder="Search" required className="mr-sm-2" style={{ marginLeft: "10px"}} />
                    <Button type="submit"  variant="outline-primary" style={{ marginLeft: "10px"}} >Search</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>

    );
}

export default NavBar;
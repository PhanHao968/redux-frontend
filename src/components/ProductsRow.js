import React from "react";
import { useLocation } from "react-router-dom";

const ProductsRow = ({id, num, network, phone_number, price, category,detail, created_at,handleDeleteClick,handleUpdate,handleRestoreClick,handleDestroyClick }) =>{
    const location = useLocation();
    const isTrashPage = location.pathname === "/trashsim";

    return(
        <tr>
            <td>{num}</td>
            <td>{network}</td>
            <td>{phone_number}</td>
            <td>{price}</td>
            <td>{category}</td>
            <td>{detail}</td>
            <td>{created_at}</td>
            <td className="action-column" style={{width: 150}}>

                {isTrashPage ? (
                    <>
                    <button onClick={() => handleRestoreClick(id)} className="btn btn-outline-success btn-sm ml-1 mr-2">
                        Restore
                    </button>
                    <button  onClick={ () => handleDeleteClick(id)} className = "btn btn-outline-danger btn-sm mr-2">
                    Delete
                    </button>
                    </>
                ) : (
                    <>
                    <button  onClick={()=> handleUpdate(id)} className="btn btn-outline-info btn-sm ml-1 mr-2">
                        Update
                    </button>
                    <button  onClick={ () => handleDestroyClick(id)} className = "btn btn-outline-danger btn-sm mr-2">
                    Delete
                    </button>
                    </>
                )}

            </td>
        </tr>
    );
}

export default ProductsRow;
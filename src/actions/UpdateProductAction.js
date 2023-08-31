// eslint-disable-next-line no-unused-vars
import { UPDATE_PRODUCT_INFO } from '../constants/UpdateProductConstant';

export const updateProductSimInfo = (formData) => ({
    type: UPDATE_PRODUCT_INFO,
    payload: formData
});

export const deleteProduct = (productId) => {
    return {
        type: "DELETE_PRODUCT",
        payload: productId
    };
};
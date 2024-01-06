import { get } from "../../../helper/api";

const ProductsService = {};

ProductsService.fetchProducts = async ({ from = 0, size = 500 }) => {
    const urlObj = {
        url: 'https://fakestoreapi.com/products',
        query: {},
    };
    const response = await get({ urlObj });
    console.log(response);
    return response;
};

export default ProductsService;

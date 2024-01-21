import { get } from "../../../helper/api";

const ProductsService = {};

ProductsService.fetchProducts = async ({ from = 0, size = 500 }) => {
    const urlObj = {
        url: 'https://gotest-xj8jikrn.b4a.run/domains',
        query: {
            from: 0,
            size: 10,
            authorizer: "admin123",
            source: 'fe'
        },
    };
    const response = await get({ urlObj });
    console.log(response);
    return response;
};

export default ProductsService;

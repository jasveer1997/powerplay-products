import { post } from "../../../helper/api";

const AuthService = {};

AuthService.login = async ({ username = "mor_2314", password = "83r5^_", preference }) => {
    const urlObj = {
        url: 'https://fakestoreapi.com/auth/login',
        query: {},
    };
    const reqBody = {
        username,
        password,
    };
    const response = await post({ urlObj, req: { body: reqBody } });
    console.log(response);
    return response;
};

export default AuthService;


// Future dev: preference setup for login
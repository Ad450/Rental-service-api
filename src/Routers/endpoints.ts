import EndpointsInterface from "./endpoints_interface";

// Rentals
const getAllBooks: string = "/getAllBooks";
const getBook: string = "/getBook:id";
const rentBook: string = "/rentBook";
const turnInBook: string = "/turnInBook";

// Auth
const getAllUsers: string = "/getAllUsers";
const getUsers: string = "/getUsers";
const getUser: string = "/getUser:id";
const signup: string = "/signup";
const login: string = "/login";



export const routers: Array<EndpointsInterface> = [
    // {
    //     route: 
    // }
]
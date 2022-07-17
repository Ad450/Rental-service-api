"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiResponse {
    static responseJson(input) {
        return {
            "message": input
        };
    }
}
exports.default = ApiResponse;
ApiResponse._userAlreadyExists = "user already exists";
ApiResponse._userNotFound = "user not found";
ApiResponse._loginSuccessful = "login succesful";
ApiResponse._serverError = "server error";
ApiResponse._invalidCredentials = "invalid credentials";
ApiResponse._invalidPassword = "invalid password credentials";
ApiResponse._invalidEmail = "invalid email credentials";
ApiResponse._invalidLogin = "invalid login credentials";
ApiResponse._invalidInputData = "invalid input data";
ApiResponse._invalidAuthInput = "invalid credentials";
ApiResponse._authorizationFailed = "authorization failed";
ApiResponse._bookHandedIn = "book handed in";
ApiResponse._bookRented = "book rented";
ApiResponse.responses = {
    userAlreadyExists: ApiResponse._userAlreadyExists,
    userNotFound: ApiResponse._userNotFound,
    loginSuccessful: ApiResponse._loginSuccessful,
    serverError: ApiResponse._serverError,
    invalidCredentials: ApiResponse._invalidCredentials,
    invalidPassword: ApiResponse._invalidPassword,
    invalidEmail: ApiResponse._invalidEmail,
    invalidLogin: ApiResponse._invalidLogin,
    invalidInputData: ApiResponse._invalidInputData,
    invalidAuthInput: ApiResponse._invalidAuthInput,
    authorizationFailed: ApiResponse._authorizationFailed,
    bookHandedIn: ApiResponse._bookHandedIn,
    bookRented: ApiResponse._bookRented
};

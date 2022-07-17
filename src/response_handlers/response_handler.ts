export type ResponseType = {
    message: string;
}

export default abstract class ApiResponse {

    protected static _userAlreadyExists: string = "user already exists";
    protected static _userNotFound: string = "user not found";
    protected static _loginSuccessful: string = "login succesful";
    protected static _serverError: string = "server error";
    protected static _invalidCredentials: string = "invalid credentials";
    protected static _invalidPassword: string = "invalid password credentials";
    protected static _invalidEmail: string = "invalid email credentials";
    protected static _invalidLogin: string = "invalid login credentials";
    protected static _invalidInputData: string = "invalid input data";
    protected static _invalidAuthInput: string = "invalid credentials";
    protected static _authorizationFailed: string = "authorization failed";
    protected static _bookHandedIn: string = "book handed in";
    protected static _bookRented: string = "book rented";
    protected static _bookNotFound: string = "book not found";

    static responses = {
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
        bookRented: ApiResponse._bookRented,
        bookNotFound: ApiResponse._bookNotFound,
    }

    static responseJson(input: string): {} {
        return {
            "message": input
        }
    }
}
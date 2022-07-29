import AuthServiceHandler from "../../handlers/auth_service_handler";
import { AuthServiceParam } from "../../interfaces/auth_service_param";
import { UserFromDb } from "../../interfaces/database_service_param";
import AuthService from "./auth_service";

export default class AuthServiceImpl implements AuthService<AuthServiceParam>{
    authServiceHandler: AuthServiceHandler;

    constructor(authServiceHandler: AuthServiceHandler) {
        this.authServiceHandler = authServiceHandler;
    }

    async login(param: AuthServiceParam): Promise<void> {
        const { req, res, next } = param;
        try {
            // await this.authServiceHandler.login(req, res, next);
        } catch (error) {
            // will introduce Logger soon!
            console.log(error);
        }
    }
    async signup(param: AuthServiceParam): Promise<void> {
        const { req, res, next } = param;
        try {
            await this.authServiceHandler.signup(req, res, next);
        } catch (error) {
            // will introduce Logger soon!
            console.log(error);
        }
    }
    async getAllUsers(param: AuthServiceParam): Promise<UserFromDb[]> {
        throw new Error("Method not implemented.");
    }
    async getUser(param: AuthServiceParam): Promise<UserFromDb> {
        throw new Error("Method not implemented.");
    }

}
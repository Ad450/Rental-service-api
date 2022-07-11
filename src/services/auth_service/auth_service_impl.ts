import AuthServiceParam from "../../interfaces/auth_service_param";
import AuthService from "./auth_service";

export default class AuthServiceImpl extends AuthService<AuthServiceParam>{

    async login(param: unknown): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async signup(param: AuthServiceParam): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async getAllUser(param: AuthServiceParam): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async getUser(param: AuthServiceParam): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
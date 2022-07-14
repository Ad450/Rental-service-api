import { UserFromDb } from "../../interfaces/database_service_param";

export default abstract class AuthService<AuthServiceParam> {
    abstract login(param: AuthServiceParam): Promise<void>;
    abstract signup(param: AuthServiceParam): Promise<void>;
    abstract getAllUsers(param: AuthServiceParam): Promise<Array<UserFromDb>>;
    abstract getUser(param: AuthServiceParam): Promise<UserFromDb>;
}
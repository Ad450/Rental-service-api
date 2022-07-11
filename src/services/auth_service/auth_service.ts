export default abstract class AuthService<AuthServiceParam> {
    abstract login(param: AuthServiceParam): Promise<void>;
    abstract signup(param: AuthServiceParam): Promise<void>;
    abstract getAllUser(param: AuthServiceParam): Promise<void>;
    abstract getUser(param: AuthServiceParam): Promise<void>;
}
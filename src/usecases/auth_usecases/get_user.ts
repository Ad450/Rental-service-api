import BaseUsecase from "../../core/base_usecase";
import { AuthServiceParam } from "../../interfaces/auth_service_param";
import UsecaseParam from "../../interfaces/usecase_params";
import AuthService from "../../services/auth_service/auth_service";

export default class GetUser implements BaseUsecase<UsecaseParam> {
  authService: AuthService<AuthServiceParam>;

  constructor(authService: AuthService<AuthServiceParam>) {
    this.authService = authService;
  }

  async call(param: UsecaseParam): Promise<void> {
    const { req, res, next } = param;
    const serviceParams: AuthServiceParam = {
      req: req,
      res: res,
      next: next,
    };
    try {
      this.authService.getUser(serviceParams);
    } catch (error) {
      console.warn(error);
    }
  }
}

import { Request, Response, NextFunction } from "express";
import BaseUsecase from "../../core/typedefs";
import { AuthServiceParam } from "../../interfaces/auth_service_param";
import UsecaseParam from "../../interfaces/usecase_params";
import AuthService from "../../services/auth_service/auth_service";

export default class Login implements BaseUsecase<UsecaseParam>{
    authService: AuthService<AuthServiceParam>;

    constructor(authService: AuthService<AuthServiceParam>) {
        this.authService = authService;
    }


    async call(param: UsecaseParam): Promise<void> {
        const { req, res, next } = param;
        const serviceParams: AuthServiceParam = {
            req: req,
            res: res,
            next: next
        }
        try {
            this.authService.login(serviceParams);
        } catch (error) {
            console.warn(error);
        }
    }

}
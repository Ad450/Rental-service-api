import { Request, Response, NextFunction } from "express";
import BaseUsecase from "../../core/typedefs";
import UsecaseParam from "../../interfaces/usecase_params";
import AuthenticationRepository from "../../Repository/auth_repo/auth_repo";

export default class GetUsers extends BaseUsecase<UsecaseParam>{
    authenticationRepository: AuthenticationRepository;

    constructor(authenticationRepository: AuthenticationRepository) {
        super();
        this.authenticationRepository = authenticationRepository;
    }

    async call(param: UsecaseParam): Promise<void> {
        const { req, res, next } = param;
        try {
            this.authenticationRepository.getUser(req, res, next);
        } catch (error) {
            console.warn(error);
        }
    }

}
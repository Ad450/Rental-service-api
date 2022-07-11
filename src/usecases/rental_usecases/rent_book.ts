import { Request, Response, NextFunction } from "express";
import BaseUsecase from "../../core/typedefs";
import UsecaseParam from "../../interfaces/usecase_params";
import RentRepository from "../../Repository/rental_repo/rent_repo";

export default class RentBook implements BaseUsecase<UsecaseParam>{
    rentRepository: RentRepository;

    constructor(rentRepository: RentRepository) {
        this.rentRepository = rentRepository;
    }
    async call(param: UsecaseParam): Promise<void> {
        const { req, res, next } = param;

        try {
            await this.rentRepository.rentBook(req, res, next);
        } catch (error) {
            console.warn(error);
        }
    }
}
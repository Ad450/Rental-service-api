import { Request, Response, NextFunction } from "express";
import BaseUsecase from "../../core/typedefs";
import RentalServiceParam from "../../interfaces/rental_service_param";
import UsecaseParam from "../../interfaces/usecase_params";
import RentalService from "../../services/rental_service/rental_service";

export default class GetAllBooks implements BaseUsecase<UsecaseParam>{
    rentService: RentalService<RentalServiceParam>;

    constructor(rentService: RentalService<RentalServiceParam>) {
        this.rentService = rentService;
    }

    async call(param: UsecaseParam): Promise<void> {
        const { req, res, next } = param;
        const serviceParams: RentalServiceParam = {
            req: req,
            res: res,
            next: next
        }
        try {
            this.rentService.getAllBook(serviceParams);
        } catch (error) {
            console.warn(error);
        }
    }
} 
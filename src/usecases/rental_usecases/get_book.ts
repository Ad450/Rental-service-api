import { Request, Response, NextFunction } from "express";
import BaseUsecase from "../../core/typedefs";
import RentRepository from "../../Repository/rental_repo/rent_repo";

export default class GetBook implements BaseUsecase {
    rentRepository: RentRepository;

    constructor(rentRepository: RentRepository) {
        this.rentRepository = rentRepository;
    }
    async call(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            await this.rentRepository.getBook(req, res, next);
        } catch (error) {
            console.warn(error);
        }
    }
}
import RentalServiceParam from "../../interfaces/rental_service_param";
import RentalService from "./rental_service";

export default class RentalServiceImpl extends RentalService<RentalServiceParam>{
    rentBook(param: RentalServiceParam): Promise<void> {
        throw new Error("Method not implemented.");
    }
    turnInBook(param: RentalServiceParam): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getBook(param: RentalServiceParam): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getAllBook(param: RentalServiceParam): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
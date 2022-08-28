import { BookFromDb } from "../../interfaces/database_service_param";
import RentalServiceParam from "../../interfaces/rental_service_param";
import { BookType } from "../../db/postgresql/prisma_db";

export default abstract class RentalService<RentalServiceParam> {
  abstract rentBook(param: RentalServiceParam): Promise<void>;
  abstract turnInBook(param: RentalServiceParam): Promise<void>;
  abstract getBook(param: RentalServiceParam): Promise<void>;
  abstract getAllBook(param: RentalServiceParam): Promise<void>;
}

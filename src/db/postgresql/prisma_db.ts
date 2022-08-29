import { Book, PrismaClient, User } from "@prisma/client";
import { BookType, Database, UserType } from "../db_interface";

export class UserDatabasePrisma implements Database<UserType, User> {
  prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }
  async retrieveOne(id: number): Promise<User | null> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: id,
        },
      });
      return user;
    } catch (error) {
      throw new Error("database error");
    }
  }
  async retrieve<T extends UserType>(): Promise<Array<User> | null> {
    try {
      // returning null for skip return error
      return null;
    } catch (error) {
      throw new Error("database error");
    }
  }
  async create<T extends UserType>(param: T): Promise<void> {
    const { name, email, password } = param;
    try {
      await this.prisma.user.create({
        data: {
          name: name,
          password: password,
          email: email,
        },
      });
    } catch (error) {
      // TODO: handle errors properly
      console.log(error);
    }
  }
  async update<T extends UserType>(param: T): Promise<void> {
    const { name, email, password } = param;
    try {
      await this.prisma.user.update({
        where: {
          email: email,
        },
        data: {
          name: name,
          email: email,
          password: password,
        },
      });
    } catch (error) {}
  }
  async delete<T extends UserType>(param: T): Promise<void> {}
}

export class BookDatabase implements Database<BookType, Book> {
  prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async retrieveOne<T extends BookType>(id: number): Promise<Book | null> {
    try {
      const book = await this.prisma.book.findUnique({
        where: {
          id: id,
        },
      });
      return book;
    } catch (error) {
      console.log(error);

      throw new Error("database error");
    }
  }
  async retrieve<T extends BookType>(): Promise<Array<Book> | null> {
    try {
      const book = await this.prisma.book.findMany({
        // where: {
        //   name: identifier,
        // },
      });
      return book;
    } catch (error) {
      throw new Error("database error");
    }
  }
  async create<T extends BookType>(param: T): Promise<void> {
    const { name, hash, startDate, endDate, rented, rentedBy } = param;
    try {
      await this.prisma.book.create({
        data: {
          name: name,
          hash: hash,
          startDate: startDate,
          endDate: endDate,
          rented: rented,
          rentedBy: rentedBy,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
  async update<T extends BookType>(param: T): Promise<void> {
    const { name, hash, startDate, endDate, rented, rentedBy } = param;
    try {
      await this.prisma.book.update({
        where: {
          name: name,
        },
        data: {
          name: name,
          hash: hash,
          startDate: startDate,
          endDate: endDate,
          rented: rented,
          rentedBy: rentedBy,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
  async delete<T extends BookType>(param: T): Promise<void> {}
}

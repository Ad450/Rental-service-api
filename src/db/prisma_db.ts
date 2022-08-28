import { Book, PrismaClient, User } from "@prisma/client";

export type UserType = {
  name: string;
  email: string;
  password: string;
};

export type BookType = {
  name: string;
  hash: string;
  startDate: string | null;
  endDate: string | null;
  rented: boolean;
  rentedBy: string | null;
};

abstract class Prisma<K, Y> {
  abstract create<T extends K>(param: T): Promise<void>;
  abstract update<T extends K>(param: T): Promise<void>;
  abstract delete<T extends K>(param: T): Promise<void>;
  abstract retrieve(identifier: string): Promise<Array<Y> | null>;
  abstract retrieveOne(identifier: string): Promise<Y | null>;
}

export class UserDatabase implements Prisma<UserType, User> {
  prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }
  async retrieveOne(identifier: string): Promise<User | null> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: identifier,
        },
      });
      return user;
    } catch (error) {
      throw new Error("database error");
    }
  }
  async retrieve<T extends UserType>(
    identifier: string
  ): Promise<Array<User> | null> {
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

export class BookDatabase implements Prisma<BookType, Book> {
  prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async retrieveOne<T extends BookType>(
    identifier: string
  ): Promise<Book | null> {
    try {
      const book = await this.prisma.book.findUnique({
        where: {
          name: identifier,
        },
      });
      return book;
    } catch (error) {
      throw new Error("database error");
    }
  }
  async retrieve<T extends BookType>(
    identifier: string
  ): Promise<Array<Book> | null> {
    try {
      const book = await this.prisma.book.findMany({
        where: {
          name: identifier,
        },
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
          hash: hash,
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

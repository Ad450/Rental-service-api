import { PrismaClient } from "@prisma/client";

type UserType = {
  name: string;
  email: string;
  password: string;
};

type BookType = {
  name: string;
  hash: string;
  startDate: string | null;
  endDate: string | null;
  rented: boolean;
  rentedBy: string | null;
};

abstract class Prisma<K> {
  abstract create<T extends K>(param: T): Promise<void>;
  abstract update<T extends K>(param: T): Promise<void>;
  abstract delete<T extends K>(param: T): Promise<void>;
  abstract retrieve<T extends K>(param: T): Promise<void>;
  abstract retrieveOne<T extends K>(param: T): Promise<void>;
}

export class UserDatabase implements Prisma<UserType> {
  prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }
  async retrieveOne<T extends UserType>(param: T): Promise<void> {
    const { name, email, password } = param;
    try {
      await this.prisma.user.findUnique({
        where: {
          email: email,
        },
      });
    } catch (error) {}
  }
  async retrieve<T extends UserType>(param: T): Promise<void> {
    try {
    } catch (error) {}
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

export class BookDatabase implements Prisma<BookType> {
  prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async retrieveOne<T extends BookType>(param: T): Promise<void> {
    const { name, hash, startDate, endDate, rented, rentedBy } = param;
    try {
      await this.prisma.book.findUnique({
        where: {
          hash: hash,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
  async retrieve<T extends BookType>(param: T): Promise<void> {
    const { name, hash, startDate, endDate, rented, rentedBy } = param;
    try {
      await this.prisma.book.findMany({
        where: {
          name: name,
        },
      });
    } catch (error) {
      console.log(error);
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

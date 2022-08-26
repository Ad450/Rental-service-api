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
  retrieveOne<T extends BookType>(param: T): Promise<void> {
    throw new Error("Method not implemented.");
  }
  retrieve<T extends BookType>(param: T): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async create<T extends BookType>(param: T): Promise<void> {}
  async update<T extends BookType>(param: T): Promise<void> {}
  async delete<T extends BookType>(param: T): Promise<void> {}
}

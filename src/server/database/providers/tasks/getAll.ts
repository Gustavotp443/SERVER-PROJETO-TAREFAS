import { PrismaClient } from "@prisma/client";
import { ITask } from "../../models";

const prisma = new PrismaClient();

interface IGetAllTasksParams {
    page?: number;
    limit?: number;
    filter?: string;
  }


 export async function getAll({ page = 1, limit = 20, filter = "" }: IGetAllTasksParams): Promise<ITask[]> {
  try {
    const offset = (page - 1) * limit;

    return await prisma.task.findMany({
        where: {
          title: {
            contains: filter,
            mode: "insensitive", // Case Sensitive nulo
          },
        },
        skip: offset,
        take: limit,
      });
    } catch (err) {
      console.error("Erro ao buscar tarefas!", err);
      throw new Error("Erro ao buscar tarefas");
    }
  }

  export async function count(filter: string = ""): Promise<number | Error> {
    try {
      return await prisma.task.count({
        where: {
          title: {
            contains: filter,
            mode: "insensitive",
          },
        },
      });
    } catch (err) {
      console.error("Erro ao contar registros!", err);
      return new Error("Erro ao contar registros");
    }
  }
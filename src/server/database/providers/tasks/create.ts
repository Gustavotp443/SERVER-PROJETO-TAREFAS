import { PrismaClient } from "@prisma/client";
import { ITask } from "../../models";

const prisma = new PrismaClient()

export async function create(data: Omit<ITask, "id" | "createdAt">) {
    try{
    return await prisma.task.create({
      data,
    });
  } catch(err){
    console.error("Erro ao criar tarefa!", err);
    throw new Error("Erro ao criar tarefa");
  }
}

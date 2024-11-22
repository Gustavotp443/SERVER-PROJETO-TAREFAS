import { PrismaClient } from "@prisma/client";
import { ITask } from "../../models";

const prisma = new PrismaClient();

export async function deleteById(id: number): Promise<ITask | null> {
  try {
    const taskExists = await prisma.task.findUnique({
        where: { id },
    });

    if(!taskExists) return null;
    
    const deletedTask = await prisma.task.delete({
      where: { id },
    });
    
    return deletedTask;
  } catch (err) {
    console.error("Erro ao deletar tarefa!", err);
    throw new Error("Erro ao deletar tarefa");
  }
}
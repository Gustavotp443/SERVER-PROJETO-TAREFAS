import { PrismaClient, TaskStatus } from "@prisma/client";
import { ITask, IUpdateTaskData } from "../../models";

const prisma = new PrismaClient();

export async function updateById(id:number, data:IUpdateTaskData): Promise<ITask | null>{
    try{
        const existingTask = await prisma.task.findUnique({where:{id}});
        if(!existingTask) return null;

        const updateTask = await prisma.task.update({
            where:{id},
            data
        });

        return updateTask;
    }catch(err){
        console.error("Erro ao atualizar a tarefa!",err);
        throw new Error("Erro ao atualizar a tarefa.");
    }
}
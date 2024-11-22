import { TaskStatus } from "@prisma/client";

export interface ITask {
    id: number;
    title: string;
    completed: TaskStatus;
    createdAt: Date;
  }

export interface IUpdateTaskData{
    title?: string;
    completed?:TaskStatus
}

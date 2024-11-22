import { Request, Response } from "express";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";
import { ITask } from "../../database/models";
import { TaskProvider } from "../../database/providers/tasks";
import { validation } from "../../shared/middleware";
import { TaskStatus } from "@prisma/client";

interface IUpdateBodyProps {
    title?: string;
    completed?: string; 
  }

//MIDDLEWARE DE VALIDAÇÃO DOS DADOS
export const updateValidation = validation((getSchema)=>({
    body: getSchema<IUpdateBodyProps>(
        yup.object().shape({
          title: yup.string().optional().max(255, "O título deve ter no máximo 255 caracteres"),
          completed: yup.string().optional().oneOf(["PENDING", "COMPLETED"], "Status inválido"),
        })
      ),
      params: yup.object().shape({
        id: yup.number().required().integer().positive("O ID não pode ser um numero negativo"),
      }),
}))



export const updateById = async (
    req: Request<{id:string}, {}, IUpdateBodyProps>,
    res: Response
  ): Promise<void> => {  
    try {
        if (!req.params.id) {
            res.status(StatusCodes.BAD_REQUEST).json({
              errors: {
                default: "ID não informado"
              }
            });
            return;
        }

      const id = Number(req.params.id);
      
      const {title, completed} = req.body;

      const updateData = {
        ...(title && { title }),
        ...(completed && { completed: completed as TaskStatus }),
      };

      const result = await TaskProvider.updateById(id, updateData);

      
    if (!result) {
        res.status(StatusCodes.NOT_FOUND).json({
          errors: { default: "Tarefa não encontrada" }
        });
        return;
      }
  
  
      if (result instanceof Error) {
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
              errors: {
                default: result.message
              }
          });
          return;
      }
      
      res.status(StatusCodes.OK).json({
        message: "Tarefa atualizada com sucesso!",
        task: result,
      });
    } catch (err) {
      console.error(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          errors: {
            default: "Erro ao atualizar tarefa!"
          }
      });
    }
  };
  

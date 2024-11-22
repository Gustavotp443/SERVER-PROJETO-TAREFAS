import { Request, Response } from "express";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";
import { ITask } from "../../database/models";
import { TaskProvider } from "../../database/providers/tasks";
import { validation } from "../../shared/middleware";

interface IBodyProps extends Omit<ITask, "id" | "createdAt"> {}

//MIDDLEWARE DE VALIDAÇÃO DOS DADOS
export const createValidation = validation((getSchema)=>({
    body: getSchema<IBodyProps>(
        yup.object().shape({
            title:yup.string().required("O título é obrigatório").max(255, "O título deve ter no máximo 255 caracteres").required("O titulo é obrigatório"),
            completed:yup.string().oneOf(["PENDING", "COMPLETED"], "Status inválido").required("O status é obrigatório"),
        })
    )
}))

export const create = async (
    req: Request<{}, {}, IBodyProps>,
    res: Response
  ): Promise<void> => {  
    try {
      const result = await TaskProvider.create(req.body);
  
      if (result instanceof Error) {
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
              errors: {
                default: result.message
              }
          });
          return;
      }
      
      res.status(StatusCodes.CREATED).json({ message: 'Tarefa criada com sucesso!' });
    } catch (err) {
      console.error(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          errors: {
            default: "Erro ao criar tarefa!"
          }
      });
    }
  };
  
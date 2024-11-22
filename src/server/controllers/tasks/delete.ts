import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { TaskProvider } from "../../database/providers/tasks";
import { validation } from "../../shared/middleware";
import * as yup from "yup";


interface IParamProps{
    id?:number;
}


//Middleware de validação
export const deleteByIdValidation = validation((getSchema) => ({
    params: getSchema<IParamProps>(
      yup.object().shape({
        id: yup.number().integer().required().moreThan(0)
      })
    )
}));
  

export const deleteById= async (req: Request<IParamProps>, res: Response): Promise<void> => {
    if (!req.params.id) {
        res.status(StatusCodes.BAD_REQUEST).json({
          errors: {
            default: "ID não informado"
          }
        });
        return;
      }
  
  const id = Number(req.params.id);

  try {
    const result = await TaskProvider.deleteById(id);

    if (!result) {
      res.status(StatusCodes.NOT_FOUND).json({
        errors: { default: "Tarefa não encontrada" }
      });
      return;
    }

    res.status(StatusCodes.OK).json({
      message: "Tarefa deletada com sucesso",
      result
    });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: "Erro ao deletar tarefa" }
    });
    return;
  }
};
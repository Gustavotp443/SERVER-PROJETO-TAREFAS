import { Request, Response } from "express";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";
import { TaskProvider } from "../../database/providers/tasks";
import { validation } from "../../shared/middleware";

interface IQueryProps {
    id?: number;
    page?: number;
    limit?: number;
    filter?: string;
  }

//MIDDLEWARE DE VALIDAÇÃO DOS DADOS
export const getAllValidation = validation((getSchema)=>({
    body: getSchema<IQueryProps>(
        yup.object().shape({
            page: yup.number().optional().moreThan(0),
            limit: yup.number().optional().moreThan(0),
            id: yup.number().integer().optional().default(0),
            filter: yup.string().optional()
        })
    )
}))

export const getAll = async (
    req: Request<{}, {}, {}, IQueryProps>,
    res: Response
  ): Promise<void> => {  
    try {

    const result = await TaskProvider.getAll({ 
        page: Number(req.query.page) || 1,
        limit: Number(req.query.limit) || 20,
        filter: req.query.filter || ""
    });

    const count = await TaskProvider.count(req.query.filter);

      
    if (result instanceof Error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
            default: result.message
            }
        });
        return;
    } else if (count instanceof Error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          errors: { default: count.message },
        });
        return;
    }
    
      res.setHeader("x-total-count", count);
      res.setHeader("access-control-expose-headers", "x-total-count");
      res.status(StatusCodes.OK).json(result);
    } catch (err) {
      console.error(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          errors: {
            default: "Erro ao buscar tarefas!"
          }
      });
    }
  };
  
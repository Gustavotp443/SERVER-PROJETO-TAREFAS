import { Router } from "express";
import { TaskController } from "../controllers/tasks";

const router = Router();

router.get("/", (_, res) => {
    res.send("Olá bem vindo!");
});

//Task
router.post("/tasks",
    TaskController.createValidation,
    TaskController.create
)

router.get("/tasks",
    TaskController.getAllValidation,
    TaskController.getAll
)

router.put("/tasks/:id",
    TaskController.updateValidation,
    TaskController.updateById
)

router.delete("/tasks/:id",
    TaskController.deleteByIdValidation,
    TaskController.deleteById
)

export {router}
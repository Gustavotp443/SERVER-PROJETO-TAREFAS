import * as create from "./create";
import * as getAll from "./getAll";
import * as updateById from "./update";
import * as deleteById from "./delete";

export const TaskController = {
  ...create,
  ...getAll,
  ...updateById,
  ...deleteById
};
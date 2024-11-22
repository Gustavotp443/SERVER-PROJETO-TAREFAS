import * as create from "./create";
import * as getAll from "./getAll";
import * as count from "./getAll";
import * as update from "./update";
import * as deleteById from "./delete";


export const TaskProvider = {
    ...create,
    ...getAll,
    ...count,
    ...update,
    ...deleteById
}
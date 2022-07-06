import { Schema, model } from "mongoose";
import { ITask } from "../interfaces/ITask.interface";

const task = new Schema<ITask>({
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
});

const Task = model<ITask>("Task", task);
export { Task };

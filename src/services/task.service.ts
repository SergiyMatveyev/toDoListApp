import { Task } from "../models/task.model";

export class TaskService {
  static async findAllTasks(): Promise<object> {
    return await Task.find();
  }

  static async addTask(body: object): Promise<object> {
    return await Task.create(body);
  }

  static async removeAllTasks(): Promise<object> {
    return await Task.deleteMany();
  }

  static async findTaskById(id: string): Promise<object | null> {
    return await Task.findById(id);
  }

  static async updateTaskById(id: string, body: any): Promise<object | null> {
    return await Task.findOneAndUpdate(
      { _id: id },
      { $set: body },
      { new: true }
    );
  }

  static async removeTaskById(id: string): Promise<object | null> {
    return await Task.findByIdAndRemove(id);
  }
}

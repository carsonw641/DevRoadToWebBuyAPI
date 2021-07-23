import ToolModel from "../schema/tool.schema";
import Handler from "./handler";
import { Tool } from "../interfaces/tool";

class ToolHandler extends Handler {
  private tool: ToolModel;
  constructor() {
    super();

    this.tool = new ToolModel();
  }
  public async create(data: Tool): Promise<any> {
    return new Promise<any>((resolve: any, reject: any) => {
      this.tool
        .create(data)
        .then((results: any) => resolve(results))
        .catch((err: any) => reject(err));
    });
  }

  public async update(data: Tool): Promise<any> {
    return new Promise<any>((resolve: any, reject: any) => {
      this.tool
        .update(data)
        .then((results: any) => resolve(results))
        .catch((err: any) => reject(err));
    });
  }

  public async get(data: Tool): Promise<any> {
    return new Promise<any>((resolve: any, reject: any) => {
      this.tool
        .find(data)
        .then((results: any) => resolve(results))
        .catch((err: any) => reject(err));
    });
  }

  public async delete(data: Tool): Promise<any> {
    return new Promise<any>((resolve: any, reject: any) => {
      this.tool
        .deleteOne(data)
        .then((results: any) => resolve(results))
        .catch((err: any) => reject(err));
    });
  }
}

export default ToolHandler;

import ToolModel from "../schema/tool.schema";
import Handler from "./handler";

class ToolHandler extends Handler {
  constructor() {
    super();
  }

  public async create(data: any): Promise<any> {
    return new Promise<any>(async (resolve: any, reject: any) => {
      try {
        const results: any = await ToolModel.create(data);
        resolve(results);
      } catch (e) {
        reject(e)
      }
    });
  }

  public async update(data: any): Promise<any> {
    return new Promise<any>(async (resolve: any, reject: any) => {
      try {
        const results: any = await ToolModel.updateOne(data);
        resolve(results);
      } catch (e) {
        reject(e)
      }
    });
  }

  public async get(data: any): Promise<any> {
    return new Promise<any>(async (resolve: any, reject: any) => {
      try {
        const results: any = await ToolModel.find(data);
        resolve(results);
      } catch (e) {
        reject(e)
      }
    });
  }

  public async delete(data: any): Promise<any> {
    return new Promise<any>(async (resolve: any, reject: any) => {
      try {
        const results: any = await ToolModel.deleteOne(data);
        resolve(results);
      } catch (e) {
        reject(e)
      }
    });
  }
}

export default ToolHandler;

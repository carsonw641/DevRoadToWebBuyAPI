import DBConnection from "../utils/db";

abstract class Handler {
  private dbConnection: DBConnection;

  constructor() {
    this.dbConnection = DBConnection.Instance;
  }

  abstract create(data: any): Promise<any>;

  abstract update(data: any): Promise<any>;

  abstract get(data: any): Promise<any>;

  abstract delete(data: any): Promise<any>;
}

export default Handler;

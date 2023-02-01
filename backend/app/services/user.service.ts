import { BaseService } from "./base.service";
import conn from "../configs/connect.db";
export class UserService extends BaseService<any> {
  constructor() {
    super();
    this.setModel(conn.user);
  }

  public async getUserByUsername(username: string) {
    return await this.model.findUnique({
      where: {
        username,
      },
    });
  }

  public async updateUserRefreshToken(username: string, refreshToken: string) {
    return await this.model.update({
      where: {
        username,
      },
      data: {
        refreshToken,
      },
    });
  }
}

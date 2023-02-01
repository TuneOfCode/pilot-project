import { JWT } from "../constants/auth.constant";
import IUser from "../services/interfaces/user.interface";
import { UserService } from "../services/user.service";
import { comparePassword, generateToken, verifyToken } from "../utils";

class UserController {
  private readonly userService: UserService;
  constructor() {
    this.userService = new UserService();
  }

  login = async (req: any, res: any) => {
    const { username, password } = req.body;
    const userService = new UserService();
    try {
      const userItem: IUser = await userService.getUserByUsername(username);
      if (!userItem) {
        return res.errors(null, "Username didn't exist", 400);
      }
      const isMatchPassword = await comparePassword(
        password,
        userItem.password
      );
      if (!isMatchPassword) {
        return res.errors(null, "Password is incorrect", 400);
      }
      const payload = {
        username: userItem.username,
        role: userItem.role,
      };
      const accessToken = generateToken(
        payload,
        JWT.SECRET_ACCESS_TOKEN,
        JWT.EXPIRES_IN_ACCESS_TOKEN
      );
      const refreshToken = generateToken(
        payload,
        JWT.SECRET_REFRESH_TOKEN,
        JWT.EXPIRES_IN_REFRESH_TOKEN
      );
      await userService.updateUserRefreshToken(userItem.username, refreshToken);
      return res.success({ accessToken, refreshToken }, "Login successfully");
    } catch (error) {
      return res.errors(error, "Login failed", 500);
    }
  };

  refreshToken = async (req: any, res: any) => {
    try {
      const refreshTokenClient = req.body.refreshToken;
      if (!refreshTokenClient) {
        return res.errors(null, "Missing refresh token", 400);
      }
      const decoded: any = verifyToken(
        refreshTokenClient,
        JWT.SECRET_REFRESH_TOKEN
      );
      const payload = {
        username: decoded.username,
        role: decoded.role,
      };
      console.log("===> decoded::: ", decoded);

      if (!decoded) {
        return res.errors(null, "Invalid token", 400);
      }
      const accessToken = generateToken(
        payload,
        JWT.SECRET_ACCESS_TOKEN,
        JWT.EXPIRES_IN_ACCESS_TOKEN
      );
      const refreshToken = generateToken(
        payload,
        JWT.SECRET_REFRESH_TOKEN,
        JWT.EXPIRES_IN_REFRESH_TOKEN
      );
      await new UserService().updateUserRefreshToken(
        decoded?.username,
        refreshToken
      );
      return res.success(
        { accessToken, refreshToken },
        "Get refresh token successfully"
      );
    } catch (error) {
      console.log("===> error::: ", error);

      return res.errors(error);
    }
  };
}

export default new UserController();

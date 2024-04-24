import User from "../../database/models/user"


interface IUserCreate {
  name: string,
  password: string,
}

async function registerUserService(newUserInfo: IUserCreate) {
  try {
    const newUser = await User.create(newUserInfo);
    return newUser;
  } catch (error:any) {
    console.log(error)
  }
}

export default registerUserService;
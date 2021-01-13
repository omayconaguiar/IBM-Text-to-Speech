import { userRepository } from '../repo/userRepository';
import { IUser } from '../interfaces/IUser';

export default class user implements user {
  private _userRepository: userRepository;

  constructor() {
    this._userRepository = new userRepository();
  }

  async createCall(input: IUser): Promise<any> {
    return await this._userRepository.createCall(input);
  }

  async getCall(input: IUser): Promise<any> {
    return await this._userRepository.getCall(input);
  }
}

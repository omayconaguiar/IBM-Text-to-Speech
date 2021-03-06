import { Service, Inject } from 'typedi';
import { IComment, CommentInteface } from '../interfaces/IComment';
import commentModel from '../business/comment';

@Service()
export default class commentService extends CommentInteface {
  private _controller: commentModel

  constructor(
    @Inject('logger') private logger: any
  ) {
    super();
    this._controller = new commentModel();
  }


  public async createComment(input: IComment): Promise<any> {
    try {
      this.logger.silly('Calling createCommentSchema');
      return await this._controller.createComment(input);
    }
    catch (e) {
      return Promise.reject(e);
    }
  }

  public async getAll(input: IComment): Promise<any> {
    try {
      this.logger.silly('Calling getAllSchema');
      return await this._controller.getAll(input);
    }
    catch (e) {
      return Promise.reject(e);
    }
  }


  public getById = async (input: IComment): Promise<any> => {
    try {
      this.logger.silly('Calling getByIdSchema');
      return await this._controller.getById(input);
    }
    catch (e) {
      return Promise.reject(e);
    }
  }

  public async updateById(input: IComment): Promise<any> {
    try {
      this.logger.silly('Calling updateByIdSchema');
      return await this._controller.updateById(input);
    }
    catch (e) {
      return Promise.reject(e);
    }
  }


  public async getPage(input: IComment): Promise<any> {
    try {
      return await (input);
    }
    catch (e) {
      return Promise.reject(e);
    }
  }
}



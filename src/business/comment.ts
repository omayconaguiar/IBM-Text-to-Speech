import { commentRepository } from "../repo/commentRepository";
import { IComment  } from '../interfaces/IComment';

export default class comment implements comment {
    private _commentRepository: commentRepository

    constructor() {
        this._commentRepository = new commentRepository();
    }

    async createComment(input: IComment): Promise<any> {
        return await this._commentRepository.createComment(input);
    }

    async getAll(input: IComment): Promise<any> {
        return await this._commentRepository.getAll(input);
    }

    async getById(input: IComment): Promise<any> {
        return await this._commentRepository.getById(input);
    }
}
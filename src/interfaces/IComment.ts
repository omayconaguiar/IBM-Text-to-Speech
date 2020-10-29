export abstract class CommentInteface {
    abstract getById: (input: IComment) => Promise<{ message: string, erros: any[] }>;
}

export interface IComment {
    text: any
    id: any
}


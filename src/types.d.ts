export interface IQuote {
    text: string,
    author: string,
    id?: string,
}

export interface INewQuote {
    text: string,
    author: string,
    id?: string,
    category: string,
}

export type TNewQuote = Omit<INewQuote, 'id'>

export interface IApiQuote {
    [id: string]: IQuote,
}
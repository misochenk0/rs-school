export interface ArticlesInterface {
    status: string,
    totalResults: number,
    articles?: SingleArticle[]
}

export interface SingleArticle {
    author: string,
    content: string,
    description: string,
    publishedAt: string,
    title: string,
    url: string,
    urlToImage?: string,
    source: {
        id: string,
        name: string,
    }
}

export interface SourcesInterface {
    status: string,
    sources?: SingleSource[]
}

export interface SingleSource {
    category: string,
    country: string,
    description: string,
    id: string,
    language: string,
    name: string,
    url: string,
}
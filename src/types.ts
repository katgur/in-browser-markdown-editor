export interface Markdown {
    id: string,
    name: string,
    content: string,
    date: string,
}

export interface MarkdownApi {
    getMarkdowns: () => Promise<Markdown[]>,
    addMarkdown: () => Promise<Markdown[]>,
    editMarkdown: (id: string, markdown: Markdown) => Promise<Markdown[]>,
    removeMarkdown: (id: string) => Promise<Markdown[]>,
}
import { Markdown, MarkdownApi } from "../types"
import { createNew, getDate } from "../util/sample";
import { v4 as uuid } from 'uuid';

const delay = (fn: () => void) => {
    return new Promise(resolve => setTimeout(() => resolve(fn()), 1000));
}

const KEY = "ibme-markdowns";

const setItems = (items: Markdown[]) => {
    localStorage.setItem(KEY, JSON.stringify(items));
}

const getItems = () => {
    const items = localStorage.getItem(KEY);
    if (!items) {
        const welcome = [createNew()];
        setItems(welcome);
        return welcome;
    }
    const parsed = JSON.parse(items);
    if (parsed.length === 0) {
        const welcome = [createNew()];
        setItems(welcome);
        return welcome;
    }
    return parsed as Markdown[];
}

const localApi: MarkdownApi = {
    getMarkdowns: async () => {
        return getItems();
    },
    addMarkdown: async () => {
        const items = getItems();
        const newItems = [...items, { name: "New Document", date: getDate(), content: "", id: uuid() }];
        await delay(() => setItems(newItems));
        return newItems;
    },
    editMarkdown: async (id, markdown) => {
        console.log(id, markdown);
        const items = getItems();
        const newItems = [...items.filter(i => i.id !== id), markdown];
        await delay(() => setItems(newItems));
        return newItems;
    },
    removeMarkdown: async (id) => {
        const items = getItems();
        const newItems = [...items.filter(i => i.id !== id)];
        await delay(() => setItems(newItems));
        return newItems;
    }
}

export default localApi


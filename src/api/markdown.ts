import { Markdown, MarkdownApi } from "../types"
import { createNew, getDate } from "../utils/sample";
import { v4 as uuid } from 'uuid';

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
        setItems(newItems);
        return newItems;
    },
    editMarkdown: async (id, markdown) => {
        const items = getItems();
        const index = items.findIndex((item) => item.id === id);
        items[index] = markdown;
        setItems(items);
        return items;
    },
    removeMarkdown: async (id) => {
        const items = getItems();
        const newItems = items.filter(item => item.id !== id);
        setItems(newItems);
        return newItems;
    }
}

export default localApi


import { create } from 'zustand'
import { Markdown } from './types'
import { content } from './data/sample'
import { v4 as uuid } from 'uuid';

interface MarkdownState {
  items: Markdown[],
  add: () => void,
  remove: (id: string) => void,
  current: Markdown,
  setCurrent: (id: string) => void,
  setName: (name: string) => void,
  currentContent: string,
  setContent: (content: string) => void,
}

const getDate = () => {
  const newDateObject = new Date();
  return [
    newDateObject.toLocaleString("default", {
      day: "numeric",
    }),
    newDateObject.toLocaleString("default", {
      month: "long",
    }),
    newDateObject.toLocaleString("default", {
      year: "numeric",
    })
  ].join(" ");
}

const items = [{ name: "New Document", date: getDate(), content: content, id: uuid() }];

export const useMarkdownStore = create<MarkdownState>()((set) => ({
  items: items,
  current: items[0],
  currentContent: items[0].content,
  add: () => set(state => ({
    items: [...state.items,
    { name: "New Document", date: getDate(), content: "", id: uuid() }
    ]
  })),
  remove: (id: string) => set(state => ({ items: [...state.items.filter(m => m.id !== id)] })),
  setCurrent: (id: string) => set(state => ({ current: state.items.find(m => m.id === id) })),
  setName: (name: string) => set(state => ({ items: [...state.items.filter(m => m.id !== state.current.id), { ...state.current, name }] })),
  setContent: (content: string) => set(() => ({ currentContent: content }))
}))
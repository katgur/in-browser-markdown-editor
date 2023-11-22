import { create } from 'zustand'
import { Markdown } from './types'

interface MarkdownState {
  items: Markdown[],
  setItems: (data: Markdown[]) => void,
  current: Markdown | null,
  setCurrent: (markdown: Markdown | null) => void,
}

export const useMarkdownStore = create<MarkdownState>()((set) => (
  {
    items: [],
    setItems: (data) => set(() => ({ items: data })),
    current: null,
    setCurrent: (markdown) => set(() => ({ current: markdown })),
  }
))
import { create } from 'zustand'
import { Markdown } from '../types'

interface MarkdownState {
  items: Markdown[],
  setItems: (items: Markdown[]) => void,
  current: Markdown | null,
  setCurrent: (current: Markdown | null) => void,
}

export const useMarkdownStore = create<MarkdownState>()((set) => (
  {
    items: [],
    setItems: (items) => set(() => ({ items })),
    current: null,
    setCurrent: (current) => set(() => ({ current })),
  }
))
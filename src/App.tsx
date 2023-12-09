import { useEffect, useState } from "react"
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
import styled, { css } from "styled-components";
import { useMarkdownStore } from "./store";
import api from "./api/markdown";

interface AppWrapperProps {
  isLight: boolean,
}

const AppWrapper = styled.div<AppWrapperProps>`
  ${props => props.isLight ? css`
    --bgr-primary: #fff;
    --text-primary: #000;
    --bgr-secondary: #d8d8d8;
    --text-secondary: #949494;
    --bgr-accent: #ff6b15;
    --text-accent: #fff;
  ` :
    css`
    --bgr-primary: #232323;
    --text-primary: #fff;
    --bgr-secondary: #383838;
    --text-secondary: hsl(0, 0%, 50%);
    --bgr-accent: #e15016;
    --text-accent: #fff;
  `}
  height: 100vh;
  background-color: var(--bgr-primary);
  color: var(--text-primary);
  --xxxs: 4px;
  --xxs: 8px;
  --xs: 12px;
  --s: 16px;
  --m: 24px;
  --l: 32px;
  --xl: 48px;
  --xxl: 72px;
  --xxxl: 96px;
`;

function App() {
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false)
  const [isLight, setLight] = useState<boolean>(false);
  const setItems = useMarkdownStore(state => state.setItems);
  const setCurrent = useMarkdownStore(state => state.setCurrent);

  useEffect(() => {
    api.getMarkdowns()
      .then(data => {
        setItems(data);
        if (data.length !== 0) {
          setCurrent(data[0]);
        }
      });
  }, [setCurrent, setItems])

  return (
    <AppWrapper isLight={isLight}>
      <Header isMenuOpen={isMenuOpen} switchMenuOpen={() => setMenuOpen(!isMenuOpen)} />
      <Editor isMenuOpen={isMenuOpen} />
      <Sidebar expanded={isMenuOpen} setLight={setLight} />
    </AppWrapper>
  )
}

export default App

import styled, { css } from "styled-components";
import DocumentIcon from "../../assets/icons/icon-document.svg?react";
import NightIcon from "../../assets/icons/icon-dark-mode.svg?react";
import DayIcon from "../../assets/icons/icon-light-mode.svg?react";
import { useMarkdownStore } from "../../app/store";
import api from "../../api/markdown";
import { setTheme } from "../../utils/theme";

interface SidebarWrapperProps {
  $expanded: boolean;
}

const SidebarWrapper = styled.aside<SidebarWrapperProps>`
  background-color: var(--bgr-primary);
  color: var(--text-primary);
  border-right: 2px solid var(--text-secondary);
  box-sizing: border-box;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding: 2.5em;
  width: fit-content;
  position: fixed;
  top: 0;
  left: 0;
  transform: translateX(-277px);
  transition: transform 0.2s ease-out;
  ${(props) =>
    props.$expanded &&
    css`
      transform: translateX(0);
    `};
`;

const Title = styled.h1`
  font-size: 0.8em;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-weight: normal;
  color: var(--text-secondary);
`;

const NewButton = styled.button`
  background-color: var(--bgr-accent);
  color: var(--text-accent);
  border-radius: var(--xxxs);
  padding: var(--xs) var(--m);
  font-size: 1em;
  line-height: 1em;
  transition: 250ms;
  text-transform: capitalize;
  svg {
    vertical-align: middle;
  }
  &:hover {
    background-color: var(--bgr-accent-hover);
  }
`;

const DocumentList = styled.ul``;

const DocumentItem = styled.li`
  padding: 0.5em 0;
  display: flex;
  align-items: center;
`;

const DocumentItemContent = styled.div``;

const DocumentTitle = styled.h2`
  font-size: 0.8em;
  line-height: 1.2em;
  color: var(--text-secondary);
  font-weight: normal;
`;

const DocumentText = styled.p`
  font-size: 1em;
  cursor: pointer;
  &:hover {
    color: var(--bgr-accent);
  }
`;

const DocumentIconWrapper = styled.i`
  float: left;
  margin-right: 1em;
  display: inline-block;
  vertical-align: middle;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: var(--xxs);
  color: var(--text-secondary);
  margin-top: auto;
`;

const CheckboxSlider = styled.div`
  position: relative;
  width: var(--xl);
  height: var(--m);
  border-radius: var(--m);
  box-sizing: border-box;
  background-color: var(--text-secondary);
  cursor: pointer;

  &:before {
    background-color: var(--text-primary);
    content: "";
    position: absolute;
    width: 1em;
    height: 1em;
    border-radius: 50%;
    top: 0;
    bottom: 0;
    margin-top: auto;
    margin-bottom: auto;
    left: 0.2em;
    transition: 0.2s ease-out;
  }
`;

type MyCheckboxProps = {
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const CheckboxInput = styled.input.attrs<MyCheckboxProps>((props) => ({
  type: "checkbox",
  ...props,
}))`
  display: none;

  &:checked + ${CheckboxSlider} {
    background-color: var(--bgr-accent);
    transition: 0.2s ease-out;

    &:before {
      transition: 0.2s ease-out;
      transform: translateX(24px);
    }
  }
`;

interface SidebarProps {
  expanded: boolean;
  isLight: boolean;
  setLight: (isLight: boolean) => void;
}

function Sidebar({ expanded, isLight, setLight }: SidebarProps) {
  const documents = useMarkdownStore((state) => state.items);
  const setCurrent = useMarkdownStore((state) => state.setCurrent);
  const setItems = useMarkdownStore((state) => state.setItems);

  const onNewButtonClick = () => {
    api.addMarkdown().then((data) => setItems(data));
  };

  return (
    <SidebarWrapper $expanded={expanded}>
      <Title>My documents</Title>
      <NewButton onClick={onNewButtonClick}>+ New Document</NewButton>
      <DocumentList>
        {documents.map((document) => (
          <DocumentItem key={document.id}>
            <DocumentIconWrapper>
              <DocumentIcon />
            </DocumentIconWrapper>
            <DocumentItemContent>
              <DocumentTitle>{document.date}</DocumentTitle>
              <DocumentText onClick={() => setCurrent(document)}>
                {document.name}
              </DocumentText>
            </DocumentItemContent>
          </DocumentItem>
        ))}
      </DocumentList>
      <Label>
        <NightIcon />
        <CheckboxInput
          checked={isLight}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setLight(e.target.checked);
            setTheme(e.target.checked);
          }}
        />
        <CheckboxSlider></CheckboxSlider>
        <DayIcon />
      </Label>
    </SidebarWrapper>
  );
}

export default Sidebar;

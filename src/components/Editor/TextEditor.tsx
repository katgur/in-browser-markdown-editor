import styled from "styled-components";
import ShowIcon from "../../assets/icons/icon-show-preview.svg?react";
import { useMarkdownStore } from "../../app/store";
import useDebounce from "../../hooks/useDebounce";
import { Markdown } from "../../types";

const TextEditorWrapper = styled.div`
  flex: 1;
`;

const Title = styled.h2`
  padding: var(--s);
  font-size: var(--s);
  line-height: 1em;
  letter-spacing: 0.2em;
  color: var(--text-secondary);
  background-color: var(--bgr-secondary);
  font-weight: normal;
  text-transform: uppercase;
  display: flex;
  justify-content: space-between;
`;

const TextEditorArea = styled.textarea`
  display: block;
  font-family: "Roboto Mono", monospace;
  font-size: 0.9em;
  overflow-wrap: normal;
  background-color: var(--bgr-primary);
  color: var(--text-primary);
  height: calc(100% - 60px);
  width: calc(100% - 24px);
  padding: 6px 12px;
`;

interface TextEditorProps {
  markdown: Markdown;
  isPreviewVisible: boolean;
  showPreview: () => void;
}

function TextEditor({
  isPreviewVisible,
  showPreview,
  markdown,
}: TextEditorProps) {
  const setCurrent = useMarkdownStore((state) => state.setCurrent);
  const onChangeDebounced = useDebounce(
    (content: string) => markdown && setCurrent({ ...markdown, content })
  );

  return (
    <TextEditorWrapper>
      <Title>
        Markdown
        {!isPreviewVisible && <ShowIcon onClick={showPreview} />}
      </Title>
      {markdown && (
        <TextEditorArea
          key={markdown.id}
          defaultValue={markdown.content}
          onChange={(e) => onChangeDebounced(e.target.value)}
        />
      )}
    </TextEditorWrapper>
  );
}

export default TextEditor;

import styled from "styled-components";
import ShowIcon from "../../assets/icon-show-preview.svg?react"
import { useMarkdownStore } from "../../store";

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
    font-family: 'Roboto Mono', monospace;
    font-size: 0.9em;
    overflow-wrap: normal;
    background-color: var(--bgr-primary);
    color: var(--text-primary);
    height: calc(100% - 60px);
    width: calc(100% - 24px);
    padding: 6px 12px;
`;

interface TextEditorProps {
    isPreviewVisible: boolean,
    showPreview: () => void,
}

function TextEditor({ isPreviewVisible, showPreview }: TextEditorProps) {
    const current = useMarkdownStore(state => state.current);
    const setCurrent = useMarkdownStore(state => state.setCurrent);

    return (
        <TextEditorWrapper>
            <Title>
                Markdown
                {
                    !isPreviewVisible &&
                    <ShowIcon onClick={showPreview} />
                }
            </Title>
            {
                current &&
                <TextEditorArea value={current.content} onChange={(e) => setCurrent({ ...current, content: e.target.value })} />
            }
        </TextEditorWrapper>
    )
}

export default TextEditor
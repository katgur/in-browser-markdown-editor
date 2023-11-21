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
    font-family: monospace;
    font-size: 1.5em;
    overflow-wrap: normal;
    background-color: var(--bgr-primary);
    color: var(--text-primary);
    height: calc(100% - 48px);
    width: 100%;
`;

interface TextEditorProps {
    isPreviewVisible: boolean,
    showPreview: () => void,
}

function TextEditor({ isPreviewVisible, showPreview }: TextEditorProps) {
    const currentContent = useMarkdownStore(state => state.currentContent);
    const setContent = useMarkdownStore(state => state.setContent);

    console.log(currentContent);
    return (
        <TextEditorWrapper>
            <Title>
                Markdown
                {
                    !isPreviewVisible && 
                    <ShowIcon onClick={showPreview} />
                }
            </Title>
            <TextEditorArea value={currentContent} onChange={(e) => setContent(e.target.value)} />
        </TextEditorWrapper>
    )
}

export default TextEditor
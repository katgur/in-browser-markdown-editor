import styled from "styled-components";
import ShowIcon from "../../assets/icon-show-preview.svg?react"

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
    background-color: black;
    color: var(--text-primary);
    height: calc(100% - 48px);
    width: 100%;
`;

interface TextEditorProps {
    setText: (text: string) => void,
    isPreviewVisible: boolean,
    showPreview: () => void,
}

function TextEditor({ setText, isPreviewVisible, showPreview }: TextEditorProps) {
    return (
        <TextEditorWrapper>
            <Title>
                Markdown
                {
                    !isPreviewVisible && 
                    <ShowIcon onClick={showPreview} />
                }
            </Title>
            <TextEditorArea onChange={(e) => setText(e.target.value)} />
        </TextEditorWrapper>
    )
}

export default TextEditor
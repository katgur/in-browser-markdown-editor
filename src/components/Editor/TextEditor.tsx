import styled from "styled-components";

const Title = styled.h2`
    padding: var(--s);
    font-size: var(--s);
    line-height: 1em;
    letter-spacing: 0.2em;
    color: var(--text-secondary);
    background-color: var(--bgr-secondary);
    font-weight: normal;
    text-transform: uppercase;
`;

const TextEditorWrapper = styled.textarea`
    display: block;
    font-family: monospace;
    font-size: 1.5em;
    overflow-wrap: normal;
    background-color: black;
    color: var(--text-primary);
    height: 100%;
    width: calc(100% - 40px);
    overflow-x: hidden;
    flex: 1;
    flex-basis: 100%;
`;

interface TextEditorProps {
    setText: (text: string) => void,
}

function TextEditor({ setText }: TextEditorProps) {
    return (
        <TextEditorWrapper onChange={(e) => setText(e.target.value)}></TextEditorWrapper>
    )
}

export default TextEditor
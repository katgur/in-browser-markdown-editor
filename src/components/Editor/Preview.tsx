import styled from "styled-components";
import Markdown from "markdown-to-jsx";

const MarkdownContainer = styled.div`
    display: block;
    font-family: monospace;
    overflow-wrap: normal;
    background-color: black;
    color: var(--text-primary);
    height: 100%;
    width: 100%;
    overflow-y: auto;
    flex: 1;
    flex-basis: 100%;
`;

interface PreviewProps {
    text: string,
}

function Preview({ text }: PreviewProps) {
    return (
        <MarkdownContainer>
            <Markdown>{text}</Markdown>
        </MarkdownContainer>
    )
}

export default Preview
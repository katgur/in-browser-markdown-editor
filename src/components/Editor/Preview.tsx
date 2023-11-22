import styled from "styled-components";
import Markdown from "markdown-to-jsx";
import HideIcon from "../../assets/icon-hide-preview.svg?react"
import { useMarkdownStore } from "../../store";

const PreviewWrapper = styled.div`
    flex: 1;
    border-left: 2px solid var(--text-secondary);
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

const MarkdownContainer = styled.div`
    display: block;
    font-family: monospace;
    overflow-wrap: normal;
    background-color: var(--bgr-primary);
    color: var(--text-primary);
    height: calc(100% - 48px);
    width: 100%;
    overflow: auto;
`;

interface PreviewProps {
    hidePreview: () => void,
}

function Preview({ hidePreview }: PreviewProps) {
    const current = useMarkdownStore(state => state.current);

    return (
        <PreviewWrapper>
            <Title>
                Markdown
                <HideIcon onClick={hidePreview} />
            </Title>
            <MarkdownContainer>
                {
                    current &&
                    <Markdown>{current.content}</Markdown>
                }
            </MarkdownContainer>
        </PreviewWrapper>
    )
}

export default Preview
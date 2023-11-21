import styled from "styled-components";
import TextEditor from "./TextEditor";
import Preview from "./Preview";
import { useState } from "react";

const TitleWrapper = styled.div`
    display: flex;
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
    flex: 1;
`;

const EditorWrapper = styled.div`
    display: flex;
    width: 100%;
    height: calc(100% - 72px - 48px);
    position: fixed;
`;

function Editor() {
    const [text, setText] = useState<string>("");

    return (
        <div>
            <TitleWrapper>
                <Title>Markdown</Title>
                <Title>Preview</Title>
            </TitleWrapper>
            <EditorWrapper>
                <TextEditor setText={setText} />
                <Preview text={text} />
            </EditorWrapper>
        </div>
    )
}

export default Editor
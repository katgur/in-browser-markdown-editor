import styled from "styled-components";
import TextEditor from "./TextEditor";
import Preview from "./Preview";
import { useState } from "react";
import HideIcon from "../../assets/icon-hide-preview.svg?react"
import ShowIcon from "../../assets/icon-show-preview.svg?react"

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
    display: flex;
    justify-content: space-between;

    &:first-child {
        border-right: 2px solid var(--text-secondary);
    }
`;

const EditorWrapper = styled.div`
    display: flex;
    width: 100%;
    height: calc(100% - 72px - 48px);
    position: fixed;
`;

function Editor() {
    const [text, setText] = useState<string>("");
    const [isPreviewShown, setPreviewShown] = useState<boolean>(true);

    return (
        <div>
            <TitleWrapper>
                <Title>
                    Markdown
                    {
                        !isPreviewShown && <ShowIcon onClick={() => setPreviewShown(true)} />
                    }
                </Title>
                {
                    isPreviewShown && <Title>
                        Preview
                        <HideIcon onClick={() => setPreviewShown(false)} />
                    </Title>
                }
            </TitleWrapper>
            <EditorWrapper>
                <TextEditor setText={setText} />
                {
                    isPreviewShown &&
                    <Preview text={text} />
                }
            </EditorWrapper>
        </div>
    )
}

export default Editor
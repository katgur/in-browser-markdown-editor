import styled, { css } from "styled-components";
import TextEditor from "./TextEditor";
import Preview from "./Preview";
import { useState } from "react";
import { useMarkdownStore } from "../../store";

const EditorWrapper = styled.div`
    width: 100%;
    display: flex;
    position: fixed;
    transform: translateX(0);
    transition: transform .2s ease-out;
    ${props => props.$isMenuOpen && css`
        transform: translateX(250px);
    `};
    height: calc(100% - 72px);
`;

interface EditorProps {
    isMenuOpen: boolean,
}

function Editor({ isMenuOpen }: EditorProps) {
    const [isPreviewShown, setPreviewShown] = useState<boolean>(true);

    return (
        <EditorWrapper $isMenuOpen={isMenuOpen}>
            <TextEditor isPreviewVisible={isPreviewShown} showPreview={() => setPreviewShown(true)} />
            {
                isPreviewShown &&
                <Preview hidePreview={() => setPreviewShown(false)} />
            }
        </EditorWrapper>
    )
}

export default Editor
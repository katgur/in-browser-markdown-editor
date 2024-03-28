import styled, { css } from "styled-components";
import TextEditor from "./TextEditor";
import Preview from "./Preview";
import { useState } from "react";
import { useMarkdownStore } from "../../app/store";

interface EditorWrapperProps {
    $isMenuOpen: boolean,
}

const EditorWrapper = styled.div<EditorWrapperProps>`
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
    const current = useMarkdownStore((state) => state.current);

    if (!current) {
        return;
    }

    return (
        <EditorWrapper $isMenuOpen={isMenuOpen}>
            <TextEditor markdown={current} isPreviewVisible={isPreviewShown} showPreview={() => setPreviewShown(true)} />
            {
                isPreviewShown &&
                <Preview markdown={current} hidePreview={() => setPreviewShown(false)} />
            }
        </EditorWrapper>
    )
}

export default Editor
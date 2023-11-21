import styled from "styled-components";
import BurgerIcon from "../../assets/icon-menu.svg?react";
import Logo from "../../assets/logo.svg?react";
import DocumentIcon from "../../assets/icon-document.svg?react";
import DeleteIcon from "../../assets/icon-delete.svg?react";
import SaveIcon from "../../assets/icon-save.svg?react";

const HeaderWrapper = styled.header`
    display: flex;
    align-items: center;
    height: var(--xxl);
    &>* {
        margin-right: 1.5em;
    }
`;

const MenuButton = styled.button`
    background-color: var(--bgr-secondary);
    color: var(--text-secondary);
    padding-left: var(--m);
    padding-right: var(--m);
    height: 100%;
    &:hover {
        background-color: var(--bgr-accent);
        color: var(--text-accent);
        transition: all 0.1s ease-out allow-discrete;
    }
`;

const DeleteButton = styled.button`
    background-color: var(--bgr-primary);
    color: var(--text-primary);
    height: 100%;
    margin-left: auto;
    &:hover {
        color: var(--bgr-accent);
        transition: all 0.1s ease-out allow-discrete;
    }
`;

const SaveButton = styled.button`
    background-color: var(--bgr-accent);
    color: var(--text-accent);
    border-radius: var(--xxxs);
    padding: var(--xs) var(--m);
    font-size: 1em;
    line-height: 1em;
`;

const SaveText = styled.span`
    margin-left: 0.5em;
`;

const DocumentSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: var(--xxs);
`;

const DocumentHeader = styled.h2`
    font-size: 0.7em;
    line-height: 0.7em;
    color: var(--text-secondary);
`;

const DocumentInput = styled.input`
    
`;

const Divider = styled.div`
    width: 1px;
    height: 60%;
    background-color: var(--text-secondary);
`;

function Header() {
    return (
        <HeaderWrapper>
            <MenuButton>
                <BurgerIcon />
            </MenuButton>
            <Logo />
            <Divider />
            <DocumentIcon />
            <DocumentSection>
                <DocumentHeader>
                    Document Name:
                </DocumentHeader>
                <DocumentInput />
            </DocumentSection>
            <DeleteButton>
                <DeleteIcon />
            </DeleteButton>
            <SaveButton>
                <SaveIcon />
                <SaveText>
                    Save Changes
                </SaveText>
            </SaveButton>
        </HeaderWrapper>
    )
}

export default Header
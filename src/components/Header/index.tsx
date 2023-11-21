import styled, { css } from "styled-components";
import BurgerIcon from "../../assets/icon-menu.svg?react";
import Logo from "../../assets/logo.svg?react";
import DocumentIcon from "../../assets/icon-document.svg?react";
import DeleteIcon from "../../assets/icon-delete.svg?react";
import SaveIcon from "../../assets/icon-save.svg?react";
import { useState } from "react";
import { useMarkdownStore } from "../../store";

const HeaderWrapper = styled.header`
    display: flex;
    align-items: center;
    height: var(--xxl);
    &>* {
        margin-right: 1.2em;
    }
    transform: translateX(0);
    transition: transform .2s ease-out;
    ${props => props.$isMenuOpen && css`
        transform: translateX(250px);
    `};
`;

const MenuButton = styled.button`
    background-color: var(--bgr-primary);
    color: var(--text-primary);
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
        transition: all 0.3s ease-out allow-discrete;
    }
`;

const SaveButton = styled.button`
    background-color: var(--bgr-accent);
    color: var(--text-accent);
    border-radius: var(--xxxs);
    padding: var(--xs) var(--m);
    font-size: 1em;
    line-height: 1em;
    text-transform: capitalize;

    svg {
        vertical-align: middle;
    }
`;

const SaveText = styled.span`
    display: none;

    @media (min-width: 768px) {
        margin-left: 0.5em;
        display: inline-block;
    }
`;

const DocumentSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: var(--xxs);
`;

const DocumentHeader = styled.h2`
    display: none;

    @media (min-width: 768px) {
        display: block;
        font-size: 0.7em;
        line-height: 0.7em;
        color: var(--text-secondary);
    }
`;

const DocumentInput = styled.input`
    width: 90%;
    border-bottom: 1px solid var(--text-secondary);
    padding-bottom: var(--xxxs);
`;

const Divider = styled.div`
    display: none;

    @media (min-width: 768px) {
        display: block;
        width: 1px;
        height: 60%;
        background-color: var(--text-secondary);
    }
`;

const LogoSection = styled.div`
    display: none;

    @media (min-width: 768px) {
        display: block;
    }
`;

interface HeaderProps {
    isMenuOpen: boolean,
    switchMenuOpen: () => void,
}

function Header({ isMenuOpen, switchMenuOpen }: HeaderProps) {
    const [isDocumentInputVisible, setDocumentInputVisible] = useState<boolean>(false);
    const setName = useMarkdownStore(state => state.setName);

    const onChangeNameSubmit = (e) => {
        e.preventDefault();
        setName(e.target.elements.name.value);
    }

    return (
        <HeaderWrapper $isMenuOpen={isMenuOpen}>
            <MenuButton onClick={switchMenuOpen}>
                <BurgerIcon />
            </MenuButton>
            <LogoSection>
                <Logo />
            </LogoSection>
            <Divider />
            <DocumentIcon onClick={() => setDocumentInputVisible(!isDocumentInputVisible)} />
            {isDocumentInputVisible &&
                <DocumentSection>
                    <DocumentHeader>
                        Document Name:
                    </DocumentHeader>
                    <form onSubmit={onChangeNameSubmit}>
                        <DocumentInput name="name" />
                    </form>
                </DocumentSection>
            }
            {
                !isDocumentInputVisible &&
                <DeleteButton>
                    <DeleteIcon />
                </DeleteButton>
            }
            {
                !isDocumentInputVisible &&
                <SaveButton>
                    <SaveIcon />
                    <SaveText>
                        Save Changes
                    </SaveText>
                </SaveButton>
            }
        </HeaderWrapper>
    )
}

export default Header
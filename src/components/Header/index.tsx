import styled, { css } from "styled-components";
import BurgerIcon from "../../assets/icons/icon-menu.svg?react";
import Logo from "../../assets/icons/logo.svg?react";
import DocumentIcon from "../../assets/icons/icon-document.svg?react";
import DeleteIcon from "../../assets/icons/icon-delete.svg?react";
import SaveIcon from "../../assets/icons/icon-save.svg?react";
import React, { useState } from "react";
import { useMarkdownStore } from "../../app/store";
import api from "../../api/markdown";

interface HeaderWrapperProps {
    $isMenuOpen: boolean,
}

const HeaderWrapper = styled.header<HeaderWrapperProps>`
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
    transition: 250ms;
    svg {
        vertical-align: middle;
    }
    &:hover {
        background-color: var(--bgr-accent-hover);
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
    const current = useMarkdownStore(state => state.current);
    const setItems = useMarkdownStore(state => state.setItems);
    const setCurrent = useMarkdownStore(state => state.setCurrent);

    const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (current === null) {
            return;
        }
        setCurrent({ ...current, name: e.target.value });
    }

    const onNameSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!current) {
            return;
        }
        api.editMarkdown(current.id, current)
            .then(data => setItems(data));
    }

    const onSaveButtonClick = () => {
        if (!current) {
            return;
        }
        api.editMarkdown(current.id, current)
            .then(data => setItems(data));
    }

    const onDeleteButtonClick = () => {
        if (!current) {
            return;
        }
        api.removeMarkdown(current.id)
            .then(data => {
                setItems(data);
                if (data.length !== 0) {
                    setCurrent(data[0]);
                } else {
                    setCurrent(null);
                }
            });
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
                        Document Name
                    </DocumentHeader>
                    {
                        current &&
                        <form key={current.id} onSubmit={onNameSubmit}>
                            <DocumentInput name="name" value={current.name} onChange={onChangeName} />
                        </form>
                    }
                </DocumentSection>
            }
            {
                !isDocumentInputVisible &&
                <DeleteButton onClick={onDeleteButtonClick}>
                    <DeleteIcon />
                </DeleteButton>
            }
            {
                !isDocumentInputVisible &&
                <SaveButton onClick={onSaveButtonClick}>
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
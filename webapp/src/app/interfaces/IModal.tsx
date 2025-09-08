import { ReactElement } from "react";

export interface IModal {
    isOpen: boolean,
    setIsOpen: (isOpen: boolean) => void,
    title: string,
    content: ReactElement
}

import {RefObject, useRef, useState} from 'react';
import {Button, Heading, Label, Popover} from '@navikt/ds-react';
import {EndringsloggIkon} from './icons/endringslogg-icon';
import {EndringsloggContent} from './endringslogg-content';
import {EndringsloggEntryWithSeenStatus} from './utils/endringslogg-custom';
import './endringslogg.css';

interface EndringsloggContainerProps {
    content: EndringsloggEntryWithSeenStatus[];
    onOpenPopover: () => void;
    onClosePopover: () => void;
    errorMessage?: string;
}

export const EndringsloggContainer = ({
    content,
    onOpenPopover,
    onClosePopover,
    errorMessage
}: EndringsloggContainerProps) => {
    const [endringsloggApen, setEndringsloggApen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const overordnetNotifikasjon = content.some(element => !element.seen);

    const apneEndringslogg = () => {
        onOpenPopover();
        setEndringsloggApen(true);
    };

    const lukkEndingslogg = () => {
        onClosePopover();
        setEndringsloggApen(false);
    };

    const onButtonClick = () => {
        if (endringsloggApen) {
            lukkEndingslogg();
        } else {
            apneEndringslogg();
        }
    };

    return (
        <div className="endringslogg">
            <EndringsloggIconButton
                onClick={onButtonClick}
                newNotifications={overordnetNotifikasjon}
                buttonRef={buttonRef}
                aria-expanded={endringsloggApen}
            />
            <Popover
                anchorEl={buttonRef.current}
                open={endringsloggApen}
                onClose={lukkEndingslogg}
                placement="bottom-end"
                className="endringslogg-popover"
            >
                <Popover.Content className="endringslogg-popover-content">
                    <Heading size="small" level="1" className="endringslogg-overskrift">
                        Nytt i Arbeidsrettet oppfølging
                    </Heading>
                    <div className="innhold-container">
                        <EndringsloggContent innleggsListe={content} />
                        {errorMessage && <Label>{errorMessage}</Label>}
                    </div>
                </Popover.Content>
            </Popover>
        </div>
    );
};

interface EndringsloggIconButtonProps {
    buttonRef: RefObject<HTMLButtonElement>;
    newNotifications: boolean;
    onClick: (e?: any) => void;
}

const EndringsloggIconButton = ({buttonRef, newNotifications, onClick}: EndringsloggIconButtonProps) => {
    return (
        <Button
            aria-label="Endringslogg for Arbeidsrettet oppfølging"
            ref={buttonRef}
            onClick={onClick}
            variant="tertiary"
            size="small"
        >
            <EndringsloggIkon />
            {newNotifications && (
                <div className="ring-container">
                    <div className="ringring" />
                    <div className="circle" />
                </div>
            )}
        </Button>
    );
};

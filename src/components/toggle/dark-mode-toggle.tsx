import {Switch} from '@navikt/ds-react';
import './dark-mode-toggle.css';

interface DarkModeToggleProps {
    darkmode: boolean;
    setDarkmode: (val: boolean) => void;
}

export function DarkModeToggle({ darkmode, setDarkmode }: DarkModeToggleProps) {
    return (
        <div className="dark-mode-toggle">
            <Switch size="medium" onChange={() => setDarkmode(!darkmode)} checked={darkmode}>
                Slå {darkmode ? ' av ' : ' på '} darkmode
            </Switch>
        </div>
    );
}

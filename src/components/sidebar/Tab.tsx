import {Tabs} from '@navikt/ds-react';
import {SidebarTabs} from '../../store/sidebar/sidebar-view-store';
import {Fanedetaljer} from './sidebar';

interface Props {
    fane: SidebarTabs;
    fanedetaljer: Fanedetaljer;
}

export const Tab = ({fane, fanedetaljer}: Props) => {
    // Only apply 14px font size to the main sidebar tabs
    const tabStyle = {
        fontSize: '14px',
    };
    return (
        <Tabs.Tab
            value={fane}
            label={fanedetaljer.tittel}
            icon={fanedetaljer.icon}
            data-testid={`sidebar-tab_${fane}`}
            style={tabStyle}
        />
    );
};

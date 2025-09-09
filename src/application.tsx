import { Theme, Select } from '@navikt/ds-react';
import { DarkModeToggle } from './components/toggle/dark-mode-toggle';
import React from 'react';
import * as moment from 'moment';
import {BrowserRouter} from 'react-router-dom';
import {Routing} from './routing';
import {Provider} from 'react-redux';
import createStore from './store';
import {Decorator} from './decorator';
import {InitialDataProvider} from './providers/initial-data-provider';
import {RedirectPortefolje} from './redirect-portefolje';
import {erMock} from './utils/url-utils';
import {useBrukeraktivitetTokenRefresh} from './hooks/use-brukeraktivitet-token-refresh';
import {settSesjonStatusGyldig, settSesjonStatusUtlopt} from './ducks/informasjonsmelding';

moment.locale('nb');

moment.updateLocale('nb', {
    monthsShort: ['jan', 'feb', 'mar', 'apr', 'mai', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'des']
});

export const store = createStore();

function Application() {
    useBrukeraktivitetTokenRefresh(
        () => store.dispatch(settSesjonStatusUtlopt()),
        () => store.dispatch(settSesjonStatusGyldig())
    );

    const [font, setFont] = React.useState('Source Sans 3');
    const [darkmode, setDarkmode] = React.useState(() => localStorage.getItem('darkmode') === 'true');
    const [openSansWidth, setOpenSansWidth] = React.useState(100);

    React.useEffect(() => {
        let fontFamily = '';
        let fontVariationSettings = '';
        switch (font) {
            case 'Roboto Flex':
                fontFamily = '"Roboto Flex", Arial, sans-serif';
                break;
            case 'Open Sans':
                fontFamily = '"Open Sans Variable", Arial, sans-serif';
                fontVariationSettings = `'wdth' ${openSansWidth}`;
                break;
            default:
                fontFamily = '"Source Sans 3", Arial, sans-serif';
        }
        document.body.style.fontFamily = fontFamily;
        if (font === 'Open Sans') {
            document.body.style.fontVariationSettings = fontVariationSettings;
        } else {
            document.body.style.fontVariationSettings = '';
        }
    }, [font, openSansWidth]);

    React.useEffect(() => {
        localStorage.setItem('darkmode', darkmode + '');
    }, [darkmode]);

    return (
        <Theme theme={darkmode ? 'dark' : 'light'}>
            <Provider store={store}>
                <div style={{ width: '100%', background: '#f8f8f8', padding: '1rem 0', borderBottom: '1px solid #eee' }}>
                    <Select
                        label="Velg font:"
                        value={font}
                        onChange={e => setFont(e.target.value)}
                        size="small"
                        style={{ width: 'auto', minWidth: 200 }}
                        id="font-select"
                    >
                        <option value="Source Sans 3">Source Sans 3 (nåværende)</option>
                        <option value="Roboto Flex">Roboto Flex</option>
                        <option value="Open Sans">Open Sans</option>
                    </Select>
                    {font === 'Open Sans' && (
                        <div style={{ marginTop: 12, maxWidth: 320 }}>
                            <label htmlFor="open-sans-width-slider" style={{ display: 'block', marginBottom: 4 }}>
                                Bredde (width): {openSansWidth}
                            </label>
                            <input
                                id="open-sans-width-slider"
                                type="range"
                                min={75}
                                max={125}
                                step={1}
                                value={openSansWidth}
                                onChange={e => setOpenSansWidth(Number(e.target.value))}
                                style={{ width: '100%' }}
                            />
                        </div>
                    )}
                </div>
                <BrowserRouter basename={erMock() ? '/veilarbportefoljeflatefs' : '/'}>
                    <InitialDataProvider>
                        <RedirectPortefolje>
                            <Decorator />
                            <Routing darkmode={darkmode} setDarkmode={setDarkmode} />
                        </RedirectPortefolje>
                    </InitialDataProvider>
                </BrowserRouter>
            </Provider>
        </Theme>
    );
}
export default Application;

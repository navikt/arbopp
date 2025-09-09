import {useSelector} from 'react-redux';
import classNames from 'classnames';
import Toasts from '../components/toast/toast';
import {Tabs} from '@navikt/ds-react';
import {useNavigate, useLocation} from 'react-router-dom';
import {AppState} from '../reducer';
import {STATUS} from '../ducks/utils';
import {DarkModeToggle} from '../components/toggle/dark-mode-toggle';
import {useFeatureSelector} from '../hooks/redux/use-feature-selector';
import {ALERTSTRIPE_FEILMELDING, DARKMODE} from '../konstanter';
import {Moteplan} from '../minoversikt/moteplan/moteplan';
import {useEnhetSelector} from '../hooks/redux/use-enhet-selector';
import {useSelectGjeldendeVeileder} from '../hooks/portefolje/use-select-gjeldende-veileder';
import {OversiktType} from '../ducks/ui/listevisning';
import {Endringslogg} from '../components/endringslogg/endringslogg';
import './topp-meny.css';

interface Props {
    erPaloggetVeileder?: boolean;
    oversiktType: OversiktType;
    darkmode: boolean;
    setDarkmode: (val: boolean) => void;
}

export function ToppMeny({erPaloggetVeileder = false, oversiktType, darkmode, setDarkmode}: Props) {
    //VENTER PÅ ATT HENTE PORTEFOLJESTORRELSER FØR ATT VETA OM VI SKA VISA MIN OVERSIKT LENKEN ELLER EJ
    const portefoljestorrelser = useSelector((state: AppState) => state.portefoljestorrelser);
    const innloggetVeileder = useSelector((state: AppState) => state.innloggetVeileder);
    const harDarkModeFeatureToggle = useFeatureSelector()(DARKMODE);
    const erAlertstripeFeilmeldingFeatureTogglePa = useFeatureSelector()(ALERTSTRIPE_FEILMELDING);
    const gjeldendeVeileder = useSelectGjeldendeVeileder();
    const enhet = useEnhetSelector();
    const navigate = useNavigate();
    const location = useLocation();


    if (portefoljestorrelser.status === STATUS.PENDING || portefoljestorrelser.status === STATUS.NOT_STARTED) {
        return null;
    }

    if (innloggetVeileder.status === STATUS.PENDING || innloggetVeileder.status === STATUS.NOT_STARTED) {
        return null;
    }

    // Define tabs and their routes
    const tabs = [
        { label: 'Min oversikt', path: '/portefolje' },
        { label: 'Enhetens oversikt', path: '/enhet' },
        { label: 'Veilederoversikt', path: '/veiledere' }
    ];
    // Find the active tab based on the current path
    const activeTab = tabs.find(tab => location.pathname.startsWith(tab.path))?.path || tabs[0].path;

    return (
        <div className={classNames('topp-meny', erAlertstripeFeilmeldingFeatureTogglePa && 'topp-meny__alertstripe')}>
            <Tabs value={activeTab} onChange={v => navigate(v)}>
                <Tabs.List>
                    {tabs.map(tab => (
                        <Tabs.Tab key={tab.path} value={tab.path} label={tab.label} />
                    ))}
                </Tabs.List>
            </Tabs>
            {harDarkModeFeatureToggle && <DarkModeToggle darkmode={darkmode} setDarkmode={setDarkmode} />}
            <Toasts />
            {oversiktType === OversiktType.minOversikt && enhet && (
                <Moteplan veileder={gjeldendeVeileder} enhet={enhet} />
            )}
            <Endringslogg userId={innloggetVeileder.data?.ident!} />
        </div>
    );
}

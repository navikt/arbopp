import 'moment/locale/nb';
import {Route, Routes} from 'react-router-dom';
import {MinoversiktSide} from './minoversikt/minoversikt-side';
import {EnhetSide} from './enhetsportefolje/enhet-side';
import {VeilederoversiktSide} from './veilederoversikt/veilederoversikt-side';
import React from 'react';
import {useFetchPortefoljeData} from './hooks/portefolje/use-fetch-portefolje-data';
import {Innholdslaster} from './innholdslaster/innholdslaster';
import {TilToppenKnapp} from './components/til-toppen-knapp/til-toppen-knapp';
import './style.css';

export function Routing({ darkmode, setDarkmode }: { darkmode: boolean; setDarkmode: (val: boolean) => void }) {
    const {enhettiltak, veiledere, portefoljestorrelser} = useFetchPortefoljeData();

    return (
        <div className="portefolje">
            <div className="maincontent side-innhold">
                <Innholdslaster avhengigheter={[enhettiltak, veiledere, portefoljestorrelser]}>
                    <Routes>
                        <Route path="/enhet" element={<EnhetSide darkmode={darkmode} setDarkmode={setDarkmode} />} />
                        <Route path="/veiledere" element={<VeilederoversiktSide darkmode={darkmode} setDarkmode={setDarkmode} />} />
                        <Route path="/portefolje/:ident" element={<MinoversiktSide darkmode={darkmode} setDarkmode={setDarkmode} />} />
                        <Route path="/portefolje" element={<MinoversiktSide darkmode={darkmode} setDarkmode={setDarkmode} />} />
                    </Routes>
                    <TilToppenKnapp />
                </Innholdslaster>
            </div>
        </div>
    );
}

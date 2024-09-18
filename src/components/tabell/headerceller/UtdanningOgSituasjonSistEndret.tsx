import {HeadercelleProps} from './HeadercelleProps';
import {Sorteringsfelt} from '../../../model-interfaces';
import {Kolonne} from '../../../ducks/ui/listevisning';
import SorteringHeader from '../sortering-header';

export const UtdanningOgSituasjonSistEndret = ({
    gjeldendeSorteringsfelt,
    valgteKolonner,
    rekkefolge,
    onClick
}: HeadercelleProps) => (
    // TODO: Sjå over titteltekst
    <SorteringHeader
        skalVises={valgteKolonner.includes(Kolonne.UTDANNING_OG_SITUASJON_SIST_ENDRET)}
        sortering={Sorteringsfelt.UTDANNING_OG_SITUASJON_SIST_ENDRET}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.UTDANNING_OG_SITUASJON_SIST_ENDRET}
        rekkefolge={rekkefolge}
        onClick={onClick}
        tekst="Dato sist endret"
        title="Dato for siste endring av utdanning og situasjon"
        headerId="dato-sist-endret-utdanning-og-situasjon"
        className="col col-xs-2"
    />
);

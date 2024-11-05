import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {skjulModal} from '../../../ducks/modal';
import {markerAlleBrukere} from '../../../ducks/portefolje';
import {BrukerModell} from '../../../model-interfaces';
import './arbeidsliste.css';
import {AppState} from '../../../reducer';
import {STATUS} from '../../../ducks/utils';
import {VarselModal, VarselModalType} from '../varselmodal/varselmodal';
import FjernFraArbeidslisteForm from './fjern-fra-arbeidsliste-form';
import {BodyShort, Modal} from '@navikt/ds-react';
import LasterModal from '../lastermodal/laster-modal';

interface ArbeidslisteModalProps {
    isOpen: boolean;
    valgteBrukere: BrukerModell[];
}

const ArbeidslisteModal = ({isOpen, valgteBrukere}: ArbeidslisteModalProps) => {
    const arbeidslisteStatus = useSelector((state: AppState) => state.arbeidsliste.status);

    const statusLaster = arbeidslisteStatus !== undefined && arbeidslisteStatus === STATUS.PENDING;
    const fjerneBrukere = valgteBrukere.some(bruker => bruker.arbeidsliste.arbeidslisteAktiv);
    const brukereSomSkalFjernes = valgteBrukere.filter(bruker => bruker.arbeidsliste.arbeidslisteAktiv);

    const dispatch = useDispatch();
    const [formIsDirty, setFormIsDirty] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(isOpen);

    const lukkModal = () => {
        const dialogTekst = 'Alle endringer blir borte hvis du ikke lagrer. Er du sikker på at du vil lukke siden?';
        if (!formIsDirty || window.confirm(dialogTekst)) {
            setIsModalOpen(false);
            dispatch(skjulModal());
            dispatch(markerAlleBrukere(false));
        }
    };

    return (
        <>
            {statusLaster ? (
                <LasterModal isOpen={statusLaster} />
            ) : (
                <>
                    {fjerneBrukere ? (
                        <VarselModal
                            overskrift="Fjern fra arbeidsliste"
                            isOpen={isModalOpen}
                            onClose={lukkModal}
                            type={VarselModalType.ADVARSEL}
                            dataTestClass="modal_varsel_fjern-fra-arbeidsliste"
                        >
                            <div className="fjern-arbeidsliste">
                                <BodyShort size="small">
                                    {`Du har valgt å fjerne ${brukereSomSkalFjernes.length} ${
                                        brukereSomSkalFjernes.length === 1 ? 'bruker' : 'brukere'
                                    } fra arbeidslisten.`}
                                </BodyShort>
                                <FjernFraArbeidslisteForm valgteBrukere={brukereSomSkalFjernes} lukkModal={lukkModal} />
                            </div>
                        </VarselModal>
                    ) : (
                        <Modal
                            className="arbeidsliste-modal"
                            open={isModalOpen}
                            onClose={lukkModal}
                            closeOnBackdropClick={true}
                            header={{heading: 'Legg i arbeidsliste'}}
                        >
                            (Her var legg-i-arbeidsliste, men no er det sletta.)
                        </Modal>
                    )}
                </>
            )}
        </>
    );
};
export default ArbeidslisteModal;

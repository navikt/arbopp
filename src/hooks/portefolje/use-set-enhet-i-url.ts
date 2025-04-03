import {useEffect} from 'react';
import {useHistory, useLocation} from 'react-router';
import queryString from 'query-string';
import {useEnhetSelector} from '../redux/use-enhet-selector';

export function useSetEnhetIUrl() {
    const enhet = useEnhetSelector();
    const history = useHistory();
    const location = useLocation();

    const pathname = location.pathname;

    useEffect(() => {
        if (enhet) {
            const parsed = queryString.parse(window.location.search);
            parsed.enhet = enhet;
            const stringified = queryString.stringify(parsed);
            history.replace({pathname, search: stringified});
        }
    }, [history, enhet, pathname]);
}

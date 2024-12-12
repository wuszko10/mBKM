import {useTickets} from "./useTickets.tsx";
import {useMetadata} from "./useMetadata.tsx";
import {useStops} from "./useStops.tsx";
import {useLines} from "./useLines.tsx";

export const useAppData = () => {
    const { refreshMetadata } = useMetadata();
    const { refreshTickets } = useTickets();
    const { refreshStops } = useStops();
    const { refreshLines } = useLines();
    const refreshAll = () => {

        refreshMetadata();
        refreshTickets();
        refreshStops();
        refreshLines()

    };

    return {
        refreshAll,
    };
};

import {useTickets} from "./useTickets.tsx";
import {useMetadata} from "./useMetadata.tsx";
import {useStops} from "./useStops.tsx";

export const useAppData = () => {
    const { metadata, metadataLoading, refreshMetadata } = useMetadata();
    const { tickets, ticketsLoading, refreshTickets } = useTickets();
    const { stops, stopsLoading, refreshStops } = useStops();

    const refreshAll = () => {
        refreshMetadata();
        refreshTickets();
        refreshStops();
    };

    return {
        metadata,
        metadataLoading,
        tickets,
        ticketsLoading,
        stops,
        stopsLoading,
        refreshAll,
    };
};

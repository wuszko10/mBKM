import { useEffect } from 'react';

const useLoadDataOnShow = (show, loadData) => {
    useEffect(() => {
        if (show) {
            loadData();
        }
    }, [show, loadData]);
};

export default useLoadDataOnShow;

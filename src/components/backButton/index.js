import React, { useCallback, useMemo } from 'react';
import {useNavigate} from "react-router-dom";
import {ArrowLeftOutlined} from "@ant-design/icons";

import {BACK_TO} from "../../config/messages";

export const BackStyle = {
    style: {
        fontSize: '14px'
    }
};

const BackTo = ({ url = "/products"}) => {
    const navigate = useNavigate();
    const currPageIndex = useMemo(() => window?.history?.length || 1, []);
    const isFirstPageInHistory = useMemo(() => currPageIndex === 1, []);

    const goToPrevPage = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    const reload = (url) => {
        window.location.href = url;
    };

    const onClickHandler = useCallback(() => {
        isFirstPageInHistory ? reload() : goToPrevPage();
    }, [url, goToPrevPage]);

    return (
        <div onClick={onClickHandler}>
            <ArrowLeftOutlined {...BackStyle}/>
            {BACK_TO}
        </div>
    );
}

export default BackTo;
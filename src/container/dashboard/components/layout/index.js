import {useEffect} from "react";
import {useLocation, useNavigate} from 'react-router-dom';

import { Card, Row, Col, Button } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';

import {useDescription} from "../../hooks/useDescription";
import {useItemHandler} from "../../hooks/useItemHandler";
import {useNavigation as useCustomNavigation} from "../../hooks/useNavigation";
import {ROUTES} from "../../../../config/routes";
import {
    CardStyle,
    CounterStyle,
    DescriptionStyle,
    ImageStyle,
    ItemCountStyle,
    LayoutColStyle,
    ProductsStyle
} from "./style";
import {CARD_MSGS} from "../../config/messages";
import {MAX_DESC_LEN} from "../../config/constants";

const ProductsLayout = ({ products, setItemCount, itemCount }) => {
    const navigate = useNavigate();
    const location = useLocation();

    // Effect to redirect urls
    useEffect(() => {
        if (location.pathname !== ROUTES.PRODUCTS) {
            navigate(ROUTES.PRODUCTS, { replace: true });
        }
    }, [location.pathname, navigate]);

    // supporting hook handlers
    const { expandedDescription, curriedToggleDesc } = useDescription();
    const { curriedIncrementItem, curriedDecrementItem } = useItemHandler({ setItemCount });
    const { navToProductDetail } = useCustomNavigation({ navigate });

    return (
        <Row gutter={[60, 60]}>
            {products?.map(({ title, description, id, image }) => (
                <Col key={title} {...LayoutColStyle}>
                    <div {...ProductsStyle}>
                        <Card
                            {...CardStyle}
                            hoverable
                            cover={
                                <div {...ImageStyle}>
                                    <img alt="example" style={{ height: "80%" }} src={image} />
                                </div>
                            }
                            actions={[
                                <div key="details">
                                    <Button onClick={navToProductDetail(id)}>
                                        {CARD_MSGS.DETAILS_BUTTON}
                                    </Button>
                                </div>,
                                <div key="actions" {...CounterStyle}>
                                    <Button
                                        type="text"
                                        icon={<MinusOutlined />}
                                        onClick={curriedDecrementItem(id)}
                                        disabled={!(itemCount[id] > 0)}
                                    />
                                    {itemCount[id] !== 0 && <div {...ItemCountStyle}>{itemCount[id]}</div>}
                                    <Button type="text" icon={<PlusOutlined />} onClick={curriedIncrementItem(id)} />
                                </div>
                            ]}
                        >
                            <Card.Meta title={title} description={expandedDescription[id] ? description : `${description.slice(0, MAX_DESC_LEN)}...`} />
                            {description.length > MAX_DESC_LEN && (
                                <div onClick={curriedToggleDesc(id)} {...DescriptionStyle}>
                                    {expandedDescription[id] ? CARD_MSGS.SHOW_LESS_DESC : CARD_MSGS.SHOW_MORE_DESC}
                                </div>
                            )}
                        </Card>
                    </div>
                </Col>
            ))}
        </Row>
    );
};

export default ProductsLayout;
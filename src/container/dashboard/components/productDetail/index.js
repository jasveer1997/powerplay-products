import {useMemo} from 'react';
import {Link, useParams} from "react-router-dom";

import {Card, Button, Row, Col, Tag, Typography} from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';

import {useItemHandler} from "../../hooks/useItemHandler";
import {isNull} from "../../../../utils";
import {ImageStyle, TagStyle} from "./style";
import {PRODUCT_MSGS} from "../../config/messages";

const { Text } = Typography;

const ProductDetail = props => {

    // written in case detailed route has more info
    // useEffect(() => {
    //     if (!singleProductData.loaded && !singleProductData.isLoading) {
    //         fetchProduct();
    //     }
    // }, [singleProductData.loaded]);

    const { pid } = useParams();
    const { products, itemCount, setItemCount } = props;

    const { curriedIncrementItem, curriedDecrementItem } = useItemHandler({ setItemCount });
    const product = useMemo(() => products.find(({ id }) => id.toString() === pid) || null, [products]);
    if (isNull(product)) {
        return <div>product not found</div>;
    }

    const { title, description, image, price, rating: { rate, count }, category } = product;
    return (
        <div>
            <Card
                title={title}
                cover={<img alt={title} src={image} {...ImageStyle} />}
            >
                <Typography>
                    <Text strong>{PRODUCT_MSGS.DESCRIPTION} </Text>
                    {description}
                </Typography>
                <Typography>
                    <Text strong>{PRODUCT_MSGS.PRICE} </Text>
                    ${price}
                </Typography>
                <Typography>
                    <Text strong>{PRODUCT_MSGS.RATING} </Text>
                    {`${rate}(${count})`}
                </Typography>
                <div {...TagStyle}>
                    <Tag color="blue" key={category}>
                        {category}
                    </Tag>
                </div>
                <Row gutter={[8, 8]} align="middle">
                    <Col>
                        <Button
                            type="text"
                            icon={<MinusOutlined />}
                            onClick={curriedDecrementItem(pid)}
                            disabled={itemCount[pid] <= 0}
                        />
                    </Col>
                    <Col>{itemCount[pid]}</Col>
                    <Col>
                        <Button type="text" icon={<PlusOutlined />} onClick={curriedIncrementItem(pid)} />
                    </Col>
                    <Col>
                        <Link to="/cart">
                            <Button type="primary">
                                {PRODUCT_MSGS.VIEW_CART}
                            </Button>
                        </Link>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default ProductDetail;

// Todo: Redirect to Invalid page / Home page if directly opened and pId is not a valid value

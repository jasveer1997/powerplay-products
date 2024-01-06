import {useEffect, useState} from 'react';
import {Card, Button, Row, Col, Tag, Typography} from 'antd';
import { PlusOutlined, MinusOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import {Link, useParams} from "react-router-dom";
import {isNull} from "../../../../utils";

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

    const product = products.find(({ id }) => id.toString() === pid) || null;

    if (isNull(product)) {
        // Todo: Redirect to Invalid page / Home page
        return <div>product not found</div>;
    }


    const { title, description, image, price, rating: { rate, count }, category } = product;

    const incrementQuantity = () => {
        setItemCount((prevCount) => ({
            ...prevCount,
            [pid]: (prevCount[pid] || 0) + 1,
        }));
    };

    const decrementQuantity = () => {
        setItemCount((prevCount) => ({
            ...prevCount,
            [pid]: (prevCount[pid] || 0) - 1,
        }));
    };

    return (
        <div>
            <Card
                title={title}
                cover={<img alt={title} src={image} style={{ height: '3in', width: '3in', objectFit: 'contain', margin: '0 auto' }} />}
                extra={<Button icon={<ShoppingCartOutlined />} />}
            >
                <Typography>
                    <Text strong>Description: </Text>
                    {description}
                </Typography>
                <Typography>
                    <Text strong>Price: </Text>
                    ${price}
                </Typography>
                <Typography>
                    <Text strong>Rating: </Text>
                    {`${rate}(${count})`}
                </Typography>
                <div style={{ marginBottom: '8px' }}>
                    <Tag color="blue" key={category}>
                        {category}
                    </Tag>
                </div>
                <Row gutter={[8, 8]} align="middle">
                    <Col>
                        <Button
                            type="text"
                            icon={<MinusOutlined />}
                            onClick={decrementQuantity}
                            disabled={itemCount[pid] <= 0}
                        />
                    </Col>
                    <Col>{itemCount[pid]}</Col>
                    <Col>
                        <Button type="text" icon={<PlusOutlined />} onClick={incrementQuantity} />
                    </Col>
                    <Col>
                        <Link to="/cart">
                            <Button type="primary">
                                View Cart
                            </Button>
                        </Link>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default ProductDetail;

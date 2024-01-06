import {Card, Row, Col, Button, notification, Typography} from 'antd';
import {MinusOutlined, PlusOutlined} from "@ant-design/icons";
import {useCallback, useMemo} from "react";
import {useItemHandler} from "../../hooks/useItemHandler";
import {CART_MSGS} from "../../config/messages";
import {ItemImageStyle, ItemsCardStyle, ProceedCardStyle} from "./style";

const { Text } = Typography;

const CartItem = ({ item, setItemCount, itemCount }) => {
    const { curriedIncrementItem, curriedDecrementItem, curriedRemoveItem } = useItemHandler({ setItemCount });
    return (
        <Card key={item.id} {...ItemsCardStyle}>
            <Row gutter={[16, 16]} align="middle">
                <Col span={6}>
                    <img src={item.image} alt={item.title} {...ItemImageStyle} />
                </Col>
                <Col span={12}>
                    <p>Title: {item.title}</p>
                    <p>Count: {item.count}</p>
                    <p>Price: ${item.price}</p>
                </Col>
                <Col>
                    <Button
                        type="text"
                        icon={<MinusOutlined />}
                        onClick={curriedDecrementItem(item.id)}
                        disabled={itemCount[item.id] <= 0}
                    />
                </Col>
                <Col>{itemCount[item.id]}</Col>
                <Col>
                    <Button type="text" icon={<PlusOutlined />} onClick={curriedIncrementItem(item.id)} />
                </Col>

                <Col span={6}>
                    <Button type="primary" onClick={curriedRemoveItem(item.id)}>
                        {CART_MSGS.REMOVE_FROM_CART}
                    </Button>
                </Col>
            </Row>
        </Card>
    );
};

const Cart = ({ products, setItemCount, itemCount }) => {

    const cartItems = useMemo(() =>
        products
            .filter(({ id }) => itemCount[id] || 0 > 0)
            .map(productDetails => ({ ...productDetails, count: itemCount[productDetails.id]})),
        [products, itemCount]);
    const totalItems = useMemo(() => cartItems.reduce((acc, item) => acc + item.count, 0), [cartItems]);
    const totalPrice = useMemo(() => cartItems.reduce((acc, item) => acc + item.price * item.count, 0), [cartItems]);

    const checkoutNtf = useCallback(() => notification.info({
        duration: 2,
        message: `Checkout...`,
        description: "Stay tuned to checkout!",
        placement: 'top',
    }), []);

    if (cartItems.length === 0) {
        return (
            <Typography>
                <Text strong>{CART_MSGS.EMPTY} </Text>
            </Typography>
        );
    }

    return (
        <Row gutter={[16, 16]}>
            <Col span={16}>
                <div>{cartItems.map((item) => <CartItem itemCount={itemCount} item={item} setItemCount={setItemCount} />)}</div>
            </Col>
            <Col span={8}>
                <Card title="Checkout" {...ProceedCardStyle}>
                    <p>{CART_MSGS.TOTAL_ITEMS} {totalItems}</p>
                    <p>{CART_MSGS.TOTAL_PRICE} {totalPrice}</p>
                    {/*<Link to="/checkout">*/}
                        <Button disabled={totalItems === 0} type="primary" onClick={checkoutNtf}>
                            {CART_MSGS.CHECKOUT}
                        </Button>
                    {/*</Link>*/}
                </Card>
            </Col>
        </Row>
    );
};

export default Cart;

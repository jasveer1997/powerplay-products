import {Card, Row, Col, Button, notification} from 'antd';
import {MinusOutlined, PlusOutlined} from "@ant-design/icons";

const Cart = ({ products, setItemCount, itemCount }) => {

    const cartItems = products.filter(({ id }) => itemCount[id] || 0 > 0).map(productDetails => ({ ...productDetails, count: itemCount[productDetails.id]}));
    const renderCartItem = (item) => {
        const incrementQuantity = () => {
            setItemCount((prevCount) => ({
                ...prevCount,
                [item.id]: (prevCount[item.id] || 0) + 1,
            }));
        };

        const decrementQuantity = () => {
            setItemCount((prevCount) => ({
                ...prevCount,
                [item.id]: (prevCount[item.id] || 0) - 1,
            }));
        };

        return (
            <Card key={item.id} style={{ marginBottom: 16 }}>
            <Row gutter={[16, 16]} align="middle">
                <Col span={6}>
                    <img src={item.image} alt={item.title} style={{ maxWidth: '100%' }} />
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
                        onClick={decrementQuantity}
                        disabled={itemCount[item.id] <= 0}
                    />
                </Col>
                <Col>{itemCount[item.id]}</Col>
                <Col>
                    <Button type="text" icon={<PlusOutlined />} onClick={incrementQuantity} />
                </Col>

                <Col span={6}>
                    <Button type="primary" onClick={() => {
                        setItemCount((prevCount) => ({
                            ...prevCount,
                            [item.id]: 0,
                        }));
                    }}>
                        Remove
                    </Button>
                </Col>
            </Row>
        </Card>
        );
    };

    const renderCartItems = () => {
        if (cartItems.length === 0) {
            return <div>No items in the cart</div>;
        }

        return cartItems.map((item) => renderCartItem(item));
    };

    const totalItems = cartItems.reduce((acc, item) => acc + item.count, 0);

    return (
        <Row gutter={[16, 16]}>
            <Col span={16}>
                <div>{renderCartItems()}</div>
            </Col>
            <Col span={8}>
                <Card title="Checkout" style={{ height: '100%' }}>
                    <p>Total Items: {totalItems}</p>
                    <p>Total Price: ${cartItems.reduce((acc, item) => acc + item.price * item.count, 0)}</p>
                    {/*<Link to="/checkout">*/}
                        <Button disabled={totalItems === 0} type="primary" onClick={() => notification.info({
                            duration: 2,
                            message: `Checkout...`,
                            description: "Stay tuned to checkout!",
                            placement: 'top',
                        })}>
                            Proceed to Checkout
                        </Button>
                    {/*</Link>*/}
                </Card>
            </Col>
        </Row>
    );
};

export default Cart;

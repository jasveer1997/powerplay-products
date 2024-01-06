import { Card, Row, Col, Space, Button } from 'antd';
import {useLocation, useNavigate} from 'react-router-dom';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import {useEffect, useState} from "react";

const ProductsLayout = ({ products, setItemCount, itemCount }) => {
    const [expandedDescription, setExpandedDescription] = useState({});
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        if (location.pathname !== '/products') {
            navigate('/products', { replace: true });
        }
    }, [location.pathname, navigate]);
    const toggleDescription = (index) => {
        setExpandedDescription((prevExpanded) => ({
            ...prevExpanded,
            [index]: !prevExpanded[index],
        }));
    };

    // no limit on addition for now.
    const incrementItem = (index) => {
        setItemCount((prevCount) => ({
            ...prevCount,
            [index]: (prevCount[index] || 0) + 1,
        }));
    };

    const decrementItem = (index) => {
        setItemCount((prevCount) => ({
            ...prevCount,
            [index]: (prevCount[index] || 0) - 1,
        }));
    };

    return (
        <Row gutter={[60, 60]}>
            {products?.map(({ title, description, id, image }, index) => (
                <Col key={title} xs={24} sm={12} md={8} lg={6}>
                    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <Card
                            hoverable
                            style={{
                                width: '100%',
                                flex: '1 1 auto',
                                border: 'none',
                            }}
                            bodyStyle={{ minHeight: '200px' }}
                            actions={[
                                <div key="details">
                                <Button onClick={() => navigate(`product/${id}`)}>
                                    Details
                                </Button>
                                </div>,
                                <div key="actions" style={{ display: 'flex', alignItems: 'center' }}>
                                    <Button
                                        type="text"
                                        icon={<MinusOutlined />}
                                        onClick={() => decrementItem(index)}
                                        disabled={!(itemCount[index] > 0)}
                                    />
                                    {itemCount[index] !== 0 && <div style={{ lineHeight: '32px', margin: '0 8px' }}>{itemCount[index]}</div>}
                                    <Button type="text" icon={<PlusOutlined />} onClick={() => incrementItem(index)} />
                                </div>
                            ]}
                            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                        >
                            <Card.Meta
                                title={title}
                                description={
                                    expandedDescription[index] ? description : `${description.slice(0, 100)}...`
                                }
                            />
                            {description.length > 100 && (
                                <div
                                    onClick={() => toggleDescription(index)}
                                    style={{ color: '#1890ff', cursor: 'pointer' }}
                                >
                                    {expandedDescription[index] ? 'Show Less' : 'Show More'}
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

// Todo: Height adjustment upon using actual img.
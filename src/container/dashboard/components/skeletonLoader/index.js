import { Row, Col, Skeleton } from 'antd';

const SkeletonGrid = () => {
    const skeletonRows = [];
    const numRows = 7;
    const numColumns = 3;

    for (let i = 0; i < numRows; i++) {
        const skeletonCols = [];
        for (let j = 0; j < numColumns; j++) {
            skeletonCols.push(
                <Col key={j} span={8}>
                    <Skeleton active />
                </Col>
            );
        }
        skeletonRows.push(
            <Row key={i} gutter={[16, 16]}>
                {skeletonCols}
            </Row>
        );
    }

    return <>{skeletonRows}</>;
};

export default SkeletonGrid;

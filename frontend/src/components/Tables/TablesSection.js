import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

function TablesSection() {
  const tables = [1, 2, 3, 4, 5, 6];  // Example table numbers

  return (
    <Container>
      <Row>
        {tables.map(table => (
          <Col md={4} key={table}>
            <Card>
              <Card.Body>
                <Card.Title>Table {table}</Card.Title>
                <Card.Text>4 Seats</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default TablesSection;

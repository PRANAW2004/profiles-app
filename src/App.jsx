import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { InputGroup } from 'react-bootstrap';
import ProfileCard from './components/ProfileCard.jsx';
import { profiles } from './data/profiles.js';
import { useState } from 'react';



export default function App() {
const [people, setPeople] = useState(profiles);
const [name, setName] = useState('');
  const [error, setError] = useState('');

  const addLikes = (id) => {
    setPeople(ps =>
      ps.map(p => (p.id === id ? { ...p, likes: p.likes + 1 } : p))
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = name.trim();

    if (!trimmed) {
      setError('Name is required.');
      return;
    }
    if (people.some(p => p.name.toLowerCase() === trimmed.toLowerCase())) {
      setError('Name must be unique.');
      return;
    }

    const newProfile = {
      id: people.length ? Math.max(...people.map(p => p.id)) + 1 : 1,
      name: trimmed,
      likes: 0
    };
    setPeople([...people, newProfile]);
    setName('');
    setError('');
  };

  return (
    <Container className="py-4">
      <h1 className="mb-4 text-center">Profiles</h1>

      <Row>
        <Col md={8}>
          <Row xs={1} sm={2} lg={3} className="g-3">
            {people.map((p) => (
              <Col key={p.id}>
                <ProfileCard
                  name={p.name}
                  likes={p.likes}
                  id={p.id}
                  onLike={() => addLikes(p.id)}
                />
              </Col>
            ))}
          </Row>
        </Col>

        <Col md={4}>
          <div
            className="p-4 border rounded shadow-sm bg-light"
            style={{ position: 'sticky', top: '1rem' }}
          >
            <h4 className="mb-3 text-center">Add New Profile</h4>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="profileName" className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (error) setError('');
                  }}
                  isInvalid={!!error}
                />
                <Form.Control.Feedback type="invalid">
                  {error}
                </Form.Control.Feedback>
              </Form.Group>
              <Button
                type="submit"
                variant="primary"
                className="w-100"
                // disabled={!name.trim()}
              >
                Add Profile
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}



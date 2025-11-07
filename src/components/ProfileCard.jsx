import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

// eslint-disable-next-line no-unused-vars
export default function ProfileCard({ name, likes, id, onLike }) {
  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <Card.Title className="h5 mb-1">{name}</Card.Title>
        <Card.Text className="mb-0">Likes: {likes}</Card.Text>
        <Button onClick={onLike} variant="primary">Like</Button>
      </Card.Body>
    </Card>
  );
}
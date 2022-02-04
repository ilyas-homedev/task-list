import { ListGroup, CloseButton } from "react-bootstrap";

const ItemList = (props) => {
  return (
    <ListGroup as="ol" numbered>
      {props.list.map((item) => {
        return (
          <ListGroup.Item as="li" key={item.id} className="list-item">
            {item.text}
            <CloseButton
              className="delete-cross"
              onClick={() => props.onDelete(item.id)}
            ></CloseButton>
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
};

export default ItemList;

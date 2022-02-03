import { useState, useRef, Fragment } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  ListGroup,
  Row,
} from "react-bootstrap";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [warning, setWarning] = useState(null);
  const input = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    setWarning(null);
    const todoValue = input.current.value;

    if (todoValue === "") {
      setWarning("Value can't be empty!");
      return;
    }

    if (todoList.length === 10) {
      setWarning("Quantity limit reached! Delete some task to add a new one.");
      return;
    }

    setTodoList((prev) => {
      return [
        ...prev,
        { id: Math.floor(Math.random() * 1000), text: todoValue },
      ];
    });

    input.current.value = "";
  };

  const deleteHandler = (id) => {
    const filteredList = todoList.filter((item) => item.id !== id);
    setTodoList(filteredList);
  };

  console.log(todoList);

  return (
    <Fragment>
      <Container className="mt-5">
        <Form onSubmit={submitHandler}>
          <Row className="justify-content-sm-center">
            <Col xs md={8} lg={6}>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Enter your todo"
                  ref={input}
                />
              </Form.Group>
            </Col>
            <Col xs={12} sm={1}>
              <Button type="submit">Add</Button>
            </Col>
          </Row>
        </Form>
      </Container>
      <Container className="mt-2">
        <ListGroup>
          <Row className="justify-content-sm-center">
            <Col lg={7} md={9}>
              {todoList.map((item, index) => {
                return (
                  <ListGroup.Item key={item.id} className="list-item">
                    <span>{index + 1}. </span>
                    {item.text}
                    <button
                      className="delete-cross"
                      onClick={() => deleteHandler(item.id)}
                    >
                      &times;
                    </button>
                  </ListGroup.Item>
                );
              })}
            </Col>
          </Row>

          <Row className="justify-content-sm-center mt-2">
            <Col lg={7} md={9}>
              {!warning || <Alert variant="danger">{warning}</Alert>}
            </Col>
          </Row>
        </ListGroup>
      </Container>
    </Fragment>
  );
}

export default App;

import { useState, useRef, Fragment } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Row,
  CloseButton,
} from "react-bootstrap";
import ItemList from "./components/ItemList";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [warning, setWarning] = useState(null);
  const input = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    setWarning(null);
    const todoValue = input.current.value;

    if (todoValue === "" && todoList.length !== 10) {
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
        {
          id:
            Math.floor(Math.random() * 10000) +
            `_${todoValue.slice(-10, -1).split(" ").join("")}`,
          text: todoValue,
        },
      ];
    });

    input.current.value = "";
  };

  const deleteHandler = (id) => {
    const filteredList = todoList.filter((item) => item.id !== id);
    setTodoList(filteredList);
  };

  const closeWarningHandler = () => {
    setWarning(null);
  };

  return (
    <Fragment>
      <h1 className="header-text">Task List v.0.1.0</h1>
      <Container className="mt-5">
        <Form onSubmit={submitHandler}>
          <Row className="justify-content-center mt-2">
            <Col xs md={7} lg={6} className="mt-1 mb-1">
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Enter your todo"
                  ref={input}
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={2} lg={1} className="mt-1 mb-1">
              <Button style={{ width: "100%" }} type="submit">
                Add
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
      <Container className="mt-4">
        <Row className="justify-content-center">
          <Col md={9} lg={7}>
            <ItemList list={todoList} onDelete={deleteHandler} />
          </Col>
        </Row>
        <Row className="justify-content-center mt-2">
          <Col lg={7} md={9}>
            {!warning || (
              <Alert variant="danger">
                {warning}
                <CloseButton
                  className="delete-cross"
                  onClick={closeWarningHandler}
                />
              </Alert>
            )}
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

export default App;

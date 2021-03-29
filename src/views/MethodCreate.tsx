import React from "react";
import { useState, useEffect } from "react";
import { Tokens } from "../types/AppTypes";
import { Container, Form, Row, Col, Button } from "react-bootstrap";

interface MethodCreateProps {
  isLoggedIn: boolean;
  loggedAs: string;
  tokens: Tokens;
  apiUrl: string;
  setMethodCreated: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Problem {
  id: number;
  name: string;
  problem_type: string;
  minimize: number[];
}

function MethodCreate({
  isLoggedIn,
  loggedAs,
  tokens,
  apiUrl,
  setMethodCreated,
}: MethodCreateProps) {
  const [problems, SetProblems] = useState<Problem[]>([
    {
      id: 0,
      name: "placeholder",
      problem_type: "test",
      minimize: [1],
    },
  ]);
  const [problemId, SetProblemId] = useState<number>(1);
  const [methodKey, SetMethodKey] = useState<number>(0);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const res = await fetch(`${apiUrl}/problem/access`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${tokens.access}`,
          },
        });

        if (res.status == 200) {
          const body = await res.json();
          SetProblems(body.problems);
          setMethodCreated(true);
          // problems set!
        } else {
          console.log(
            `Got return code ${res.status}. Could not fetch problems.`
          );
          // do nothing
        }
      } catch (e) {
        console.log("not ok");
        console.log(e);
        //do nothing
      }
    };

    fetchProblems();
  }, []);

  const handleSubmit = async () => {
    console.log(`selected: problem ${problemId} method ${methodKey}`);
    try {
      const data = { problem_id: problemId, method: "reference_point_method" };
      const res = await fetch(`${apiUrl}/method/create`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${tokens.access}`,
        },
        body: JSON.stringify(data),
      });

      if (res.status == 201) {
        const body = await res.json();
        console.log(body);
        // created!
      } else {
        console.log(`Got return code ${res.status}. Could not create method.`);
        // do nothing
      }
    } catch (e) {
      console.log(e);
      // Do nothing
    }
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <h2>Create a method</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form action="">
              <Form.Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Select a problem</Form.Label>
                    <Form.Control
                      as="select"
                      defaultValue={0}
                      onChange={(e) => {
                        SetProblemId(parseInt(e.target.value));
                      }}
                    >
                      {problems.map((problem, index) => {
                        return (
                          <option value={problem.id} key={index}>
                            {`${problem.name} (${problem.problem_type})`}
                          </option>
                        );
                      })}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Select a method</Form.Label>
                    <Form.Control
                      as="select"
                      defaultValue={0}
                      onChange={(e) => {
                        SetMethodKey(parseInt(e.target.value));
                      }}
                    >
                      <option value={0}>Reference Point Method</option>
                      <option value={1}>
                        Reference Point Method 2 (just for testing)
                      </option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Form.Row>
              <Row>
                <Col>
                  <Button
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSubmit();
                    }}
                  >
                    Create method
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default MethodCreate;

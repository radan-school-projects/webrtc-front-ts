import React from "react";
import {
  // useHistory,
  RouteComponentProps,
} from "react-router-dom";
import { v1 as uuid } from "uuid";
import {
  Button,
} from "@chakra-ui/react";

const CreateRoom = (props: RouteComponentProps) => {
  // const history = useHistory();

  function create() {
    const id = uuid();
    props.history.push(`/room/${id}`);
  }

  return (
    <Button onClick={create}>Create Room</Button>
  );
};

export default CreateRoom;

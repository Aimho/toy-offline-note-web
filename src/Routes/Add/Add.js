import React from "react";
import { withRouter } from "react-router-dom";
import { useMutation } from "react-apollo";
import gql from "graphql-tag";
import Editor from "../../Components/Editor";

const ADD_NOTE = gql`
  mutation createNote($title: String!, $content: String!) @client {
    createNote(title: $title, content: $content) {
      id
    }
  }
`;

const Add = (props) => {
  const {
    history: { push },
  } = props;
  const [addNote] = useMutation(ADD_NOTE);

  const onSave = (title, content) => {
    if (title && content) {
      addNote({ variables: { title, content } });
      push("/");
    }
  };

  return <Editor onSave={onSave} />;
};

export default withRouter(Add);

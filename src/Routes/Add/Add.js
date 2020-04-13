import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Editor from "../../Components/Editor";

const ADD_NOTE = gql`
  mutation createNote($title: String!, $content: String!) @client {
    createNote(title: $title, content: $content) {
      id
    }
  }
`;

class Add extends React.Component {
  render() {
    return (
      <Mutation mutation={ADD_NOTE}>
        {(createNote) => {
          this.createNote = createNote;
          return <Editor onSave={this.onSave} />;
        }}
      </Mutation>
    );
  }

  onSave = (title, content) => {
    const {
      history: { push },
    } = this.props;
    if (title !== "" && content !== "") {
      this.createNote({ variables: { title, content } });
      push("/");
    }
  };
}

export default Add;

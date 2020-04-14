import React from "react";
import { withRouter } from "react-router-dom";
import { useQuery, useMutation } from "react-apollo";
import { GET_NOTE } from "../../queries";
import Editor from "../../Components/Editor";
import gql from "graphql-tag";

export const EDIT_NOTE = gql`
  mutation editNote($id: Int!, $title: String!, $content: String!) @client {
    editNote(id: $id, title: $title, content: $content) {
      id
    }
  }
`;

const Edit = (props) => {
  const {
    match: {
      params: { id },
    },
    history: { push },
  } = props;

  const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } });
  const [editNote] = useMutation(EDIT_NOTE);

  if (loading || error || !data || !data.note) return null;

  const onSave = (title, content, id) => {
    if (title && content && id) {
      editNote({ variables: { title, content, id } });
      push("/");
    }
  };

  return (
    <Editor
      title={data.note.title}
      content={data.note.content}
      id={data.note.id}
      onSave={onSave}
    />
  );
};

export default withRouter(Edit);

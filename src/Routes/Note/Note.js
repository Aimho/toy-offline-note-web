import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { useQuery } from "react-apollo";
import styled from "styled-components";
import MarkdownRenderer from "react-markdown-renderer";
import { GET_NOTE } from "../../queries";

const TitleComponent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 50px;
`;

const Title = styled.h1`
  font-size: 50px;
  margin: 0;
  padding: 0;
`;

const Button = styled.button`
  padding: 20px 40px;
`;

const Note = (props) => {
  const {
    match: {
      params: { id },
    },
  } = props;

  const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } });
  if (loading || error || !data || !data.note) return null;

  return (
    <Fragment>
      <TitleComponent>
        <Title>{data.note && data.note.title}</Title>
        <Link to={`/edit/${data.note.id}`}>
          <Button>Edit</Button>
        </Link>
      </TitleComponent>
      <MarkdownRenderer markdown={data.note.content} />
    </Fragment>
  );
};
export default withRouter(Note);

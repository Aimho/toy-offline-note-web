import React, { Fragment, useState } from "react";
import styled from "styled-components";
import MarkdownRenderer from "react-markdown-renderer";
import TextareaAutoSize from "react-textarea-autosize";

const TitleInput = styled(TextareaAutoSize)`
  font-size: 50px;
  font-weight: 600;
  width: 100%;
  &::placeholder {
    font-weight: 600;
  }
`;

const ContentPreview = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 50px;
`;

const ContentInput = styled(TextareaAutoSize)`
  font-size: 18px;
  margin-top: 15px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 50px;
`;

const Button = styled.button`
  padding: 20px 40px;
`;

const Editor = (props) => {
  const [title, setTitle] = useState(props.title ? props.title : "");
  const [content, setContent] = useState(props.content ? props.content : "");

  const onChangeTitle = (event) => setTitle(event.target.value);
  const onChangeContent = (event) => setContent(event.target.value);

  return (
    <Fragment>
      <TitleContainer>
        <TitleInput
          value={title}
          onChange={onChangeTitle}
          placeholder={"Untitled..."}
          name={"title"}
        />
        <Button onClick={() => props.onSave(title, content, props.id)}>
          Save
        </Button>
      </TitleContainer>
      <ContentPreview>
        <ContentInput
          value={content}
          onChange={onChangeContent}
          placeholder={"# This supports markdown!"}
          name={"content"}
        />
        <MarkdownRenderer markdown={content} className={"markdown"} />
      </ContentPreview>
    </Fragment>
  );
};

export default Editor;

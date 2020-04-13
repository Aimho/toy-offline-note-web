import React, { Fragment } from "react";
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

const Button = styled.button``;

export default class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title || "",
      content: props.content || "",
      id: props.id || null,
    };
  }
  render() {
    const { title, content } = this.state;
    return (
      <Fragment>
        <TitleContainer>
          <TitleInput
            value={title}
            onChange={this.onInputChange}
            placeholder={"Untitled..."}
            name={"title"}
          />
          <Button onClick={this.onSave}>Save</Button>
        </TitleContainer>
        <ContentPreview>
          <ContentInput
            value={content}
            onChange={this.onInputChange}
            placeholder={"# This supports markdown!"}
            name={"content"}
          />
          <MarkdownRenderer markdown={content} className={"markdown"} />
        </ContentPreview>
      </Fragment>
    );
  }
  onInputChange = (event) => {
    const {
      target: { value, name },
    } = event;
    this.setState({
      [name]: value,
    });
  };
  onSave = () => {
    const { onSave } = this.props;
    const { title, content, id } = this.state;
    onSave(title, content, id);
  };
}

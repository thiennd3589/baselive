import React from "react";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "draft-js/dist/Draft.css";
import "./styles.scss";

interface EditorProps {
  value?: any;
  readonly?: boolean;
  onChange?: (data: any) => void;
}
interface EditorCompState {
  editorState: EditorState;
  updateFlag: boolean;
}

class EditorContainer extends React.Component<EditorProps, EditorCompState> {
  private refState = this.props.value
    ? EditorState.createWithContent(
        convertFromRaw(JSON.parse(this.props.value))
      )
    : EditorState.createEmpty();
  constructor(props: EditorProps) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      updateFlag: true,
    };
  }
  shouldComponentUpdate(nextProps: EditorProps) {
    console.log(this.props, nextProps);
    if (this.props.value !== nextProps.value) {
      nextProps.value
        ? (this.refState = EditorState.createWithContent(
            convertFromRaw(JSON.parse(nextProps.value))
          ))
        : (this.refState = EditorState.createEmpty());
      return true;
    }
    return false;
  }

  onEditorStateChange = (editorState: EditorState) => {
    this.setState({
      editorState,
    });
    const raw = convertToRaw(editorState.getCurrentContent());
    this.props.onChange && this.props.onChange(raw);
  };

  onChange = (editorState: any) => {
    this.setState({
      editorState,
    });
  };

  render() {
    const { editorState } = this.state;
    return (
      <div className={this.props.readonly ? "editor readonly" : "editor"}>
        <Editor
          readOnly={this.props.readonly}
          editorState={this.props.readonly ? this.refState : editorState}
          onEditorStateChange={this.onEditorStateChange}
          toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
          }}
        />
      </div>
    );
  }
}

export default EditorContainer;

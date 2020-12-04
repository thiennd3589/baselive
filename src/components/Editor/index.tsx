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
  constructor(props: EditorProps) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      updateFlag: true,
    };
  }

  componentDidUpdate() {
    this.props.value &&
      this.state.updateFlag &&
      this.setState({
        editorState: EditorState.createWithContent(
          convertFromRaw(JSON.parse(this.props.value))
        ),
        updateFlag: false,
      });
  }

  componentDidMount() {
    this.props.value &&
      this.state.updateFlag &&
      this.setState({
        editorState: EditorState.createWithContent(
          convertFromRaw(JSON.parse(this.props.value))
        ),
        updateFlag: false,
      });
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
          editorState={editorState}
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

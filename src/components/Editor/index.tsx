import React from "react";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "draft-js/dist/Draft.css";
import "./styles.scss";
import { Obj } from "interfaces/common";

interface EditorProps {
  value?: any;
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
    console.log("abc");
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
      <div className="editor">
        <Editor
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

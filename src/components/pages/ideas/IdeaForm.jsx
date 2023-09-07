import { Link } from "react-router-dom";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const IdeaForm = (props) => {
  const { idea } = props;
  const { editorState } = props;
  const { onEditorStateChange } = props;
  return (
    <div className="idea-form">
      <form method={props.method} onSubmit={props.onSubmit}>
        <Link to="/my-ideas" className="btn btn-light">
          &larr;&nbsp;Назад
        </Link>
        <div className="mb-2">
          <label htmlFor="title" className="form-label">
            Заголовок
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            placeholder="Заголовок идеи"
            defaultValue={(idea && idea.title) || ""}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="description" className="form-label">
            Описание
          </label>
          <Editor
            editorState={editorState}
            wrapperClassName="rich-editor-wrapper"
            editorClassName="rich-editor"
            toolbarClassName="rich-editor-toolbar"
            onEditorStateChange={onEditorStateChange}
            placeholder="Описание идеи"
          />
        </div>
        <div className="controls mb-2">
          <button type="submit" className="btn btn-success">
            Сохранить
          </button>
        </div>
      </form>
    </div>
  );
};

export default IdeaForm;

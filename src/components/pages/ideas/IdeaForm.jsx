import { Link } from "react-router-dom";

const IdeaForm = (props) => {
  const { idea } = props;
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
          <textarea
            id="description"
            name="description"
            className="form-control"
            placeholder="Описание идеи"
            defaultValue={(idea && idea.description) || ""}
          ></textarea>
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

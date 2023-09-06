import { useKeycloak } from "@react-keycloak/web";

const IdeaAttachments = (props) => {
  const { keycloak } = useKeycloak();
  const { ideaId, allowRemove, callback } = props;

  const remove = (attachmentId) => {
    const API_ENDPOINT_URL =
      process.env.REACT_APP_YDEAS_API_HOST + `/ideas/media/idea_attachment`;
    const headers = {
      Authorization: `Bearer ${keycloak.token}`,
      "Content-Type": "application/json",
    };
    fetch(API_ENDPOINT_URL, {
      headers: headers,
      method: "DELETE",
      body: JSON.stringify({
        ideaId: ideaId,
        mediaObjectId: attachmentId,
      }),
    }).then(() => {
      callback();
    });
  };

  return (
    <table className="table table-striped table-bordered">
      <thead></thead>
      <tbody>
        {props.attachments.map((attachment) => (
          <tr key={attachment.id}>
            <td>
              <a href={attachment.url} target="_blank" rel="noreferrer">
                {attachment.title}
              </a>
            </td>
            <td>{attachment.mediaType}</td>
            {allowRemove && (
              <td>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => {
                    if (window.confirm(`Удалить файл ${attachment.title}?`)) {
                      remove(attachment.id);
                    }
                  }}
                >
                  Удалить
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default IdeaAttachments;

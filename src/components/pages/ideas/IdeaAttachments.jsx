const IdeaAttachments = (props) => {
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
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default IdeaAttachments;

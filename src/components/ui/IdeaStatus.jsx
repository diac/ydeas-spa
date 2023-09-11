const IdeaStatus = (props) => {
  const { ideaStatus } = props;

  const statusCaptions = {
    approved: "Идея одобрена",
    declined: "Идея отклонена",
  };

  const statusTexlClassnames = {
    approved: "text-success",
    declined: "text-danger",
  };

  return (
    <span
      className={`idea-status ${
        (ideaStatus && statusTexlClassnames[ideaStatus.toLowerCase()]) || ""
      }`}
    >
      {(ideaStatus && statusCaptions[ideaStatus.toLowerCase()]) || ""}
    </span>
  );
};

export default IdeaStatus;

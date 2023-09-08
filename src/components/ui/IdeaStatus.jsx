const IdeaStatus = (props) => {
  const { ideaStatus } = props;

  const statusCaptions = {
    approved: "Идея одобрена",
    declined: "Идея отклонена",
  };

  return (
    <span className="idea-status">
      {(ideaStatus && statusCaptions[ideaStatus.toLowerCase()]) || ""}
    </span>
  );
};

export default IdeaStatus;

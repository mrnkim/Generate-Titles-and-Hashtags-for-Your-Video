import "./Result.css";

export function Result({ result }) {
  result = result.result;
  return (
    <div className="result">
      <div className="resultTitle">Suggested titles/tags</div>
      {result.title && (
        <div className="resultSection">
          <h2>Title</h2>
          <div>{result.title}</div>
        </div>
      )}

      {result?.topics?.length > 0 && (
        <div className="resultSection">
          <h2>Topics</h2>
          <div>
            {Array.isArray(result.topics) ? (
              result.topics.map((topic) => <div key={topic}>{topic}</div>)
            ) : (
              <p>No topics available</p>
            )}
          </div>
        </div>
      )}

      {result?.hashtags?.length > 0 && (
        <div className="resultSection">
          <h2>Hashtags</h2>
          <div className="hashtags">
            {Array.isArray(result.hashtags) ? (
              result.hashtags.map((hashtag) => (
                <div className="hashtag" key={hashtag}>
                  #{hashtag}
                </div>
              ))
            ) : (
              <p>No hashtags available</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

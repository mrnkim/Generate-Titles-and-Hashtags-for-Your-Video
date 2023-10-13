import { TitleAndSummary } from "./TitleAndSummary";
import { Video } from "./Video";

export function Result({ video, field1Result, field2Result, field3Result }) {
  return (
    <div>
      {field1Result.result.length > 0 && (
        <div>
          <h2>Summary</h2>
          <div>{field1Result.result}</div>
        </div>
      )}

      {field2Result.result.length > 0 && (
        <div>
          <h2>Chapters</h2>
          <div>
            {Array.isArray(field2Result.result) ? (
              field2Result.result.map((chapter) => (
                <div key={chapter.chapter_title}>
                  <Video
                    video={video}
                    start={chapter.start}
                    end={chapter.end}
                  />
                  <TitleAndSummary
                    title={chapter.chapter_title}
                    summary={chapter.chapter_summary}
                  />
                </div>
              ))
            ) : (
              <p>No chapters available</p>
            )}
          </div>
        </div>
      )}

      {field3Result.result.length > 0 && (
        <div>
          <h2>Highlights</h2>
          <div>
            {Array.isArray(field3Result.result) ? (
              field3Result.result.map((highlight) => (
                <div key={highlight.highlight}>
                  <Video
                    video={video}
                    start={highlight.start}
                    end={highlight.end}
                  />
                  <TitleAndSummary
                    title={highlight.highlight}
                    summary={highlight.highlight_summary}
                  />
                </div>
              ))
            ) : (
              <p>No highlights available</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

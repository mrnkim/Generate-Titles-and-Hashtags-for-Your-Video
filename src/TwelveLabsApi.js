import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

/** API Class
 *
 * Static class tying together methods used to get/send to to the Twelve Labs API
 *
 */

class TwelveLabsApi {
  static headers = {
    "Content-Type": "application/json",
    "x-api-key": API_KEY,
  };

  /** Get indexes of a user */
  static async getIndexes() {
    const config = {
      method: "GET",
      url: `${API_URL}/indexes`,
      headers: this.headers,
    };

    try {
      const response = await axios.request(config);
      return response.data.data;
    } catch (error) {
      console.error(error);
    }
  }

  /** Creates an index */
  static async createIndex(indexName) {
    const INDEXES_URL = `${API_URL}/indexes`;
    const INDEX_NAME = indexName;

    try {
      const resp = await axios.post(
        INDEXES_URL,
        {
          engine_id: "marengo2.5",
          index_options: ["visual", "conversation", "text_in_video", "logo"],
          index_name: INDEX_NAME,
        },
        { headers: this.headers }
      );
      const { data: response } = resp;
      return resp.data;
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  }

  /** Get all videos of an index */
  static async getFirstVideo(index_id) {
    const config = {
      method: "GET",
      params: { page_limit: "1" },
      url: `${API_URL}/indexes/${index_id}/videos`,
      headers: this.headers,
    };

    try {
      const response = await axios.request(config);
      return response.data.data;
    } catch (error) {
      console.error(error);
    }
  }

  /** Call generate API */
  static async generateSummary(data, videoId) {
    data["video_id"] = videoId;

    const config = {
      method: "POST",
      url: `${API_URL}/summarize`,
      headers: this.headers,
      data: data,
    };

    try {
      const response = await axios.request(config);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  /** Call gist API */
  static async generateGist(data, videoId) {
    data["video_id"] = videoId;

    const config = {
      method: "POST",
      url: `${API_URL}/gist`,
      headers: this.headers,
      data: data,
    };

    try {
      const response = await axios.request(config);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  /** Get details on a video */
  static async getVideo(index_id, video_id) {
    const config = {
      method: "GET",
      url: `${API_URL}/indexes/${index_id}/videos/${video_id}`,
      headers: {
        ...this.headers,
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.request(config);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  /** Get details on a task */
  static async getTask(task_id) {
    const config = {
      method: "GET",
      url: `${API_URL}/tasks/${task_id}`,
      headers: {
        ...this.headers,
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.request(config);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  /** Uploads a video with a given file */
  static async uploadVideo(indexId, videoFile) {
    const form = new FormData();
    form.append("language", "en");
    form.append("index_id", indexId);
    form.append("video_file", videoFile);

    const config = {
      method: "POST",
      url: `${API_URL}/tasks`,
      headers: {
        accept: "application/json",
        "x-api-key": API_KEY,
        "Content-Type":
          "multipart/form-data; boundary=---011000010111000001101001",
      },
      data: form,
    };
    try {
      const response = await axios.request(config);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}

export default TwelveLabsApi;

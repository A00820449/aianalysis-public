import OpenAI from "openai";

class OpenAISingleton {
  constructor() {
    if (!OpenAISingleton.instance) {
      this.openai = new OpenAI({
        apiKey: `${process.env.REACT_APP_OPENAI_API_KEY}`,
        dangerouslyAllowBrowser: true,
      });
      OpenAISingleton.instance = this;
    }

    return OpenAISingleton.instance;
  }

  getInstance() {
    return this.openai;
  }
}

const openaiInstance = new OpenAISingleton();

export default openaiInstance.getInstance();

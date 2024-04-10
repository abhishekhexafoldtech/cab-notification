export default class ShareRouteUc {
  #repository = null;

  constructor(repository) {
    this.#repository = repository;
  }

  async subscribeToken(token, topic) {
    try {
      const response = await this.#repository.sendToken(token, topic);
      console.log("Response: " + response);
      return { response };
    } catch (error) {
      throw new Error(error);
    }
  }
}

import { GetRequest, RESTDataSource } from '@apollo/datasource-rest';

class ApolloRetryDataSource extends RESTDataSource {
  queue: Promise<any>;

  constructor() {
    super();
    this.queue = Promise.resolve();
  }

  enqueue(task: () => Promise<any>): Promise<any> {
    this.queue = this.queue.then(() => this.delayedTask(task));
    return this.queue;
  }

  async delayedTask(task: () => Promise<any>): Promise<any> {
    // eslint-disable-next-line no-useless-catch
    try {
      await this.delay(100);
      return await task();
    } catch (error) {
      throw error;
    }
  }

  delay(ms: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  get(url: string, params: GetRequest): Promise<any> {
    return this.enqueue(() => super.get(url, params));
  }
}

export default ApolloRetryDataSource;

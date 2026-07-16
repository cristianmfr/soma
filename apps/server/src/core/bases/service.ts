export abstract class Service {
  private static instances = new Map();

  static getInstance<T>(this: new () => T): T {
    if (!Service.instances.has(this)) {
      Service.instances.set(this, new this());
    }

    return Service.instances.get(this);
  }
}

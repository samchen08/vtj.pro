export class Base {
  protected listeners: Array<() => void> = [];
  protected isReady: boolean = false;
  protected triggerReady() {
    this.isReady = true;
    for (const listener of this.listeners) {
      listener();
    }
    this.listeners = [];
  }
  ready(callback: () => void) {
    if (this.isReady) {
      callback();
    } else {
      this.listeners.push(callback);
    }
  }
  resetReady() {
    this.isReady = false;
  }
}

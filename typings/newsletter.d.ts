declare module 'newsletter' {
  export default class Newsletter {
    subscribers: Set<Function>;
    subscribe(callback: Function): Function;
    unsubscribe(callback: Function): void;
    publish(data: any): void;
  }
}

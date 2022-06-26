export type Fn<A extends any[], R> = (...args: A) => R;
export const noop = () => {};

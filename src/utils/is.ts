export function isWindow(val: any): val is Window {
  return typeof window !== 'undefined' && is(val, 'Window');
}

export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`;
}

export function isObject(val: any): val is Record<any, any> {
  return val !== null && is(val, 'Object');
}

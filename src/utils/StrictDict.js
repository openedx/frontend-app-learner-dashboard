const strictGet = (target, name) => {
  if (name === Symbol.toStringTag) {
    return target;
  }

  if (name === '$$typeof') {
    return typeof target;
  }

  if (name in target || name === '_reactFragment') {
    return target[name];
  }

  return undefined;
};

const StrictDict = (dict) => new Proxy(dict, { get: strictGet });

export default StrictDict;

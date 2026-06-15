// super simple logger, testing out creating one myself

export function logger(who) {
  return function log(msg, v) {
    console.log(`[${who}]`, msg);
  };
}
import { delay } from "./delay";

/**
 * This function provides functionality to call async function until result passes checker or cancel
 * function returns true.
 *
 * Cancel function can be used when we need to stop async call based on some restrictions, like we have max time until
 * we are waiting result.
 *
 * @example
 * ```typescript
 * let cancel = false;
 *
 * Promise.race[
 *  recursiveCall(fetch.bind(null, 'https://google.com'), (response) => response.status === 200, () => cancel),
 *  new Promise(r => setTimeout(r, 4 * 1000))
 * ]);
 * ```
 * in this example we are fetching google.com until response status is 200 or 4 seconds (+) time passed.
 *
 * @param fn  async function that need to be called recursively
 * @param checker function that gets async function result and returns true/false based on it
 * @param cancel function that returns true if async function call need to be stopped.
 * @param delayTime time to wait between async calls.
 * @returns
 */
export async function recursiveCall(
  fn: () => Promise<unknown>,
  checker: (data?: unknown) => boolean,
  cancel?: () => boolean,
  delayTime: number = 3000
) {
  //cancelation flow
  if (cancel && cancel()) {
    console.log("cancel");
    return Promise.resolve();
  }

  try {
    const result = await fn();

    if (checker(result)) {
      console.log("resolved");
      return Promise.resolve();
    }
  } catch (e) {
    console.error(e);
  }

  await delay(delayTime);

  return new Promise((r) => {
    // recursive call
    recursiveCall(fn, checker, cancel, delayTime).then(r);
  });
}

import { delay } from "./dealy";

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

/**
 * This function allows to delay running code for giving time,
 * JS has no option to set up delay for strict amount of time, so it would
 * be not less that given time.
 *
 * NOTE: time in ms.
 *
 * @param ms min time to delay
 * @returns
 */
export const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

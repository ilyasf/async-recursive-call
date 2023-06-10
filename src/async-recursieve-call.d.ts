export declare function recursiveCall(fn: () => Promise<unknown>, checker: (data?: unknown) => boolean, cancel?: () => boolean, delayTime?: number): Promise<unknown>;

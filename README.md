# async-recursive-call

This repo provides functionality to run async code recursively

## install

`npm i async-recursive-call`

## Example of usage

```typescript
import { recursiveCall } from 'async-recursive-call';

....
async function checkMyServer() {
  let ready = false;
  const isSuccess = (data: any) => (data as Response).status === 200;
  let needCancel = false;

  await Promise.race([
    delay(MAX_TIME),
    recursiveCall(fetchMock, isSuccess, () => needCancel).then(
      () => (ready = true)
    )
  ]);

  needCancel = true;

  console.log("Service is ready to use ", ready);
}

checkMyServer();
```

## test

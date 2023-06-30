![build](https://github.com/github/docs/actions/workflows/main.yml/badge.svg)

# async-recursive-call

Small repo that provides functionality to run async code recursively
until check or cancellation functions return true.

Idea of creating was based on needs to check that API for service mesh started successfully
in a given time limit.

Can be used both on server side and browsers.

## install

`npm i async-recursive-call`

## Example of usage

```typescript
import { recursiveCall, delay } from 'async-recursive-call';

const MAX_TIME = process.env.SERVICE_MAX_START_TIME ?? 2 * 1000;

const fetchMock = () => fetch(process.env.SERVICE_URL);

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

To run tests use command
`npm run test`

## license

MIT

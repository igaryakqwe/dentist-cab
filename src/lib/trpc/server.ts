import 'server-only';

import { cache } from 'react';
import { headers } from 'next/headers';
import { createTRPCContext } from './trpc';
import { createCaller } from './root';

const createContext = cache(async () => {
  const heads = new Headers(headers());
  heads.set('x-trpc-source', 'rsc');

  return await createTRPCContext({
    headers: heads,
  });
});

export const trpc = createCaller(await createContext());

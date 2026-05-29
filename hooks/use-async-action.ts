'use client';

import * as React from 'react';

interface UseAsyncActionOptions<TArgs extends unknown[], TResult> {
  onError?: (error: unknown) => void;
  onSuccess?: (result: TResult, args: TArgs) => void;
}

export function useAsyncAction<TArgs extends unknown[], TResult = void>(
  action?: (...args: TArgs) => Promise<TResult>,
  options: UseAsyncActionOptions<TArgs, TResult> = {},
) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<unknown>(null);

  const execute = React.useCallback(
    async (
      overrideActionOrFirstArg?:
        | ((...args: TArgs) => Promise<TResult>)
        | TArgs[number],
      ...restArgs: TArgs
    ) => {
      const actionToRun =
        typeof overrideActionOrFirstArg === 'function'
          ? (overrideActionOrFirstArg as (...args: TArgs) => Promise<TResult>)
          : action;
      const args =
        typeof overrideActionOrFirstArg === 'function'
          ? restArgs
          : ([overrideActionOrFirstArg, ...restArgs] as TArgs);

      if (!actionToRun) {
        throw new Error('useAsyncAction requires an action to execute.');
      }

      setIsLoading(true);
      setError(null);

      try {
        const result = await actionToRun(...args);
        options.onSuccess?.(result, args);
        return result;
      } catch (caughtError) {
        setError(caughtError);
        options.onError?.(caughtError);
        throw caughtError;
      } finally {
        setIsLoading(false);
      }
    },
    [action, options],
  );

  return { error, execute, isLoading };
}

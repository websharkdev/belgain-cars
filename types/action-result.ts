export type ActionFieldErrors<TField extends string = string> = Partial<
  Record<TField, string>
>;

export type ActionResult<TData = void, TField extends string = string> =
  | {
      ok: true;
      data: TData;
    }
  | {
      ok: false;
      error: string;
      field?: TField;
      fieldErrors?: ActionFieldErrors<TField>;
    };

export const actionSuccess = <TData>(data: TData): ActionResult<TData> => ({
  ok: true,
  data,
});

export const actionError = <TField extends string = string>(
  error: string,
  options?: { field?: TField; fieldErrors?: ActionFieldErrors<TField> },
): ActionResult<never, TField> => ({
  ok: false,
  error,
  ...options,
});

import type { FieldApi } from '@tanstack/react-form';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <p className="text-destructive  text-sm">
          {field.state.meta.errors.join(', ')}
        </p>
      ) : null}
    </>
  );
}
export default FieldInfo;

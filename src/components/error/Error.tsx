export const Error = () => {
  return (
    <div
      data-testid="error"
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded  w-full max-w-96"
      role="alert"
    >
      <strong className="font-bold">Oops!</strong>
      <br />
      <span className="block sm:inline">Something went wrong.</span>
    </div>
  );
};

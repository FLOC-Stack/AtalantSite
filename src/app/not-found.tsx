export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-24">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
        404
      </p>
      <h1 className="mt-4 max-w-2xl text-5xl leading-none tracking-tight text-foreground">
        This page does not exist.
      </h1>
      <p className="mt-6 max-w-xl text-lg text-body">
        The route may not be published yet, or the requested translation is not available.
      </p>
    </main>
  );
}

type Props = { searchParams: Promise<{ next?: string; error?: string }> };

export default async function Unlock({ searchParams }: Props) {
  const { next = "/", error } = await searchParams;
  return (
    <main className="plain">
      <form method="post" action="/api/unlock">
        <label htmlFor="password">Enter the password from your proposal email</label>
        <input id="password" name="password" type="password" autoComplete="current-password" required autoFocus />
        <input type="hidden" name="next" value={next} />
        {error && <p className="error">That password didn’t match. Check the email and try again.</p>}
        <button type="submit">View proposal</button>
      </form>
    </main>
  );
}

export default function HomePage({ user }) {
  return (
    <div>
      <h1>Welcome to rOuTine!</h1>
      <h2>Your one-stop Occupational Therapy helper</h2>
      {user ? (
        <>
          <h3>Use the tools above to manage your Occupational Therapy exercises, medications, and day-to-day routines.</h3>
        </>
      ) : (
        <>
          <h3>Sign in to begin managing your Occupational Therapy exercises, medications, and day-to-day routines.</h3>
        </>
      )}
    </div>
  );
}

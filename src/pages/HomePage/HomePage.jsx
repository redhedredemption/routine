export default function HomePage({ user }) {
  return (
    <div>
      <h1>rOuTine</h1>
      <h2>YOUR TREATMENT TRACKER: REMEMBERING ROUTINES SO YOU DON'T HAVE TO!</h2>
      {user ? (
        <>
          <h3>Use the tools above to manage your Occupational Therapy exercises, medications, and day-to-day routines.</h3>
        </>
      ) : (
        <>
          <h3>Sign in to begin managing your Occupational Therapy exercises, medications, and day-to-day routines.</h3>
        </>
      )}
      <img src="/images/home.png" alt="home"/>
    </div>
    
  );
}

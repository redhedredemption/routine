export default function HomePage({ user }) {
  return (
    <div>
      <h1>Welcome to the Occupational Therapy Helper App</h1>
      {user ? (
        <p>Hello, {user.name}! Manage your therapy exercises and medications effectively.</p>
      ) : (
        <p>Your one-stop solution for managing therapy exercises and medications.</p>
      )}
    </div>
  );
}


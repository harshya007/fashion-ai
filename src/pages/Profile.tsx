import { auth } from "../firebase";
import { signOut } from "firebase/auth";

export default function Profile() {
  const user = auth.currentUser;

  if (!user) {
    return <div className="p-8">Not logged in</div>;
  }

  return (
    <div className="max-w-xl mx-auto glass p-8 rounded-3xl shadow">
      <h1 className="text-2xl font-bold mb-4">Your Profile</h1>

      <div className="space-y-3">
        <div>
          <div className="text-sm text-gray-500">Email</div>
          <div className="font-medium">{user.email}</div>
        </div>

        <div>
          <div className="text-sm text-gray-500">User ID</div>
          <div className="text-xs break-all">{user.uid}</div>
        </div>
      </div>

      <button
        onClick={() => signOut(auth)}
        className="mt-6 w-full bg-black text-white py-2 rounded-xl"
      >
        Logout
      </button>
    </div>
  );
}

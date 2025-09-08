import { Button, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center text-xl font-semibold">Profile</h1>
      <form action="" className="flex flex-col gap-4 p-4">
        <div className="w-32 h-32 self-center cursor-pointer shadow-md rounded-full overflow-hidden">
          <img
            src={currentUser.profilePicture}
            alt="user picture"
            className="rounded-full w-full h-full object-cover border-8 border-[lightgray] "
          />
        </div>

        <TextInput
          type="text"
          id="username"
          placeholder="Username"
          defaultValue={currentUser.username}
        />
        <TextInput
          type="text"
          id="email"
          placeholder="Email"
          defaultValue={currentUser.email}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="****"
        />

        <Button type="submit" gradientDuoTone="purpleToBlue" outline >
          Update
        </Button>
      </form>
      <div className="text-red-500 cursor-pointer flex justify-between mt-4">
        <span>Delete Account</span>
        <span>Sign Out</span>
      </div>
    </div>
  );
}

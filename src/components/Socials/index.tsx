import { signIn } from "next-auth/react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

export default function Socials({ csrfToken }: { csrfToken: string }) {
  return (
    <>
      <div className="flex items-center text-slate-500 mt-4">
        <hr className="flex-1 border-slate-500" />
        <span className="mx-2">HOẶC</span>
        <hr className="flex-1 border-slate-500" />
      </div>
      <div className="flex mt-4 justify-center text-6xl gap-4">
        <form
          method="post"
          action="/api/auth/signin/google"
          onSubmit={() => signIn("google")}
        >
          <input type="hidden" name="csrfToken" defaultValue={csrfToken} />
          <button type="submit">
            <FcGoogle />
          </button>
        </form>
        <form
          method="post"
          action="/api/auth/signin/github"
          onClick={() => signIn("github")}
        >
          <input type="hidden" name="csrfToken" defaultValue={csrfToken} />
          <button type="submit">
            <AiFillGithub />
          </button>
        </form>
      </div>
    </>
  );
}

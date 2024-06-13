import { githubLogin, loginFn } from "@/lib/action";

export default function LoginForm() {
  return (
    <>
      <form action={loginFn}>
        <input type="email" name="email" placeholder="Enter Your Email" />
        <input type="password" name="password" placeholder="Enter Your password" />
        <button>로그인</button>
      </form>
      <form action={githubLogin}>
        <button>깃허브 로그인</button>
      </form>
    </>
  );
}

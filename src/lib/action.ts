"use server";

import { redirect } from "next/navigation";
import connectDB from "./db";
import { User } from "./schema";
import { hash } from "bcryptjs";
import { signIn } from "@/auth";

// 회원가입
export async function registerFn(formData: FormData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  if (!name || !email || !password) {
    console.log("입력값이 부족합니다.");
    return;
  }

  connectDB();

  // 있는 회원인지 조회
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    console.log("이미 가입된 회원입니다.");
    return;
  }

  // 없는 회원이면 DB 넣기
  const hashPassword = await hash(String(password), 10);
  const user = new User({
    name,
    email,
    password: hashPassword,
  });
  await user.save();
  redirect("/login");
}

// 로그인
export async function loginFn(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    console.log("입력 값이 부족합니다.");
    return;
  }

  try {
    // auth.js 연동
    console.log(email, password);
    await signIn("credentials", { redirect: false, callbackUrl: "/", email, password });
  } catch (err) {
    console.error(err);
  }
  redirect("/");
}

// 깃허브 로그인
export async function githubLogin() {
  await signIn("github", { callbackUrl: "/" });
}

import React from "react";
import LoginPage from "../components/LoginPage/LoginPage";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
export default async function Page({}) {
  const session = await auth();
  return session !== null ? redirect("/my-quizzes") : <LoginPage />;
}

"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    router.push("/dashboard");
  }, [router]);

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-blue-300 p-8 rounded shadow-md flex flex-col">
        <h1>load</h1>
      </div>
    </div>
  );
}

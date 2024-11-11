"use client";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const { data: session, status } = useSession();
  const [loadingGoogle, setLoadingGoogle] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard/about");
      if (loadingGoogle) setLoadingGoogle(false);
    }
  }, [status]);

  const handleSignInGoogle = async () => {
    setLoadingGoogle(true);
    await signIn("google", { callbackUrl: "/dashboard/about" });
  };

  return (
    <div className="flex min-h-screen bg-gray-100 px-4 py-6">
      <main className="flex-1 flex flex-col items-center justify-center space-y-8 text-gray-800">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Welcome to <span className="text-indigo-600">AuraSpace</span>
          </h1>
          <p className="max-w-md mx-auto text-base sm:text-lg md:text-xl text-gray-600">
            AuraSpace is a platform to create and showcase professional portfolios. Build your online presence with ease and attract new opportunities.
          </p>
        </div>
        <div className="w-full max-w-sm space-y-4">
          <Button
            variant="outline"
            onClick={handleSignInGoogle}
            className="w-full border bg-white text-indigo-600 font-medium hover:bg-gray-50"
            disabled={loadingGoogle}
          >
            <FcGoogle className="mr-2 h-5 w-5" />
            Sign in with Google
            {loadingGoogle && (
              <span
                className="loader2 ml-3"
                style={{ height: "20px", width: "20px", borderWidth: "2px" }}
              ></span>
            )}
          </Button>
        </div>
        <p className="text-xs text-gray-500">
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </p>
      </main>
    </div>
  );
}

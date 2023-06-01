"use client";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAppSelector } from "@/redux/hooks";

const ProtectedScreens = ["/cart", "/checkout"];

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();
  const router = useRouter();

  const { token } = useAppSelector(
    (state) => state.persistedReducer.AuthenticationReducer
  );

  useEffect(() => {
    if (ProtectedScreens.includes(pathName) && !token) {
      router.push("/login");
    }
    if (pathName.includes("/login") && token) {
      router.push("/");
    }
  }, [pathName, token]);

  return <>{children}</>;
}

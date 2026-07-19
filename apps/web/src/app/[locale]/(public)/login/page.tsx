"use client";

import { Logo } from "@soma/ui/logo";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { LoginEmailMethod } from "./_components/login-email-method";
import { LoginMethods } from "./_components/login-methods";

export default function Page() {
  const [step, setStep] = useState<"methods" | "email">("methods");

  return (
    <div className="flex h-full w-full flex-1 flex-col items-center justify-center gap-4">
      <Logo className="-mt-24 size-12 fill-white" />
      <AnimatePresence mode="popLayout">
        {step === "email" ? (
          <motion.div
            key="email"
            initial={{ opacity: 0, scale: 0, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0, filter: "blur(20px)" }}
            transition={{
              duration: 0.5,
              scale: { type: "spring", visualDuration: 0.5, bounce: 0.3 },
              filter: { duration: 0.5 },
            }}
            className="w-full max-w-72"
          >
            <LoginEmailMethod onBack={() => setStep("methods")} />
          </motion.div>
        ) : (
          <motion.div
            key="select"
            initial={{ opacity: 0, scale: 0, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0, filter: "blur(20px)" }}
            transition={{
              duration: 0.5,
              scale: { type: "spring", visualDuration: 0.5, bounce: 0.3 },
              filter: { duration: 0.5 },
            }}
            className="w-full max-w-72"
          >
            <LoginMethods
              onEmailSelect={() => setStep("email")}
              onGoogleSelect={() => {}}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

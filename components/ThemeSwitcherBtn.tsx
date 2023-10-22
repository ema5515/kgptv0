"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";

function ThemeSwitcherBtn() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  // with this trick we are avoiding hydration errors
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return (
      <Button className="animate-spin" size={"icon"} variant={"ghost"}>
        <Sun />
      </Button>
    );

  return (
    <Button
      onClick={() => {
        if (resolvedTheme === "light") {
          setTheme("dark");
        } else {
          setTheme("light");
        }
      }}
      size={"icon"}
      variant={"ghost"}
    >
      {resolvedTheme === "light" && (
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-90 transition-all dark:rotate-0" />
      )}

      {resolvedTheme === "dark" && <Moon className="h-[1.2rem] w-[1.2rem]" />}
    </Button>
  );
}

export default ThemeSwitcherBtn;

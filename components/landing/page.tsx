"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ZapIcon,
  AiMagicIcon,
  CodeIcon,
  SearchIcon,
  BookIcon,
} from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import PixelBlast from "../PixelBlast";
interface LandingPageProps {
  onGetStarted: () => void;
  className?: string;
}

export function LandingPage({ onGetStarted, className }: LandingPageProps) {
  const features = [
    {
      title: "AI Optimized",
      icon: AiMagicIcon,
      desc: "Let Gemini explain and tag your code snippets automatically.",
    },
    {
      title: "Syntax Perfect",
      icon: CodeIcon,
      desc: "Support for 50+ languages with professional syntax themes.",
    },
    {
      title: "Lightning Search",
      icon: SearchIcon,
      desc: "Instant filtering by title, tag, language or folder.",
    },
  ];

  return (
    <div
      className={cn(
        "min-h-screen flex flex-col items-center justify-center p-6 bg-background text-foreground overflow-hidden relative",
        className
      )}
    >
      <div className="w-screen h-screen fixed inset-0 bg-black">
        <PixelBlast color="#644a40" className="" style={{}} />
      </div>

      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl text-center space-y-8 z-10"
      >
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-xl">
            <HugeiconsIcon
              icon={ZapIcon}
              strokeWidth={2}
              className="w-10 h-10 text-primary-foreground"
            />
          </div>
        </div>
        <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-none bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-transparent">
          CodePocket.
        </h1>
        {/* <div className="relative z-20 max-w-2xl mx-auto">
          <p className="text-xl md:text-2xl text-muted-foreground font-medium px-6 py-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
            The minimal, lightning-fast code manager built for the modern
            developer. Organize with AI, access in seconds.
          </p>
        </div> */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={onGetStarted}
            size="lg"
            className="px-10 py-4 text-lg"
          >
            Get Started Free
          </Button>
          <Button variant="secondary" size="lg" className="px-10 py-4 text-lg">
            <HugeiconsIcon icon={BookIcon} strokeWidth={2} />
            Read Docs
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="p-6 bg-card text-card-foreground border border-border rounded-3xl text-left hover:shadow-lg transition-shadow"
            >
              <HugeiconsIcon
                icon={feature.icon}
                strokeWidth={2}
                className="w-8 h-8 mb-4 text-primary"
              />
              <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

import {
  ArrowUpRight,
  Facebook,
  Instagram,
  Linkedin,
  MessageCircle,
  Send,
  Users,
  Youtube,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { COMMUNITY_FACEBOOK_URL } from "./data";

const communityLinks = [
  {
    label: "Facebook Group (Section 0)",
    href: "https://www.facebook.com/share/g/1DFfRP4NY5/",
    icon: Users,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/197aN9pJz4/",
    icon: Facebook,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/competitive.coders",
    icon: Instagram,
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@competitivecoders",
    icon: Youtube,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/competitive-coders/",
    icon: Linkedin,
  },
  {
    label: "WhatsApp",
    href: "https://whatsapp.com/channel/0029VbDaODnFXUuk3Ssnck3K",
    icon: MessageCircle,
  },
  {
    label: "Telegram",
    href: "https://t.me/competitivecoders",
    icon: Send,
  },
];

export function CtaFooter() {
  return (
    <footer
      id="resources"
      className="scroll-mt-24 mt-16 border-t border-border/80 bg-muted/30 px-4 py-14 sm:px-6"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
          <div className="min-w-0">
            <img
              src="https://github.com/user-attachments/assets/7a11bd65-03d6-40f0-a1f3-1a07b5e3e9c8"
              alt="Competitive Coders logo"
              className="h-20 w-20 rounded-xl border border-border bg-white object-contain p-1"
            />
            <h2 className="mt-4 text-3xl font-semibold tracking-tight">Get connected with Competitive Coders</h2>
            <p className="mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
              Join our official communities and stay updated with contests, editorials, and mentorship.
            </p>
            <div className="mt-6">
              <Button variant="electric" size="xl" asChild>
                <a href={COMMUNITY_FACEBOOK_URL} target="_blank" rel="noreferrer">
                  Join Community <ArrowUpRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {communityLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 text-sm transition-colors hover:border-primary/40 hover:text-primary"
              >
                <item.icon className="h-4 w-4 shrink-0" />
                <span className="min-w-0 truncate font-medium">{item.label}</span>
              </a>
            ))}
          </div>
        </div>
        <div className="mt-10 grid gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:grid-cols-[minmax(0,1fr)_auto]">
          <p>© {new Date().getFullYear()} Competitive Coders. All rights reserved.</p>
          <p className="font-mono">built for people who love {"{"}brackets{"}"}</p>
        </div>
      </div>
    </footer>
  );
}

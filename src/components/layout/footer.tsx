import Link from "next/link"
import { SITE_NAME } from "@/lib/constants"

const footerLinks = {
  Tools: [
    { href: "/tools/calculators", label: "Calculators" },
    { href: "/tools/database", label: "Database" },
    { href: "/tools/planning", label: "Planning Tools" },
    { href: "/tools/interactive", label: "Interactive Tools" },
  ],
  Community: [
    { href: "/community", label: "Forums" },
    { href: "/community/feedback", label: "Feedback" },
    { href: "/community/discord", label: "Discord" },
    { href: "/guides", label: "Guides" },
  ],
  Resources: [
    { href: "/blog", label: "Blog" },
    { href: "/changelog", label: "Changelog" },
    { href: "/events", label: "Events" },
    { href: "/faq", label: "FAQ" },
  ],
  Legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/cookies", label: "Cookie Policy" },
  ],
}

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-[#06060e]">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-[#a0a0b0]">
                {title}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#a0a0b0] hover:text-[#00c8ff] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00c8ff] to-[#7c3aed] flex items-center justify-center text-sm font-bold">
              S
            </div>
            <span className="text-sm text-[#a0a0b0]">
              &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
            </span>
          </div>
          <div className="flex items-center gap-4">
            {["Discord", "Twitter", "YouTube", "GitHub"].map((social) => (
              <a
                key={social}
                href="#"
                className="text-[#a0a0b0] hover:text-[#00c8ff] transition-colors text-sm"
              >
                {social}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 p-4 rounded-lg bg-white/5 text-xs text-[#a0a0b0] leading-relaxed">
          <p className="font-semibold mb-1">Disclaimer</p>
          <p>
            {SITE_NAME} is a fan-made companion platform and is not affiliated with or endorsed by
            the game developers. All game data, images, and trademarks are property of their
            respective owners. This tool is provided for educational and entertainment purposes only.
            Game mechanics and values may change with updates; always verify in-game.
          </p>
        </div>
      </div>
    </footer>
  )
}

"use client"
import Link from "next/link"
import { useLocale } from "@/components/language-provider"

export function Footer() {
  const { t } = useLocale()

  const footerLinks = {
    Kingshot: [
      { href: "/kingshot", label: t("footer.kingshotHub") },
      { href: "/kingshot/calculators", label: t("footer.calculators") },
      { href: "/kingshot/database", label: t("footer.database") },
      { href: "/kingshot/bot", label: t("footer.su8lBot") },
    ],
    "SU8L System": [
      { href: "/su8l-system", label: t("footer.overview") },
      { href: "https://discord.gg/VYQjs6wWnN", label: t("footer.support") },
      { href: "https://wa.me/966561261377", label: t("footer.whatsapp") },
      { href: "https://paypal.me/su8ldevs", label: t("footer.donate") },
    ],
    Community: [
      { href: "/community", label: t("footer.forums") },
      { href: "/community/feedback", label: t("footer.feedback") },
    ],
    Resources: [
      { href: "/projects", label: t("footer.projects") },
      { href: "/blog", label: t("footer.blog") },
      { href: "/changelog", label: t("footer.changelog") },
      { href: "/faq", label: t("footer.faq") },
    ],
    Legal: [
      { href: "/legal/privacy", label: t("footer.privacy") },
      { href: "/legal/terms", label: t("footer.terms") },
    ],
  }

  return (
    <footer className="relative border-t border-white/5 bg-[#06060e]">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-[#a0a0b0]">
                {t(`footer.${title.toLowerCase().replace(/\s+/g, '')}`)}
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
              &copy; {new Date().getFullYear()} SU8L DEvs. {t("footer.rights")}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://discord.gg/VYQjs6wWnN" target="_blank" rel="noopener noreferrer" className="text-[#a0a0b0] hover:text-[#00c8ff] transition-colors text-sm">Discord</a>
            <a href="https://www.instagram.com/3erdo?igsh=d2RhdWZlZHpkZmFl&utm_source=qr" target="_blank" rel="noopener noreferrer" className="text-[#a0a0b0] hover:text-[#00c8ff] transition-colors text-sm">Instagram</a>
            <a href="https://www.tiktok.com/@b8n?_r=1&_t=ZS-97BFIcjmVGf" target="_blank" rel="noopener noreferrer" className="text-[#a0a0b0] hover:text-[#00c8ff] transition-colors text-sm">TikTok</a>
            <a href="https://wa.me/966561261377" target="_blank" rel="noopener noreferrer" className="text-[#a0a0b0] hover:text-[#00c8ff] transition-colors text-sm">WhatsApp</a>
          </div>
        </div>

        <div className="mt-8 p-4 rounded-lg bg-white/5 text-xs text-[#a0a0b0] leading-relaxed">
          <p className="font-semibold mb-1">{t("footer.disclaimer")}</p>
          <p>{t("footer.disclaimerText")}</p>
        </div>
      </div>
    </footer>
  )
}

import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 font-bold text-xl mb-4">
              <div className="w-8 h-8 bg-background rounded-lg flex items-center justify-center text-foreground text-sm font-bold">
                S
              </div>
              SecurePolicy
            </div>
            <p className="text-background/70 text-sm">Digital insurance platform for seamless policy management</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li>
                <Link href="#" className="hover:text-background transition">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-background transition">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-background transition">
                  Security
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li>
                <Link href="#" className="hover:text-background transition">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-background transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-background transition">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li>
                <Link href="#" className="hover:text-background transition">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-background transition">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-background transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-background/70">&copy; 2025 SecurePolicy. All rights reserved.</p>
          <div className="flex gap-6 text-background/70 text-sm">
            <Link href="#" className="hover:text-background transition">
              Twitter
            </Link>
            <Link href="#" className="hover:text-background transition">
              LinkedIn
            </Link>
            <Link href="#" className="hover:text-background transition">
              GitHub
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

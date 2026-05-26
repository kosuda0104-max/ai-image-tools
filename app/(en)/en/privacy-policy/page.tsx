import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | AI Image Tools",
  description:
    "This page explains how AI Image Tools handles cookies, Google AdSense advertising, analytics, and contact form data.",
};

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <section className="border-b border-gray-200 bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-4xl px-4 py-16">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-gray-900">Privacy Policy</h1>
            <p className="text-lg leading-8 text-gray-600">
              This page explains how AI Image Tools handles cookies, advertising through Google AdSense, analytics, and information submitted through the contact form.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="space-y-10">

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-gray-900">Use of Cookies</h2>
            <div className="space-y-3 text-sm leading-7 text-gray-700">
              <p>
                This site uses cookies for analytics and advertising purposes. Cookies are small data files stored in your browser that help us understand how the site is used and improve the relevance of ads shown to visitors.
              </p>
              <p>
                You can disable cookies through your browser settings. Note that some features of the site may become less convenient if cookies are disabled.
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-gray-900">Google AdSense Advertising</h2>
            <div className="space-y-3 text-sm leading-7 text-gray-700">
              <p>
                This site uses <strong>Google AdSense</strong> to display advertisements. Google AdSense is an advertising service provided by Google LLC.
              </p>
              <p>
                Google and its partner companies may use cookies — including the DoubleClick cookie — to serve ads based on a user&apos;s prior visits to this site and other sites on the internet. This allows Google to show ads that may be relevant to your interests.
              </p>
              <p>
                You can opt out of personalized advertising by visiting{" "}
                <a
                  href="https://www.google.com/settings/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  Google&apos;s Ads Settings page
                </a>
                . You can also opt out of third-party vendor cookies through{" "}
                <a
                  href="https://www.aboutads.info/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  aboutads.info
                </a>
                .
              </p>
              <p>
                For more information on how Google handles data, see the{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  Google Privacy Policy
                </a>
                .
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-gray-900">Analytics</h2>
            <div className="space-y-3 text-sm leading-7 text-gray-700">
              <p>
                This site may use analytics tools to understand usage patterns and improve the service. Analytics data helps us see which pages are most useful and how visitors navigate the site.
              </p>
              <p>
                Analytics data is used only to identify statistical trends and is not used to identify individual users.
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-gray-900">Information We May Collect</h2>
            <div className="space-y-3 text-sm leading-7 text-gray-700">
              <p>
                For analytics and advertising purposes, the site may collect basic access data such as page views, browser type, and referral sources. This data does not identify individual visitors.
              </p>
              <p>
                When you use the contact form, we may receive your name, email address, and message content to respond to your inquiry. This information is used solely for support purposes.
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-gray-900">Changes and Contact</h2>
            <div className="space-y-3 text-sm leading-7 text-gray-700">
              <p>
                This policy may be updated to reflect changes in law or site operations. Changes will be posted on this page.
              </p>
              <p>
                If you have questions about privacy, please reach out through the{" "}
                <Link href="/en/contact" className="text-blue-600 underline">
                  contact page
                </Link>
                .
              </p>
            </div>
          </section>

          <section className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
            <div className="flex flex-wrap gap-3">
              <Link
                href="/en/tools"
                className="rounded-xl bg-black px-5 py-3 text-sm font-medium text-white"
              >
                Tools
              </Link>
              <Link
                href="/en/guides"
                className="rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-800"
              >
                Guides
              </Link>
              <Link
                href="/en/about"
                className="rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-800"
              >
                About
              </Link>
              <Link
                href="/en/contact"
                className="rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-800"
              >
                Contact
              </Link>
            </div>
          </section>

        </div>
      </section>
    </main>
  );
}

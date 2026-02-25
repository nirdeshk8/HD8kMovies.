import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 container py-8 max-w-4xl">
        {/* Hero */}
        <div className="text-center mb-8 py-6 bg-card rounded-lg border border-border">
          <div className="flex items-center justify-center gap-4 mb-2">
            <img src="/hd8k-logo.svg" alt="HD8Kmovies" className="h-16 w-auto" />
            <h1 className="font-display text-3xl md:text-4xl text-gradient-gold font-bold">HD8Kmovies</h1>
          </div>
          <p className="text-foreground font-display text-xl tracking-wide text-center">
            <span className="font-semibold">HD8Kmovies</span> : The Best Free Site for Movie Lovers
          </p>
          <div className="mt-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground hover:opacity-90 transition-opacity"
            >
              View Full Site ➜
            </Link>
          </div>
          <div className="mt-4 inline-flex items-center gap-2 border-l-4 border-primary pl-3">
            <span className="text-sm font-semibold text-foreground">Share HD8Kmovies</span>
            <span className="text-xs text-muted-foreground">to your friends</span>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8 text-sm leading-relaxed">
          <section>
            <h2 className="font-display text-2xl text-foreground mb-3">Brief overview of HD8Kmovies website</h2>
            <p className="text-muted-foreground">
              HD8Kmovies is the ultimate destination for movie lovers in the Indian subcontinent, offering a wide range of films in various languages and quality options. Whether you're looking to download the latest Bollywood hits, regional films, or international blockbusters, here's why HD8Kmovies stands out as a top choice:
            </p>
            <p className="text-muted-foreground mt-3">
              HD8Kmovies offers an extensive library of movies across a variety of languages, making it a go-to platform for viewers from different linguistic backgrounds. You can find movies in Hindi, Punjabi, Marathi, Tamil, Telugu, Malayalam, as well as English. Additionally, we provide a large collection of Hindi Dubbed movies and Dual Audio films for those who prefer to watch content in multiple languages with Subtitles.
            </p>
            <p className="text-muted-foreground mt-3">
              Despite its popularity, HD8Kmovies exists in a grey area of legality, as it provides movies and TV shows without the proper licensing from content creators. While the platform doesn't charge users for access, it may still carry risks, such as intrusive ads or exposure to malicious links.
            </p>
            <p className="text-muted-foreground mt-3">
              One of the features of HD8Kmovies is the availability of high-speed download links. The platform offers multiple mirror sites for downloading movies, including Google Drive, Indishare, and Clicknupload. These options ensure that you can quickly and easily download your favorite films without any hassle, even during peak times.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-foreground mb-3">The rise of streaming services and how HD8Kmovies stands out</h2>
            <p className="text-muted-foreground mb-4">
              Over the past decade, streaming services have experienced an explosive rise in popularity, fundamentally changing how people consume entertainment. Traditional television and cable are becoming less dominant as more viewers turn to platforms that allow them to watch movies and TV shows on-demand via the internet.
            </p>

            <h3 className="font-display text-lg text-foreground mt-4 mb-2">The Growth of Streaming Services</h3>
            <ul className="list-disc pl-5 text-muted-foreground space-y-2">
              <li><strong className="text-foreground">Convenience and Flexibility:</strong> Streaming platforms like Netflix, Amazon Prime Video, Disney+, and Hulu have become household names due to their convenience. They offer on-demand access to vast libraries of movies, TV shows, and original content.</li>
              <li><strong className="text-foreground">Affordable Alternatives:</strong> Streaming services offered lower subscription costs compared to cable TV, making them an attractive option for budget-conscious viewers.</li>
              <li><strong className="text-foreground">Variety of Content:</strong> These services have increasingly expanded their offerings, from blockbuster movies and hit TV series to exclusive, high-budget original programming.</li>
            </ul>

            <h3 className="font-display text-lg text-foreground mt-6 mb-2">Challenges with Paid Streaming Services</h3>
            <ul className="list-disc pl-5 text-muted-foreground space-y-2">
              <li><strong className="text-foreground">Subscription Fatigue:</strong> The number of subscriptions needed to access different libraries has increased, leading to "subscription fatigue" as users juggle multiple monthly payments.</li>
              <li><strong className="text-foreground">Regional Restrictions:</strong> Many streaming platforms impose geographic restrictions that limit access to content depending on the user's location.</li>
            </ul>

            <h3 className="font-display text-lg text-foreground mt-6 mb-2">How HD8Kmovies Stands Out</h3>
            <ul className="list-disc pl-5 text-muted-foreground space-y-2">
              <li><strong className="text-foreground">Completely Free Access:</strong> Unlike subscription-based streaming services, HD8Kmovies offers free, unrestricted access to movies and TV shows.</li>
              <li><strong className="text-foreground">No Account or Subscription Needed:</strong> Anyone can access the content instantly with no barriers to entry.</li>
              <li><strong className="text-foreground">Massive Content Library:</strong> HD8Kmovies offers a diverse and extensive range of movies and TV shows, including both the latest releases and older titles.</li>
              <li><strong className="text-foreground">No Geographic Restrictions:</strong> Users worldwide can enjoy the same selection regardless of where they live.</li>
              <li><strong className="text-foreground">User-Friendly Interface:</strong> Simple and easy to navigate without complex subscription setups.</li>
              <li><strong className="text-foreground">No Advertisements (In Some Cases):</strong> HD8Kmovies might offer fewer interruptions, providing a more enjoyable viewing experience.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl text-foreground mb-3">Why HD8Kmovies is the Best Choice for Watching Movies Online for Free</h2>

            <h3 className="font-display text-lg text-foreground mt-4 mb-2">1. High-Quality Content (HD Streaming)</h3>
            <p className="text-muted-foreground">
              One of the major selling points of HD8Kmovies is the quality of its streaming. While many free movie websites are known for low-quality video and audio, HD8Kmovies offers high-definition (HD) streaming for many of its movies and TV shows.
            </p>

            <h3 className="font-display text-lg text-foreground mt-4 mb-2">2. Easy Navigation and Accessibility</h3>
            <p className="text-muted-foreground">
              HD8Kmovies has a user-friendly interface that makes it easy for visitors to find and stream their favorite movies. The website is simple and intuitive, with categories and filters to help users quickly locate content.
            </p>

            <h3 className="font-display text-lg text-foreground mt-4 mb-2">3. No Subscription or Sign-Up Required</h3>
            <p className="text-muted-foreground">
              One of the best things about HD8Kmovies is that it requires no subscription or sign-up process. Anyone can start watching movies immediately.
            </p>

            <h3 className="font-display text-lg text-foreground mt-4 mb-2">4. Wide Range of Genres and Content</h3>
            <p className="text-muted-foreground">
              HD8Kmovies offers a diverse library spanning all kinds of genres, from action and drama to comedy, horror, documentaries, and more.
            </p>

            <h3 className="font-display text-lg text-foreground mt-4 mb-2">5. Free Access Without Hidden Fees</h3>
            <p className="text-muted-foreground">
              Unlike many other platforms that claim to offer free content but then surprise users with hidden fees, HD8Kmovies is genuinely free.
            </p>

            <h3 className="font-display text-lg text-foreground mt-4 mb-2">6. Regular Updates and New Releases</h3>
            <p className="text-muted-foreground">
              HD8Kmovies consistently adds the latest movies and TV shows to its collection, ensuring users always have access to the newest content.
            </p>

            <h3 className="font-display text-lg text-foreground mt-4 mb-2">7. No Geographic Restrictions</h3>
            <p className="text-muted-foreground">
              HD8Kmovies provides access to movies and TV shows from all over the world with no limitations based on location.
            </p>

            <h3 className="font-display text-lg text-foreground mt-4 mb-2">8. Ad-Free Experience (In Some Cases)</h3>
            <p className="text-muted-foreground">
              HD8Kmovies minimizes interruptions and offers a smoother viewing experience compared to other free streaming sites.
            </p>

            <h3 className="font-display text-lg text-foreground mt-4 mb-2">9. Secure and Safe Browsing</h3>
            <p className="text-muted-foreground">
              HD8Kmovies provides a relatively safe environment for movie streaming, with fewer risks of malware or viruses compared to some other free movie sites.
            </p>
          </section>

          <section className="text-center py-6">
            <p className="text-muted-foreground">
              Explore HD8Kmovies and dive into a vast library of movies and TV shows, all available to stream for free. Whether you're a fan of action, comedy, drama, or thrillers, there's something for everyone. Enjoy high-quality content with no subscriptions or hidden fees—just endless entertainment at your fingertips. Start streaming today!
            </p>
            <p className="text-muted-foreground mt-4 font-semibold">Thank you!</p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;

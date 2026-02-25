import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card py-6 mt-12">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground flex items-center gap-2">
            <img src="/hd8k-logo.svg" alt="HD8Kmovies" className="h-6 w-auto" />
            <span>{new Date().getFullYear()} © <span className="text-primary font-semibold">HD8Kmovies.Tv</span> | All Rights Reserved.</span>
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            <Link to="/about" className="text-xs text-primary hover:underline">Disclaimer</Link>
            <Link to="/" className="text-xs text-primary hover:underline">Join Our Group !</Link>
            <Link to="/" className="text-xs text-primary hover:underline">How To Download ?</Link>
            <Link to="/" className="text-xs text-primary hover:underline">Movie Request Page</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

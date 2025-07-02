import React from 'react';
import { RiPenNibFill } from 'react-icons/ri';

function Footer() {
  return (
    <footer className="bg-[rgba(28,24,75,255)] text-[rgba(161,177,255,255)] py-10 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Left: Author Info */}
        <div className="text-center md:text-left">
          <h1
            className="text-3xl font-bold flex justify-center md:justify-start items-center gap-1 cursor-pointer hover:underline transition duration-200"
          >
            <RiPenNibFill />Scribly
          </h1>
          <p className="text-sm italic text-indigo-300 mt-1">Think. Create. Share.</p>
          <p className="text-sm text-gray-400 mt-3">
            <span className="font-medium text-white">Sanjay D</span> — Founder
          </p>
        </div>

        {/* Center: What We Publish */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-white mb-2">What We Publish</h3>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>🔹 Full-stack development tips</li>
            <li>🔹 Real-world project guides</li>
            <li>🔹 Clean code & best practices</li>
            <li>🔹 Tech opinions & explainers</li>
          </ul>
        </div>

        {/* Right: Writing Philosophy */}
        <div className="text-center md:text-right">
          <h3 className="text-lg font-semibold text-white mb-2">Why I Write</h3>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>✍️ To simplify complex ideas</li>
            <li>📚 To help others avoid the mistakes I made</li>
            <li>💡 To turn practice into perspective</li>
            <li>🤝 To share, not just show</li>
          </ul>
        </div>
      </div>

      {/* Bottom Divider */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Sanjay D. Built with passion and purpose.
      </div>
    </footer>
  );
}

export default Footer;

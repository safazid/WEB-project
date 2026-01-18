export default function SocialIcons() {
  return (
    <section
      className="w-full py-10 text-center"
      style={{ color: "var(--text-sub)" }}
    >
      <div className="flex justify-center gap-8 mb-4">

        {/* Instagram */}
        <a href="#" className="hover:opacity-80 transition" aria-label="Instagram">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="var(--secondary)"
            viewBox="0 0 24 24"
          >
            <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 
            5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 
            2c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 
            3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3h10zm-5 
            3c-2.757 0-5 2.243-5 5s2.243 5 5 5 5-2.243 
            5-5-2.243-5-5-5zm0 2c1.654 0 3 1.346 3 
            3s-1.346 3-3 3-3-1.346-3-3 1.346-3 
            3-3zm4.5-.25a1.25 1.25 0 110-2.5 1.25 
            1.25 0 010 2.5z"/>
          </svg>
        </a>

        {/* Facebook */}
        <a href="#" className="hover:opacity-80 transition" aria-label="Facebook">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="var(--secondary)"
            viewBox="0 0 24 24"
          >
            <path d="M22 12a10 10 0 10-11.5 9.9v-7h-2v-3h2v-2.3c0-2 
            1.2-3.1 3-3.1.9 0 1.8.1 1.8.1v2h-1c-1 
            0-1.3.6-1.3 1.2V12h2.3l-.4 3h-1.9v7A10 
            10 0 0022 12z"/>
          </svg>
        </a>

        {/* LinkedIn */}
        <a href="#" className="hover:opacity-80 transition" aria-label="LinkedIn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="var(--secondary)"
            viewBox="0 0 24 24"
          >
            <path d="M20.447 20.452H17.21V14.83c0-1.34-.027-3.065-1.868-3.065-1.87 
            0-2.157 1.46-2.157 2.968v5.72H9.01V9h3.112v1.561h.043c.434-.82 
            1.494-1.683 3.073-1.683 3.287 0 3.894 2.164 3.894 4.977v6.597zM5.337 
            7.433a1.802 1.802 0 110-3.604 1.802 1.802 0 010 3.604zM6.98 
            20.452H3.69V9h3.29v11.452zM22.225 0H1.771C.792 0 0 
            .774 0 1.729v20.542C0 23.227.792 24 1.771 
            24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 
            .774 23.2 0 22.225 0z"/>
          </svg>
        </a>

      </div>

      <p className="opacity-80 text-sm">
        Follow us for updates & fitness tips
      </p>
    </section>
  );
}

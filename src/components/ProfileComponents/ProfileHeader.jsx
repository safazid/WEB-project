// Profile header section displayed at the top of the Profile page.
// Shows the user's avatar, name, and email in a centered layout.
//
// Props:
// - profile: object containing user data (name, email, etc.)
//
// The avatar is currently a placeholder icon and can later be
// replaced with a real uploaded profile image.
export default function ProfileHeader({ profile }) {
  return (
    <div className="flex flex-col items-center text-center mb-8">
      <div className="w-24 h-24 rounded-full bg-[var(--primary-soft)] flex items-center justify-center">
        <img
          src="https://fonts.gstatic.com/s/i/materialiconsoutlined/account_circle/v6/24px.svg"
          alt="Profile avatar"
          className="w-16 h-16 opacity-70"
        />
      </div>

      <h2 className="mt-4 text-xl font-semibold">{profile.name}</h2>
      <p className="text-sm text-[var(--text-sub)]">{profile.email}</p>
    </div>
  );
}
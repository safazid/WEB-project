export default function ProfileAchievements({ progress }) {
  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold text-center mb-4">Achievements</h3>

      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="bg-teal-500 h-3 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="text-center mt-2 text-gray-600">
        Pro Level – {progress}% completed
      </p>
    </div>
  );
}

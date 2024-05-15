export default function Page() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Weekly Calendar</h1>
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Previous Week
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Next Week
          </button>
        </div>
      </div>

      <div className="grid grid-cols-8 gap-2">
        <div className="bg-green-200 p-2">Time</div>
        <div className="bg-green-200 p-2">Monday</div>
        <div className="bg-green-200 p-2">Tuesday</div>
        <div className="bg-green-200 p-2">Wednesday</div>
        <div className="bg-green-200 p-2">Thursday</div>
        <div className="bg-green-200 p-2">Friday</div>
        <div className="bg-green-200 p-2">Saturday</div>
        <div className="bg-green-200 p-2">Sunday</div>

        <div className="p-2">8:00 AM</div>
        <div className="p-2 bg-blue-200">Meeting</div>
        <div className="p-2 bg-red-200">Gym</div>
        <div className="p-2 bg-yellow-200">Lunch</div>
        <div className="p-2 bg-green-200">Workout</div>
        <div className="p-2">-</div>
        <div className="p-2">-</div>
        <div className="p-2">-</div>

        <div className="p-2">9:00 AM</div>
        <div className="p-2">-</div>
        <div className="p-2">-</div>
        <div className="p-2">-</div>
        <div className="p-2">-</div>
        <div className="p-2 bg-purple-200">Yoga</div>
        <div className="p-2 bg-orange-200">Dinner</div>
        <div className="p-2">-</div>
      </div>
    </div>
  );
}

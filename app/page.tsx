'use client';

import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const exercisesList = {
  pull: [
    'Trazioni',
    'Lat Machine',
    'Rematore',
    'Seated Close Row',
    'Reverse Grip Lat Machine',
    'Curl con Bilanciere/Manubri',
    'Wrist Curl',
    'Macchina Schiena Buttarsi Avanti'
  ],
  push: [
    'Alzate Inclinate su Panca',
    'Shoulder Press',
    'Panca Piana',
    'Lateral Raises',
    'Piegamenti',
    'Dips',
    'Push Down al Cavo',
    'Estensioni Tricipiti Sopra la Testa'
  ],
  legs: [
    'Leg Extension',
    'Affondi',
    'Squat',
    'Leg Press',
    'Leg Curl',
    'Calf Raises'
  ],
};

// Funzione per ottenere la data e l'ora attuali nel formato YYYY-MM-DDTHH:MM
const getTodayDateTime = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0'); // Mesi da 0 a 11
  const dd = String(today.getDate()).padStart(2, '0');
  const hh = String(today.getHours()).padStart(2, '0');
  const min = String(today.getMinutes()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
};

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [name, setName] = useState('');
  const [repetitions, setRepetitions] = useState('');
  const [weight, setWeight] = useState('');
  const [sets, setSets] = useState('');
  const [dateTime, setDateTime] = useState(getTodayDateTime());
  const [exercises, setExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);

  useEffect(() => {
    const fetchExercises = async () => {
      const response = await fetch('/api/exercise');
      if (response.ok) {
        const data = await response.json();
        setExercises(data);
      }
    };
    fetchExercises();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      setFilteredExercises(exercises.filter(exercise => exercise.category === selectedCategory));
    }
  }, [selectedCategory, exercises]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/exercise', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, repetitions: Number(repetitions), weight: Number(weight), sets: Number(sets), date: new Date(dateTime), category: selectedCategory }),
    });

    if (response.ok) {
      const newExercise = await response.json();
      setExercises([...exercises, newExercise]);
      // Reset the form fields
      setName('');
      setRepetitions('');
      setWeight('');
      setSets('');
      setDateTime(getTodayDateTime());
      toast.success('Exercise added successfully!');
    } else {
      toast.error('Failed to add exercise.');
    }
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setName('');
    setRepetitions('');
    setWeight('');
    setSets('');
    setDateTime(getTodayDateTime());
    setFilteredExercises(exercises.filter(exercise => exercise.category === category));
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col items-center justify-center">
      <ToastContainer />
      {!selectedCategory ? (
        <div className="flex flex-col items-center justify-center h-screen space-y-6">
          <h1 className="text-4xl font-bold mb-6 text-gray-900">Welcome to Gym Tracker</h1>
          <div className="space-x-4">
            <button
              onClick={() => handleCategorySelect('pull')}
              className="px-6 py-3 bg-yellow-500 rounded-full hover:bg-yellow-600 text-xl text-white shadow-lg transition duration-300"
            >
              🏋️ Pull
            </button>
            <button
              onClick={() => handleCategorySelect('push')}
              className="px-6 py-3 bg-yellow-500 rounded-full hover:bg-yellow-600 text-xl text-white shadow-lg transition duration-300"
            >
              💪 Push
            </button>
            <button
              onClick={() => handleCategorySelect('legs')}
              className="px-6 py-3 bg-yellow-500 rounded-full hover:bg-yellow-600 text-xl text-white shadow-lg transition duration-300"
            >
              🏃‍♂️ Legs
            </button>
          </div>
        </div>
      ) : (
        <div className="container mx-auto p-4">
          <button
            onClick={() => setSelectedCategory('')}
            className="mb-4 px-4 py-2 bg-yellow-500 rounded-full hover:bg-yellow-600 text-white shadow-lg transition duration-300"
          >
            ⬅️ Back
          </button>
          <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Exercise Name</label>
                <select
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm text-black"
                  required
                >
                  <option value="">Select an exercise</option>
                  {exercisesList[selectedCategory].map((exercise) => (
                    <option key={exercise} value={exercise}>
                      {exercise}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date & Time</label>
                <input
                  type="datetime-local"
                  value={dateTime}
                  onChange={(e) => setDateTime(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm text-black"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Sets</label>
              <input
                type="number"
                value={sets}
                onChange={(e) => setSets(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm text-black"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Repetitions</label>
              <input
                type="number"
                value={repetitions}
                onChange={(e) => setRepetitions(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm text-black"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm text-black"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition duration-300"
            >
              Add Exercise
            </button>
          </form>
          <div className="mt-8 bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Exercises</h2>
            <ul className="space-y-2">
              {filteredExercises.map((exercise) => (
                <li key={exercise.id} className="border-b border-gray-200 pb-2">
                  {exercise.name}: {exercise.repetitions} reps, {exercise.weight} kg, {exercise.sets} sets on{' '}
                  {new Date(exercise.date).toLocaleString()}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import NewRoutinePage from '../NewRoutinePage/NewRoutinePage';
import RoutinesPage from '../RoutinesPage/RoutinesPage';
import NavBar from '../../components/NavBar/NavBar';
import HomePage from '../HomePage/HomePage';
import ExercisesPage from '../ExercisesPage/ExercisesPage';
import NewExercisePage from '../NewExercisePage/NewExercisePage';
import MedicationsPage from '../MedicationsPage/MedicationsPage';
import NewMedicationPage from '../NewMedicationPage/NewMedicationPage';

export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
            <NavBar user={user} setUser={setUser} />
            <Routes>
              <Route path="/" element={<HomePage user={user} />} />
              <Route path="/auth" element={<AuthPage setUser={setUser} />} />
              <Route path="/routines/new" element={<NewRoutinePage />} />
              <Route path="/routines" element={<RoutinesPage />} />
              <Route path="/exercises" element={<ExercisesPage />} />
              <Route path="/exercises/new" element={<NewExercisePage />} />
              <Route path="/medications" element={<MedicationsPage />} />
              <Route path="/medications/new" element={<NewMedicationPage />} />
              <Route path="/*" element={<Navigate to="/" />} />
            </Routes>
    </main>
  );
}
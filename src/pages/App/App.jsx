import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import NewRoutinePage from '../NewRoutinePage/NewRoutinePage';
import RoutinesPage from '../RoutinesPage/RoutinesPage';
import NavBar from '../../components/NavBar/NavBar';
// import HomePage from '../HomePage';
// import ExercisesListPage from '../ExercisesPage';
// import NewExercisePage from '../NewExercisePage';
// import MedicationsListPage from '../MedicationsPage';
// import NewMedicationPage from '../NewMedicationPage';

export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      { user ?
          <>
            <NavBar user={user} setUser={setUser} />
            <Routes>
              {/* <Route path="/" element={<HomePage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/exercises" element={<ExercisesListPage />} />
              <Route path="/exercises/new" element={<NewExercisePage />} />
              <Route path="/medications" element={<MedicationsListPage />} />
              <Route path="/medications/new" element={<NewMedicationPage />} />
              <Route path="/*" element={<Navigate to="/" />} /> */}
              <Route path="/routines/new" element={<NewRoutinePage />} />
              <Route path="/routines" element={<RoutinesPage />} />
            </Routes>
          </>
          :
          <AuthPage setUser={setUser} />
      }
    </main>
  );
}
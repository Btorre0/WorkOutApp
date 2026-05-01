import { useEffect, useMemo, useState } from "react";
import "./App.css";

const categories = [
  "All",
  "Upper Body",
  "Legs",
  "Cardio",
  "Heavy Lifting",
  "Core",
  "Full Body",
];

const days = [
  "Any",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const recommendedExercises = {
  "Upper Body": ["Bench Press", "Rows", "Shoulder Press", "Lat Pulldown"],
  Legs: ["Squats", "Lunges", "Hip Thrusts", "Leg Press"],
  Cardio: ["Treadmill", "Cycling", "Jump Rope", "Stairmaster"],
  "Heavy Lifting": ["Deadlift", "Squats", "Bench Press", "Barbell Rows"],
  Core: ["Plank", "Russian Twists", "Crunches", "Leg Raises"],
  "Full Body": ["Burpees", "Deadlift", "Squats", "Mountain Climbers"],
};

const popularVideos = [
  {
    title: "Full Body Workout",
    creator: "YouTube workout video",
    url: "https://www.youtube.com/watch?v=hpyT2v04Bj0",
    videoId: "hpyT2v04Bj0",
    category: "Full Body",
  },
  {
    title: "Strength Training",
    creator: "YouTube workout video",
    url: "https://www.youtube.com/watch?v=qus4gntUw-o",
    videoId: "qus4gntUw-o",
    category: "Strength",
  },
  {
    title: "Gym Routine",
    creator: "YouTube workout video",
    url: "https://www.youtube.com/watch?v=vWk2bXYZjwE",
    videoId: "vWk2bXYZjwE",
    category: "Gym",
  },
  {
    title: "Home Workout",
    creator: "YouTube workout video",
    url: "https://www.youtube.com/watch?v=70VfClKGxgA",
    videoId: "70VfClKGxgA",
    category: "Home",
  },
  {
    title: "Core and Conditioning",
    creator: "YouTube workout video",
    url: "https://www.youtube.com/watch?v=kZDvg92tTMc",
    videoId: "kZDvg92tTMc",
    category: "Core",
  },
];

const trendingWorkouts = [
  {
    name: "Push Day",
    category: "Upper Body",
    day: "Monday",
    difficulty: "Beginner",
    duration: "45",
    intensity: "Moderate",
    notes: "Chest, shoulders, and triceps.",
    exercises: [
      {
        name: "Bench Press",
        description: "Control the movement and keep your back stable.",
        sets: "3",
        reps: "10",
        weight: "65",
      },
      {
        name: "Shoulder Press",
        description: "Press upward without arching your back.",
        sets: "3",
        reps: "10",
        weight: "25",
      },
    ],
  },
  {
    name: "Glute Day",
    category: "Legs",
    day: "Tuesday",
    difficulty: "Intermediate",
    duration: "60",
    intensity: "Moderate",
    notes: "Lower body workout focused on glutes and legs.",
    exercises: [
      {
        name: "Hip Thrusts",
        description: "Pause at the top of each rep.",
        sets: "4",
        reps: "10",
        weight: "115",
      },
      {
        name: "Squats",
        description: "Keep chest up and push through your heels.",
        sets: "4",
        reps: "8",
        weight: "95",
      },
    ],
  },
  {
    name: "Core Strength",
    category: "Core",
    day: "Wednesday",
    difficulty: "Beginner",
    duration: "30",
    intensity: "Light",
    notes: "Core routine for stability and control.",
    exercises: [
      {
        name: "Plank",
        description: "Keep your body straight and core tight.",
        sets: "3",
        reps: "45 sec",
        weight: "0",
      },
      {
        name: "Crunches",
        description: "Move slowly and avoid pulling your neck.",
        sets: "3",
        reps: "15",
        weight: "0",
      },
    ],
  },
  {
    name: "Full Body Burn",
    category: "Full Body",
    day: "Friday",
    difficulty: "Advanced",
    duration: "50",
    intensity: "Intense",
    notes: "Strength and conditioning mixed together.",
    exercises: [
      {
        name: "Deadlift",
        description: "Keep your back straight and lift with control.",
        sets: "4",
        reps: "6",
        weight: "135",
      },
      {
        name: "Mountain Climbers",
        description: "Keep a steady pace and tight core.",
        sets: "3",
        reps: "30",
        weight: "0",
      },
    ],
  },
];

const sampleWorkouts = [
  {
    id: crypto.randomUUID(),
    name: "Leg Day",
    category: "Legs",
    day: "Monday",
    notes: "Warm up first and focus on form.",
    mood: "Focused",
    duration: "60",
    intensity: "Moderate",
    difficulty: "Intermediate",
    completed: true,
    exercises: [
      {
        id: crypto.randomUUID(),
        name: "Squats",
        description: "Keep chest up and push through your heels.",
        sets: "4",
        reps: "8",
        weight: "95",
      },
      {
        id: crypto.randomUUID(),
        name: "Hip Thrusts",
        description: "Pause at the top of the movement.",
        sets: "4",
        reps: "10",
        weight: "115",
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    name: "Upper Body",
    category: "Upper Body",
    day: "Wednesday",
    notes: "Focus on controlled reps.",
    mood: "Strong",
    duration: "45",
    intensity: "Moderate",
    difficulty: "Beginner",
    completed: false,
    exercises: [
      {
        id: crypto.randomUUID(),
        name: "Bench Press",
        description: "Keep shoulders stable.",
        sets: "3",
        reps: "10",
        weight: "65",
      },
      {
        id: crypto.randomUUID(),
        name: "Rows",
        description: "Pull with your back, not just arms.",
        sets: "3",
        reps: "12",
        weight: "45",
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    name: "Cardio Day",
    category: "Cardio",
    day: "Friday",
    notes: "Light day for movement and endurance.",
    mood: "Motivated",
    duration: "30",
    intensity: "Light",
    difficulty: "Beginner",
    completed: false,
    exercises: [
      {
        id: crypto.randomUUID(),
        name: "Treadmill",
        description: "Steady pace.",
        sets: "1",
        reps: "30",
        weight: "0",
      },
    ],
  },
];

function App() {
  const [workouts, setWorkouts] = useState(() => {
    const saved = localStorage.getItem("gym-workout-tracker");
    return saved ? JSON.parse(saved) : sampleWorkouts;
  });

  const [formData, setFormData] = useState({
    name: "",
    category: "Upper Body",
    day: "Monday",
    notes: "",
    mood: "Focused",
    duration: "",
    intensity: "Moderate",
    difficulty: "Beginner",
  });

  const [exerciseData, setExerciseData] = useState({
    workoutId: "",
    name: "",
    description: "",
    sets: "",
    reps: "",
    weight: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [dayFilter, setDayFilter] = useState("Any");
  const [searchTerm, setSearchTerm] = useState("");
  const [weeklyGoal, setWeeklyGoal] = useState(() => {
    const savedGoal = Number(localStorage.getItem("weekly-workout-goal")) || 4;

    if (savedGoal > 7) return 7;
    if (savedGoal < 1) return 1;

    return savedGoal;
  });

  useEffect(() => {
    localStorage.setItem("gym-workout-tracker", JSON.stringify(workouts));
  }, [workouts]);

  useEffect(() => {
    localStorage.setItem("weekly-workout-goal", weeklyGoal);
  }, [weeklyGoal]);

  const filteredWorkouts = useMemo(() => {
    return workouts.filter((workout) => {
      const categoryMatch =
        categoryFilter === "All" || workout.category === categoryFilter;

      const dayMatch = dayFilter === "Any" || workout.day === dayFilter;

      const searchMatch =
        workout.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        workout.exercises.some((exercise) =>
          exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

      return categoryMatch && dayMatch && searchMatch;
    });
  }, [workouts, categoryFilter, dayFilter, searchTerm]);

  const totalExercises = workouts.reduce(
    (total, workout) => total + workout.exercises.length,
    0
  );

  const totalSets = workouts.reduce((total, workout) => {
    return (
      total +
      workout.exercises.reduce(
        (exerciseTotal, exercise) =>
          exerciseTotal + (Number.parseFloat(exercise.sets) || 0),
        0
      )
    );
  }, 0);

  const totalVolume = workouts.reduce((total, workout) => {
    return total + getWorkoutVolume(workout);
  }, 0);

  const completedWorkouts = workouts.filter((workout) => workout.completed).length;

  const totalCalories = workouts.reduce((total, workout) => {
    return total + estimateCalories(workout.duration, workout.intensity);
  }, 0);

  const favoriteCategory =
    workouts.length === 0 ? "None" : getFavoriteCategory(workouts);

  const goalPercent =
    weeklyGoal > 0
      ? Math.min(Math.round((completedWorkouts / weeklyGoal) * 100), 100)
      : 0;

  const currentRecommendations =
    recommendedExercises[formData.category] || recommendedExercises["Full Body"];

  const chartData = getChartData(workouts);

  const handleWorkoutSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) return;

    if (editingId) {
      setWorkouts((prev) =>
        prev.map((workout) =>
          workout.id === editingId ? { ...workout, ...formData } : workout
        )
      );
      setEditingId(null);
    } else {
      const newWorkout = {
        id: crypto.randomUUID(),
        ...formData,
        completed: false,
        exercises: [],
      };

      setWorkouts((prev) => [newWorkout, ...prev]);
    }

    setFormData({
      name: "",
      category: "Upper Body",
      day: "Monday",
      notes: "",
      mood: "Focused",
      duration: "",
      intensity: "Moderate",
      difficulty: "Beginner",
    });
  };

  const handleExerciseSubmit = (e) => {
    e.preventDefault();

    if (!exerciseData.workoutId || !exerciseData.name.trim()) return;

    const newExercise = {
      id: crypto.randomUUID(),
      name: exerciseData.name,
      description: exerciseData.description,
      sets: exerciseData.sets,
      reps: exerciseData.reps,
      weight: exerciseData.weight,
    };

    setWorkouts((prev) =>
      prev.map((workout) =>
        workout.id === exerciseData.workoutId
          ? { ...workout, exercises: [...workout.exercises, newExercise] }
          : workout
      )
    );

    setExerciseData({
      ...exerciseData,
      name: "",
      description: "",
      sets: "",
      reps: "",
      weight: "",
    });
  };

  const startEditing = (workout) => {
    setEditingId(workout.id);

    setFormData({
      name: workout.name,
      category: workout.category,
      day: workout.day,
      notes: workout.notes,
      mood: workout.mood || "Focused",
      duration: workout.duration || "",
      intensity: workout.intensity || "Moderate",
      difficulty: workout.difficulty || "Beginner",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEditing = () => {
    setEditingId(null);

    setFormData({
      name: "",
      category: "Upper Body",
      day: "Monday",
      notes: "",
      mood: "Focused",
      duration: "",
      intensity: "Moderate",
      difficulty: "Beginner",
    });
  };

  const deleteWorkout = (id) => {
    setWorkouts((prev) => prev.filter((workout) => workout.id !== id));
  };

  const deleteExercise = (workoutId, exerciseId) => {
    setWorkouts((prev) =>
      prev.map((workout) =>
        workout.id === workoutId
          ? {
              ...workout,
              exercises: workout.exercises.filter(
                (exercise) => exercise.id !== exerciseId
              ),
            }
          : workout
      )
    );
  };

  const toggleComplete = (id) => {
    setWorkouts((prev) =>
      prev.map((workout) =>
        workout.id === id
          ? { ...workout, completed: !workout.completed }
          : workout
      )
    );
  };

  const addRecommendedExercise = (exerciseName) => {
    setExerciseData({
      ...exerciseData,
      name: exerciseName,
      description: `${formData.category} exercise.`,
    });
  };

  const addTrendingWorkout = (template) => {
    const newWorkout = {
      id: crypto.randomUUID(),
      name: template.name,
      category: template.category,
      day: template.day,
      notes: template.notes,
      mood: "Focused",
      duration: template.duration,
      intensity: template.intensity,
      difficulty: template.difficulty,
      completed: false,
      exercises: template.exercises.map((exercise) => ({
        id: crypto.randomUUID(),
        ...exercise,
      })),
    };

    setWorkouts((prev) => [newWorkout, ...prev]);
  };

  const loadSampleWorkouts = () => {
    setWorkouts(sampleWorkouts);
  };

  const resetApp = () => {
    const confirmed = window.confirm("Are you sure you want to clear all workouts?");

    if (confirmed) {
      localStorage.removeItem("gym-workout-tracker");
      setWorkouts([]);
    }
  };

  return (
    <main>
      <nav className="nav">
        <div className="nav-logo">Workout Tracker</div>

        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#dashboard">Dashboard</a>
          <a href="#create">Create</a>
          <a href="#videos">Videos</a>
          <a href="#history">History</a>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">Workout Planning App</p>
          <h1>Track your workouts in one place.</h1>
          <p>
            Create routines, log exercises, track sets, reps, weight, calories,
            and view your workout history.
          </p>

          <div className="hero-actions">
            <a href="#create">Create Workout</a>
            <a href="#videos" className="secondary-link">
              Browse Videos
            </a>
          </div>
        </div>

        <div className="hero-overview">
          <div className="overview-card">
            <div className="overview-header">
              <div>
                <p className="card-label">This Week</p>
                <h2>
                  {completedWorkouts}/{weeklyGoal}
                </h2>
                <span>completed workouts</span>
              </div>

              <CircleProgress value={goalPercent} />
            </div>
          </div>

          <div className="overview-card">
            <p className="card-label">Quick Overview</p>

            <div className="overview-grid">
              <div>
                <span>Total Calories</span>
                <strong>{totalCalories}</strong>
              </div>
              <div>
                <span>Total Volume</span>
                <strong>{totalVolume.toLocaleString()}</strong>
              </div>
              <div>
                <span>Favorite Type</span>
                <strong>{favoriteCategory}</strong>
              </div>
              <div>
                <span>Exercises Logged</span>
                <strong>{totalExercises}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section about-section" id="about">
        <div>
          <p className="eyebrow">About</p>
          <h2>About the app</h2>
          <p>
            Gym Workout Tracker helps users organize their workouts in one place.
            Users can create routines, add exercises, track sets, reps, weight,
            estimated calories, and review their workout history over time.
          </p>
        </div>

        <div className="about-card-grid">
          <div>
            <strong>Plan workouts</strong>
            <span>Create routines by category, day, difficulty, and intensity.</span>
          </div>
          <div>
            <strong>Track progress</strong>
            <span>View completed workouts, calories, volume, and weekly goals.</span>
          </div>
          <div>
            <strong>Stay organized</strong>
            <span>Use filters, recommended exercises, videos, and starter plans.</span>
          </div>
        </div>
      </section>

      <section className="metric-grid" id="dashboard">
        <Metric label="Saved Workouts" value={workouts.length} />
        <Metric label="Exercises" value={totalExercises} />
        <Metric label="Sets Logged" value={totalSets} />
        <Metric label="Calories" value={totalCalories} />
        <Metric label="Completed" value={completedWorkouts} />
        <Metric label="Top Category" value={favoriteCategory} small />
      </section>

      <section className="section progress-section">
        <div>
          <p className="eyebrow">Progress</p>
          <h2>Weekly overview</h2>
          <p>
            Set a weekly goal and mark workouts complete as you finish them.
          </p>

          <label>Weekly Goal</label>
          <input
            className="goal-input"
            type="number"
            min="1"
            max="7"
            value={weeklyGoal}
            onChange={(e) => {
              const value = Number(e.target.value);

              if (value > 7) {
                setWeeklyGoal(7);
              } else if (value < 1) {
                setWeeklyGoal(1);
              } else {
                setWeeklyGoal(value);
              }
            }}
          />
        </div>

        <div className="progress-list">
          <ProgressBar
            label={`Weekly Goal (${completedWorkouts}/${weeklyGoal})`}
            value={goalPercent}
          />
          <ProgressBar
            label="Exercise Variety"
            value={Math.min(totalExercises * 10, 100)}
          />
          <ProgressBar
            label="Strength Logging"
            value={Math.min(totalSets * 5, 100)}
          />
        </div>
      </section>

      <section className="section chart-section">
        <div className="section-title">
          <div>
            <p className="eyebrow">Chart</p>
            <h2>Progress chart</h2>
          </div>
          <p>Workout volume by day.</p>
        </div>

        <div className="chart">
          {chartData.map((item) => (
            <div className="chart-column" key={item.day}>
              <div className="chart-bar-wrap">
                <div
                  className="chart-bar"
                  style={{ height: `${item.percent}%` }}
                  title={`${item.day}: ${item.volume}`}
                ></div>
              </div>
              <span>{item.shortDay}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section how-section">
        <div className="section-title">
          <div>
            <p className="eyebrow">How it works</p>
            <h2>Simple workout tracking</h2>
          </div>
        </div>

        <div className="steps-grid">
          <div>
            <span>01</span>
            <h3>Create a workout</h3>
            <p>Choose a name, category, day, intensity, and duration.</p>
          </div>
          <div>
            <span>02</span>
            <h3>Add exercises</h3>
            <p>Log sets, reps, weight, and notes for each routine.</p>
          </div>
          <div>
            <span>03</span>
            <h3>Mark complete</h3>
            <p>Track which workouts are finished for the week.</p>
          </div>
          <div>
            <span>04</span>
            <h3>View progress</h3>
            <p>Use the dashboard and chart to review workout activity.</p>
          </div>
        </div>
      </section>

      <section className="section" id="videos">
        <div className="section-title">
          <div>
            <p className="eyebrow">Training Videos</p>
            <h2>Popular workout videos</h2>
          </div>
          <p>Open one of these videos to follow a workout.</p>
        </div>

        <div className="video-grid">
          {popularVideos.map((video) => (
            <a
              className="video-card"
              href={video.url}
              target="_blank"
              rel="noreferrer"
              key={video.videoId}
            >
              <div className="video-thumb">
                <img
                  src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
                  alt={`${video.title} thumbnail`}
                />
                <div className="play-badge">▶</div>
              </div>

              <div className="video-body">
                <span>{video.category}</span>
                <h3>{video.title}</h3>
                <p>{video.creator}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-title">
          <div>
            <p className="eyebrow">Starter Plans</p>
            <h2>Trending workouts</h2>
          </div>
          <p>Add a premade routine and edit it later.</p>
        </div>

        <div className="trending-grid">
          {trendingWorkouts.map((workout) => (
            <div className="trending-card" key={workout.name}>
              <span>{workout.category}</span>
              <h3>{workout.name}</h3>
              <p>{workout.notes}</p>

              <div className="trend-details">
                <small>{workout.difficulty}</small>
                <small>{workout.duration} min</small>
                <small>{estimateCalories(workout.duration, workout.intensity)} cal</small>
              </div>

              <button type="button" onClick={() => addTrendingWorkout(workout)}>
                Add Routine
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="forms-grid" id="create">
        <form className="card" onSubmit={handleWorkoutSubmit}>
          <h2>{editingId ? "Edit Workout" : "Create Workout"}</h2>

          <label>Workout Name</label>
          <input
            placeholder="Example: Push Day"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />

          <label>Category</label>
          <select
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            {categories
              .filter((category) => category !== "All")
              .map((category) => (
                <option key={category}>{category}</option>
              ))}
          </select>

          <div className="recommend-box">
            <p>Recommended exercises</p>
            <div>
              {currentRecommendations.map((exercise) => (
                <button
                  type="button"
                  key={exercise}
                  onClick={() => addRecommendedExercise(exercise)}
                >
                  {exercise}
                </button>
              ))}
            </div>
          </div>

          <div className="mini-grid">
            <div>
              <label>Day</label>
              <select
                value={formData.day}
                onChange={(e) =>
                  setFormData({ ...formData, day: e.target.value })
                }
              >
                {days
                  .filter((day) => day !== "Any")
                  .map((day) => (
                    <option key={day}>{day}</option>
                  ))}
              </select>
            </div>

            <div>
              <label>Mood</label>
              <select
                value={formData.mood}
                onChange={(e) =>
                  setFormData({ ...formData, mood: e.target.value })
                }
              >
                <option>Focused</option>
                <option>Strong</option>
                <option>Tired</option>
                <option>Motivated</option>
                <option>Light Day</option>
              </select>
            </div>

            <div>
              <label>Minutes</label>
              <input
                placeholder="60"
                value={formData.duration}
                onChange={(e) =>
                  setFormData({ ...formData, duration: e.target.value })
                }
              />
            </div>
          </div>

          <div className="mini-grid">
            <div>
              <label>Intensity</label>
              <select
                value={formData.intensity}
                onChange={(e) =>
                  setFormData({ ...formData, intensity: e.target.value })
                }
              >
                <option>Light</option>
                <option>Moderate</option>
                <option>Intense</option>
              </select>
            </div>

            <div>
              <label>Difficulty</label>
              <select
                value={formData.difficulty}
                onChange={(e) =>
                  setFormData({ ...formData, difficulty: e.target.value })
                }
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>

            <div>
              <label>Est. Calories</label>
              <input
                value={estimateCalories(formData.duration, formData.intensity)}
                readOnly
              />
            </div>
          </div>

          <label>Notes</label>
          <textarea
            placeholder="Example: Focus on form today"
            value={formData.notes}
            onChange={(e) =>
              setFormData({ ...formData, notes: e.target.value })
            }
          />

          <div className="form-actions">
            <button type="submit">
              {editingId ? "Save Changes" : "Save Workout"}
            </button>

            {editingId && (
              <button
                type="button"
                className="light-button"
                onClick={cancelEditing}
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <form className="card" onSubmit={handleExerciseSubmit}>
          <h2>Add Exercise</h2>

          <label>Choose Workout</label>
          <select
            value={exerciseData.workoutId}
            onChange={(e) =>
              setExerciseData({ ...exerciseData, workoutId: e.target.value })
            }
          >
            <option value="">Select a workout</option>
            {workouts.map((workout) => (
              <option key={workout.id} value={workout.id}>
                {workout.name}
              </option>
            ))}
          </select>

          <label>Exercise Name</label>
          <input
            placeholder="Example: Bench Press"
            value={exerciseData.name}
            onChange={(e) =>
              setExerciseData({ ...exerciseData, name: e.target.value })
            }
          />

          <label>Description</label>
          <input
            placeholder="Example: Keep elbows tucked"
            value={exerciseData.description}
            onChange={(e) =>
              setExerciseData({
                ...exerciseData,
                description: e.target.value,
              })
            }
          />

          <div className="mini-grid">
            <div>
              <label>Sets</label>
              <input
                value={exerciseData.sets}
                onChange={(e) =>
                  setExerciseData({ ...exerciseData, sets: e.target.value })
                }
              />
            </div>

            <div>
              <label>Reps</label>
              <input
                value={exerciseData.reps}
                onChange={(e) =>
                  setExerciseData({ ...exerciseData, reps: e.target.value })
                }
              />
            </div>

            <div>
              <label>Weight</label>
              <input
                placeholder="lbs"
                value={exerciseData.weight}
                onChange={(e) =>
                  setExerciseData({ ...exerciseData, weight: e.target.value })
                }
              />
            </div>
          </div>

          <button type="submit">Add Exercise</button>
        </form>
      </section>

      <section className="section dashboard">
        <div className="section-title">
          <div>
            <p className="eyebrow">Dashboard</p>
            <h2>Saved workouts</h2>
          </div>

          <div className="filters">
            <input
              placeholder="Search workouts"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>

            <select
              value={dayFilter}
              onChange={(e) => setDayFilter(e.target.value)}
            >
              {days.map((day) => (
                <option key={day}>{day}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="empty-actions">
          <button type="button" onClick={loadSampleWorkouts}>
            Load Sample Workouts
          </button>
        </div>

        <div className="workout-list">
          {filteredWorkouts.length === 0 ? (
            <p className="empty-message">No workouts added yet.</p>
          ) : (
            filteredWorkouts.map((workout) => (
              <div
                className={`workout-card ${
                  workout.completed ? "completed-card" : ""
                }`}
                key={workout.id}
              >
                <div className="workout-top">
                  <div>
                    <h3>{workout.name}</h3>
                    <p>
                      {workout.category} · {workout.day} · {workout.mood}
                    </p>

                    {workout.duration && (
                      <span className="pill">
                        {workout.duration} min ·{" "}
                        {estimateCalories(workout.duration, workout.intensity)} cal
                      </span>
                    )}
                  </div>

                  <div className="buttons">
                    <button type="button" onClick={() => toggleComplete(workout.id)}>
                      {workout.completed ? "Done" : "Complete"}
                    </button>
                    <button type="button" onClick={() => startEditing(workout)}>
                      Edit
                    </button>
                    <button type="button" onClick={() => deleteWorkout(workout.id)}>
                      Delete
                    </button>
                  </div>
                </div>

                {workout.notes && <p className="notes">{workout.notes}</p>}

                <div className="workout-summary">
                  <span>{workout.exercises.length} exercises</span>
                  <span>{getWorkoutSets(workout)} sets</span>
                  <span>{getWorkoutVolume(workout).toLocaleString()} volume</span>
                </div>

                {workout.exercises.length === 0 ? (
                  <p className="empty-message">No exercises added yet.</p>
                ) : (
                  workout.exercises.map((exercise) => (
                    <div className="exercise-card" key={exercise.id}>
                      <div>
                        <h4>{exercise.name}</h4>
                        <p>{exercise.description || "No description added."}</p>
                        <p>
                          {exercise.sets || "-"} sets · {exercise.reps || "-"} reps ·{" "}
                          {exercise.weight || "-"} lbs
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => deleteExercise(workout.id, exercise.id)}
                      >
                        Remove
                      </button>
                    </div>
                  ))
                )}
              </div>
            ))
          )}
        </div>
      </section>
      <section className="section future-section">
        <div>
          <p className="eyebrow">Coming next</p>
          <h2>Planned features</h2>
        </div>

        <ul>
          <li>User profiles and saved preferences</li>
          <li>Workout calendar view</li>
          <li>Larger exercise library</li>
          <li>More detailed progress charts</li>
          <li>Cloud syncing across devices</li>
        </ul>
      </section>

      <section className="section" id="history">
        <div className="section-title">
          <div>
            <p className="eyebrow">History</p>
            <h2>Workout history</h2>
          </div>
          <button type="button" className="danger-button" onClick={resetApp}>
            Clear Workouts
          </button>
        </div>

        <div className="history-list">
          {workouts.length === 0 ? (
            <p className="empty-message">Workout history will appear here.</p>
          ) : (
            workouts.map((workout) => (
              <div className="history-item" key={workout.id}>
                <span>{workout.day}</span>
                <strong>{workout.name}</strong>
                <span>{workout.category}</span>
                <span>{workout.completed ? "Complete" : "Not done"}</span>
              </div>
            ))
          )}
        </div>
      </section>

      <footer className="footer">
        <p>Gym Workout Tracker</p>
        <span>Created by Beatriz Torres Archundia</span>
      </footer>
    </main>
  );
}

function Metric({ label, value, small }) {
  return (
    <div className="metric-card">
      <p>{label}</p>
      <h2 className={small ? "small-metric" : ""}>{value}</h2>
    </div>
  );
}

function ProgressBar({ label, value }) {
  return (
    <div>
      <div className="progress-label">
        <span>{label}</span>
        <span>{value}%</span>
      </div>

      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${value}%` }}></div>
      </div>
    </div>
  );
}

function CircleProgress({ value }) {
  return (
    <div
      className="circle-progress"
      style={{
        background: `conic-gradient(#ff375f 0% ${value}%, #2c2c2e ${value}% 100%)`,
      }}
    >
      <div className="circle-progress-inner">
        <span>{value}%</span>
      </div>
    </div>
  );
}

function estimateCalories(duration, intensity) {
  const minutes = Number(duration || 0);

  const rates = {
    Light: 4,
    Moderate: 6,
    Intense: 8,
  };

  return minutes * (rates[intensity] || 6);
}

function getWorkoutSets(workout) {
  return workout.exercises.reduce(
    (total, exercise) => total + (Number.parseFloat(exercise.sets) || 0),
    0
  );
}

function getWorkoutVolume(workout) {
  return workout.exercises.reduce((total, exercise) => {
    const sets = Number.parseFloat(exercise.sets) || 0;
    const reps = Number.parseFloat(exercise.reps) || 0;
    const weight = Number.parseFloat(exercise.weight) || 0;

    return total + sets * reps * weight;
  }, 0);
}

function getFavoriteCategory(workouts) {
  const counts = {};

  workouts.forEach((workout) => {
    counts[workout.category] = (counts[workout.category] || 0) + 1;
  });

  return Object.keys(counts).reduce((a, b) =>
    counts[a] > counts[b] ? a : b
  );
}

function getChartData(workouts) {
  const chart = days
    .filter((day) => day !== "Any")
    .map((day) => ({
      day,
      shortDay: day.slice(0, 3),
      volume: 0,
      percent: 0,
    }));

  workouts.forEach((workout) => {
    const item = chart.find((entry) => entry.day === workout.day);

    if (item) {
      item.volume += getWorkoutVolume(workout);
    }
  });

  const maxVolume = Math.max(...chart.map((item) => item.volume), 1);

  return chart.map((item) => ({
    ...item,
    percent: item.volume === 0 ? 6 : Math.max((item.volume / maxVolume) * 100, 12),
  }));
}

export default App;
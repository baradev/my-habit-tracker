import HabitLine from "./HabitLine";
import HabitTracker from "./HabitTracker";

interface HabitData {
  Habits: Habit[];
}

const habitData: HabitData = {
  Habits: [
    {
      color: "green",
      name: "Sugar free",
      id: "1",
    },
    {
      color: "yellow",
      name: "Going to bed early",
      id: "2",
    },
    {
      color: "blue",
      name: "Excercising",
      id: "3",
    },
    {
      color: "red",
      name: "Read a book",
      id: "4",
    },
  ],
};

export default function Home() {
  return (
    <main>
      <h1>Habit tracker</h1>

      <div>
        {habitData.Habits.map((habit) => (
          <HabitLine key={habit.id} habit={habit} />
        ))}
      </div>
    </main>
  );
}

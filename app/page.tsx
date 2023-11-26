import HabitLine from "./HabitLine";

interface Habit {
  color: string;
  name: string;
  id: string;
}

interface HabitData {
  Habits: Habit[];
}

const habitData: HabitData = {
  Habits: [
    {
      color: "green-200",
      name: "Sugar free",
      id: "1",
    },
    {
      color: "indigo-200",
      name: "Going to bed early",
      id: "2",
    },
    {
      color: "rose-200",
      name: "Excercising",
      id: "3",
    },
    {
      color: "amber-200",
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

import HabitLine from "./HabitLine";

interface Habit {
  color: string;
  name: string;
  id: string;
  date: string;
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
      date: "2024-02-2",
    },
    {
      color: "indigo-200",
      name: "Going to bed early",
      id: "2",
      date: "2023-11-30",
    },
    {
      color: "rose-200",
      name: "Exercising",
      id: "3",
      date: "2023-11-30",
    },
    {
      color: "amber-200",
      name: "Read a book",
      id: "4",
      date: "2023-11-30",
    },
  ],
};

export default function Home() {
  return (
    <main>
      <h1 className={"mb-8"}>Habit tracker</h1>

      <div>
        {habitData.Habits.map((habit: Habit) => (
          <HabitLine key={habit.id} habit={habit} />
        ))}
      </div>
    </main>
  );
}

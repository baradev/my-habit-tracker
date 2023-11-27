import HabitLine from "./HabitLine";
import dayjs from "dayjs";

interface Habit {
  color: string;
  name: string;
  id: string;
  days: number;
}

interface HabitData {
  Habits: Habit[];
}
const daysInMonth = dayjs().daysInMonth();

const habitData: HabitData = {
  Habits: [
    {
      color: "green-200",
      name: "Sugar free",
      id: "1",
      days: daysInMonth,
    },
    {
      color: "indigo-200",
      name: "Going to bed early",
      id: "2",
      days: daysInMonth,
    },
    {
      color: "rose-200",
      name: "Exercising",
      id: "3",
      days: daysInMonth,
    },
    {
      color: "amber-200",
      name: "Read a book",
      id: "4",
      days: daysInMonth,
    },
  ],
};

export default function Home() {
  return (
    <main>
      <div>
        <h2>Month</h2>
        {habitData.Habits.map((habit: Habit) => (
          <HabitLine key={habit.id} habit={habit} />
        ))}
      </div>
    </main>
  );
}

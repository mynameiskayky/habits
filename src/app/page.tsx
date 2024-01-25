"use client";
import { useEffect, useState } from "react";
import { supabase } from "./supabase/initSupabase";

import Habit from "./components/habit";

export default function Home() {
  const [habits, setHabits] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await supabase.from("habits").select("*");
        if (response.data) {
          setHabits([...response.data]);
        }
      } catch (error) {
        console.error("Erro ao buscar hábitos:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="grid place-items-center h-screen">
      <section className="border border-neutral-600 w-full max-w-screen-sm divide-y divide-neutral-600 rounded-2xl">
        {habits.map((habit, index) => {
          return (
            <Habit
              key={index}
              name={habit.name}
              habitColor={habit.habit_color}
              timeOfDay={habit.time_of_day}
            />
          );
        })}
      </section>
    </main>
  );
}

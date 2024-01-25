"use client";
import { useEffect, useState } from "react";
import { supabase } from "./supabase/initSupabase";
import { Plus } from "@phosphor-icons/react";

import Habit from "./components/habit";

export default function Home() {
  const [habits, setHabits] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await supabase.from("habits").select("*");
      if (response.data) {
        setHabits([...response.data]);
      }
    };

    fetchData();
  }, [habits]);

  const createHabit = async () => {
    const { data, error } = await supabase
      .from("habits")
      .insert([
        { name: "Acordar as 5m", habit_color: "#ff1100", time_of_day: "AM" },
      ])
      .select();
    if (data) setHabits([...data]);
  };

  const deleteHabit = async () => {
    const { data, error } = await supabase
      .from("habits")
      .delete()
      .eq("id", "14");

    if (data) setHabits([...data]);
  };

  const updateHabit = async () => {
    const { data, error } = await supabase
      .from("habits")
      .update({ name: "ce ta joido kkj" })
      .eq("id", "12")
      .select();

    if (data) setHabits([...data]);
    console.log(data);
  };

  return (
    <main className="flex flex-col justify-center items-center max-w-screen-sm m-auto h-screen gap-6">
      <div className="flex items-center gap-4">
        <button
          onClick={updateHabit}
          className="px-6 py-4 border border-purple-500 hover:border-purple-600 hover:bg-purple-900/20 text-purple-50 hover:text-purple-200 transition-colors self-end rounded-2xl flex items-center gap-2"
        >
          <Plus />
          Editar Hábito
        </button>
        <button
          onClick={deleteHabit}
          className="px-6 py-4 border border-red-500 hover:border-red-600 hover:bg-red-900/20 text-red-50 hover:text-red-200 transition-colors self-end rounded-2xl flex items-center gap-2"
        >
          <Plus />
          Deletar Hábito
        </button>
        <button
          onClick={createHabit}
          className="px-6 py-4 border border-lime-500 hover:border-lime-600 hover:bg-lime-900/20 text-lime-50 hover:text-lime-200 transition-colors self-end rounded-2xl flex items-center gap-2"
        >
          <Plus />
          Criar Hábito
        </button>
      </div>
      <section className="border border-neutral-600 w-full divide-y divide-neutral-600 rounded-2xl">
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

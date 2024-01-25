"use client";
import {
  CloudSun,
  Book,
  Translate,
  ProjectorScreen,
  Drop,
} from "@phosphor-icons/react";
import Habit, { IHabitProps } from "./components/habit";

export default function Home() {
  const habits: IHabitProps[] = [
    {
      name: "Acordar 6m",
      habitColor: "#22C55E",
      icon: <CloudSun size={24} />,
      timeOfDay: "AM",
    },
    {
      name: "Leitura",
      habitColor: "#7F2FE3",
      icon: <Book size={24} />,
      timeOfDay: "AM",
    },
    {
      name: "Estudar Inglês",
      habitColor: "#84CC16",
      icon: <Translate size={24} />,
      timeOfDay: "AM",
    },
    {
      name: "Praticar com Projetos",
      habitColor: "#EF4444",
      icon: <ProjectorScreen size={24} />,
      timeOfDay: "PM",
    },
    {
      name: "Beber 2l d'agua",
      habitColor: "#F97316",
      icon: <Drop size={24} />,
      timeOfDay: "AM",
    },
  ];
  return (
    <main className="grid place-items-center h-screen">
      <section className="border border-neutral-600 w-full max-w-screen-sm divide-y divide-neutral-600 rounded-2xl">
        {habits.map((habit, index) => (
          <Habit
            key={index}
            name={habit.name}
            habitColor={habit.habitColor}
            icon={habit.icon}
            timeOfDay={habit.timeOfDay}
          />
        ))}
      </section>
    </main>
  );
}

"use client";
import { useEffect, useState } from "react";
import { supabase } from "./supabase/initSupabase";
import { Plus } from "@phosphor-icons/react";

import Habit from "./components/habit";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const FormSchema = z.object({
  habit: z.string().min(2, {
    message: "habit must be at least 2 characters.",
  }),
  colorHabit: z.string(),
});

export default function Home() {
  const [habits, setHabits] = useState<any[]>([]);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await supabase.from("habits").select("*");
      if (response.data) {
        setHabits([...response.data]);
      }
    };

    fetchData();
  }, [habits]);

  const deleteHabit = async (id: any) => {
    const { data, error } = await supabase.from("habits").delete().eq("id", id);

    if (data) setHabits([...data]);
    console.log(data, id);
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

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      habit: "",
      colorHabit: "",
    },
  });

  const createHabit = async (data: z.infer<typeof FormSchema>) => {
    const { data: newHabit, error } = await supabase
      .from("habits")
      .insert([
        { name: data.habit, habit_color: data.colorHabit, time_of_day: "AM" },
      ])
      .select();
    if (newHabit) {
      setHabits([...newHabit]);
      setOpenDialog(false);
    }
  };

  return (
    <main className="flex flex-col justify-center items-end max-w-screen-sm m-auto h-screen gap-6">
      <div className="flex items-center gap-4">
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger className="px-6 py-4 border border-lime-500 hover:border-lime-600 hover:bg-lime-900/20 text-lime-50 hover:text-lime-200 transition-colors self-end rounded-2xl flex items-center gap-2">
            <Plus />
            Criar Hábito
          </DialogTrigger>
          <DialogContent className="bg-neutral-900 border-neutral-600">
            <DialogHeader>
              <DialogTitle>Crie um hábito e mude sua vida</DialogTitle>
            </DialogHeader>
            <div className="flex items-center gap-3 pt-4">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(createHabit)}
                  className="flex items-center gap-3 w-full"
                >
                  <FormField
                    control={form.control}
                    name="habit"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            placeholder="Beber 2l d'agua"
                            className="bg-neutral-800 border-neutral-500"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="colorHabit"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="color"
                            className="bg-neutral-800 border-neutral-500 p-0 w-12 h-12 border-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    variant="outline"
                    type="submit"
                    className="bg-neutral-800 border-neutral-500 hover:bg-green-500 "
                  >
                    Criar
                  </Button>
                </form>
              </Form>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <section className="border border-neutral-600 w-full divide-y divide-neutral-600 rounded-2xl">
        {habits.map((habit, index) => {
          return (
            <Habit
              key={index}
              name={habit.name}
              habitColor={habit.habit_color}
              timeOfDay={habit.time_of_day}
              handleDeleteHabit={() => deleteHabit(habit.id)}
            />
          );
        })}
      </section>
    </main>
  );
}

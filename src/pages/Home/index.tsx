import { HandPalm, Play } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { useEffect, useState } from "react";
import { differenceInSeconds } from "date-fns";

import {
  HomeContainer,
  FormContainer,
  CountdownContainer,
  Separator,
  StartContdownButton,
  TaskInput,
  MinutesAmountInput,
  StopContdownButton,
} from "./styles";

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "informe a tarefa!"),
  minutesAmount: zod
    .number()
    .min(5, "O ciclo minimo deve ser de pelo menos 5 min!")
    .max(60, "O ciclo minimo deve ser de até 60 min!"),
});

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interrupedDate?: Date;
  finishedDate?: Date;
}

function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const { register, handleSubmit, watch, reset } = useForm<NewCycleData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  // interface   {
  //   task: string;
  //   minutesAmount: number;
  // }

  type NewCycleData = zod.infer<typeof newCycleFormValidationSchema>;

  const handleCreateNewCycle = (data: NewCycleData) => {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id: id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    setCycles([...cycles, newCycle]);
    setActiveCycleId(id);
    setAmountSecondsPassed(0);

    reset();
  };

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

  useEffect(() => {
    let interval: number;

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate
        );

        if (secondsDifference >= totalSeconds) {
          setCycles((state) =>
            state.map((cycle) => {
              if (cycle.id === activeCycleId) {
                return { ...cycle, finishedDate: new Date() };
              } else {
                return cycle;
              }
            })
          );
          setAmountSecondsPassed(totalSeconds)
          clearInterval(interval);
        } else {
          setAmountSecondsPassed(secondsDifference);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeCycle, activeCycleId]);

  const handleInterrupt = () => {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interrupedDate: new Date() };
        } else {
          return cycle;
        }
      })
    );
    setActiveCycleId(null);
  };

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(2, "0");
  const seconds = String(secondsAmount).padStart(2, "0");

  useEffect(() => {
    if (activeCycle) {
      document.title = ` ${minutes}:${seconds}`;
    }
  }, [minutes, seconds, activeCycle]);

  const task = watch("task");

  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            type="text"
            id="task"
            list="task-suggestions"
            placeholder="Nome da sua atividade"
            disabled={!!activeCycle}
            {...register("task")}
          />
          <datalist id="task-suggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
            <option value="Projeto 4" />
          </datalist>

          <label htmlFor="minutesAmount">Durante</label>
          <MinutesAmountInput
            id="minutesAmount"
            type="number"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            disabled={!!activeCycle}
            {...register("minutesAmount", { valueAsNumber: true })}
          />

          <span>Minutos</span>
        </FormContainer>

        <CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>

        {activeCycle ? (
          <StopContdownButton onClick={handleInterrupt} type="button">
            <HandPalm size={24} />
            Interromper
          </StopContdownButton>
        ) : (
          <StartContdownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartContdownButton>
        )}
      </form>
    </HomeContainer>
  );
}

export default Home;

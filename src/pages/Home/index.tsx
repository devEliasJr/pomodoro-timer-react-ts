import { HandPalm, Play } from "phosphor-react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { useContext } from "react";

import {
  HomeContainer,
  StartContdownButton,
  StopContdownButton,
} from "./styles";
import NewCycle from "./Components/NewCycleForm/NewCycle";
import Countdown from "./Components/Countdown/Countdown";
import { CyclesContext } from "../../contexts/CyclesContext";

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "informe a tarefa!"),
  minutesAmount: zod
    .number()
    .min(5, "O ciclo minimo deve ser de pelo menos 5 min!")
    .max(60, "O ciclo minimo deve ser de até 60 min!"),
});

type NewCycleData = zod.infer<typeof newCycleFormValidationSchema>;

export function Home() {
  const {createNewCycle, interruptCurrentCycle, activeCycle} = useContext(CyclesContext);

  const newCycleForm = useForm<NewCycleData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  const { handleSubmit, watch, reset } = newCycleForm;

  const handleCreateNewCycle = (data: NewCycleData) => {
    createNewCycle(data)
    reset()
  }

  const task = watch("task");
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycle />
        </FormProvider>
        <Countdown />

        {activeCycle ? (
          <StopContdownButton onClick={interruptCurrentCycle} type="button">
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

import { useContext } from "react";
import { formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { HistoryContainer, Historylist, Status } from "./styles";
import { CyclesContext } from "../../contexts/CyclesContext";

const History = () => {
  const { cycles } = useContext(CyclesContext);

  return (
    <HistoryContainer>
      <h2>Meu Histórico</h2>

      <Historylist>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Inicio</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycle) => {
              return (
                <tr key={cycle.id}>
                  <td>{cycle.task}</td>
                  <td>{cycle.minutesAmount}</td>
                  <td>
                    {formatDistanceToNow(new Date(cycle.startDate), {
                      addSuffix: true,
                      locale: ptBR,
                    })}
                  </td>
                  <td>
                    {cycle.finishedDate && (
                      <Status statuscolor="green">Concluido</Status>
                    )}

                    {cycle.interrupedDate && (
                      <Status statuscolor="red">Interrompido</Status>
                    )}

                    {!cycle.interrupedDate && !cycle.finishedDate && (
                      <Status statuscolor="yellow">Andamento</Status>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Historylist>
    </HistoryContainer>
  );
};

export default History;

import { HistoryContainer, Historylist, Status } from "./styles";

const History = () => {
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
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>Há dois meses</td>
              <td><Status statuscolor="yellow">Em andamento</Status></td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>Há dois meses</td>
              <td><Status statuscolor="yellow">Em andamento</Status></td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>Há dois meses</td>
              <td><Status statuscolor="green">Não finalizado</Status></td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>Há dois meses</td>
              <td><Status statuscolor="green">Não finalizado</Status></td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>Há dois meses</td>
              <td><Status statuscolor="red">Concluido</Status></td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>Há dois meses</td>
              <td><Status statuscolor="green">Concluido</Status></td>
            </tr>
          </tbody>
        </table>
      </Historylist>
    </HistoryContainer>
  );
};

export default History;

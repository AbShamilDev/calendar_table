import React, { FormEvent, useState } from "react";
import "./App.scss";

const mock = [
  {
    dayOfWeek: 1,
    v1: 1,
    v2: 2,
  },
  {
    dayOfWeek: 2,
    v1: 1,
    v2: 2,
  },
  {
    dayOfWeek: 3,
    v1: 1,
    v2: 2,
  },
  {
    dayOfWeek: 4,
    v1: 1,
    v2: 2,
  },
  {
    dayOfWeek: 5,
    v1: 1,
    v2: 2,
  },
  {
    dayOfWeek: 6,
    v1: 1,
    v2: 2,
  },
  {
    dayOfWeek: 7,
    v1: 1,
    v2: 2,
  },
];

function App() {
  const [data, setData] = useState<
    {
      dayOfWeek: number;
      v1: number;
      v2: number;
    }[]
  >(mock);
  const [date, setDate] = useState<string>(Date());

  const daysOfWeek = {
    1: "Пн",
    2: "Вт",
    3: "Ср",
    4: "Чт",
    5: "Пт",
    6: "Сб",
    7: "Вс",
  };

  const onSubmitForm = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    console.log(ev);

    const v1 = ev.currentTarget.v1.value;
    const v2 = ev.currentTarget.v2.value;
    const date = ev.currentTarget.date.value;

    const dayOfWeek = new Date(date).getDay() || 7;
    const gap = Math.abs((dayOfWeek - data[6].dayOfWeek + 7) % 7) || 7;

    console.log(dayOfWeek, gap);

    setData((prev) => {
      const array = [...prev];

      for (let i = 0; i < 7; i++) {
        console.log("i =", i);
        if (i < 7 - gap) {
          console.log("Перезапись", array[i + gap], "в", array[i]);
          array[i] = array[i + gap];
        } else {
          console.log("Обнуление", array[i]);
          array[i] = {
            dayOfWeek: ((dayOfWeek + i) % 7) + 1,
            v1: 0,
            v2: 0,
          };
        }
      }

      array[6] = {
        dayOfWeek: dayOfWeek,
        v1: v1,
        v2: v2,
      };
      console.log("добавление в конец", array[6]);

      return array;
    });
  };

  return (
    <div className="App">
      <div className="container">
        <table>
          <tr>
            <th className="value">№</th>
            {data.map((el) => (
              <th>{daysOfWeek[el.dayOfWeek as keyof object]}</th>
            ))}
          </tr>

          <tr>
            <td className="value">V1</td>
            {data.map((el) => (
              <td>{el.v1}</td>
            ))}
          </tr>

          <tr>
            <td className="value">V2</td>
            {data.map((el) => (
              <td>{el.v2}</td>
            ))}
          </tr>
        </table>

        <form onSubmit={onSubmitForm}>
          <div>
            V1: <input name="v1" type="number" required /> м^3
          </div>
          <div>
            V2: <input name="v2" type="number" required /> м^3
          </div>
          <div>
            День:
            <input
              name="date"
              type="date"
              min={date}
              onChange={(ev) => setDate(ev.target.value)}
              required
            />
          </div>

          <button>Добавить</button>
        </form>
      </div>
    </div>
  );
}

export default App;

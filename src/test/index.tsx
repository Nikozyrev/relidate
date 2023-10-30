import React from 'react';
import { useForm } from '../hooks/use-form';

function TestComponent() {
  const {
    values: { age, name },
    fields,
    update,
  } = useForm({
    initialState: {
      name: '',
      age: 0,
    },
    validators: {
      age: [(v: number) => !!v],
      name: [(v: string) => !!v],
    },
  });

  return (
    <form>
      <input
        type="text"
        value={name}
        onChange={(e) => update('name', e.target.value)}
      />

      <input
        type="text"
        value={age}
        onChange={(e) => update('age', Number(e.target.value))}
      />
    </form>
  );
}

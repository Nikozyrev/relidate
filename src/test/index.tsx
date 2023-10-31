import React from 'react';
import { useForm } from '../hooks/use-form';

function TestComponent() {
  const {
    fields: { age, name },
    update,
    touch,
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
        value={name.value}
        onChange={(e) => update('name', e.target.value)}
        onBlur={() => touch('name')}
      />

      <input
        type="text"
        value={age.value}
        onChange={(e) => update('age', Number(e.target.value))}
        onBlur={() => touch('age')}
      />
    </form>
  );
}

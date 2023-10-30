import { useForm } from '../hooks/use-form';

function TestComponent() {
  const { getState, fields, update } = useForm({
    initialState: {
      name: '',
      age: 0,
    },
    validators: {
      age: [(v: number) => !!v],
      name: [(v: string) => !!v],
    },
  });

  const { age, name } = getState();

  fields.age.value;

  update('age', 0);
}

import { useValidHook } from "../hooks/use-valid-hook";

const MyComponent = () => {
  const [state, setState] = useValidHook();

  const onClick = () => {
    setState((s) => s + 1);
  };

  return <button onClick={onClick}>{state}</button>;
};

export default MyComponent;

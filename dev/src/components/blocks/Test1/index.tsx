import { FC } from 'react';

type Test1Props = {};

const Test1: FC<Test1Props> = (props) => {
  return (
    <div className="bg-red-400 p-6 rounded-md">
      <div>Test1</div>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  );
};

export default Test1;

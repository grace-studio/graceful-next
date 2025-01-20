import { FC } from 'react';

type Test2Props = {};

const Test2: FC<Test2Props> = (props) => {
  return (
    <div className="bg-blue-400 p-6 rounded-md">
      <div>Test2</div>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  );
};

export default Test2;

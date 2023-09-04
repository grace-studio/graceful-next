'use client';
import {
  BaseContentWrapper,
  Form,
  BaseInputField,
  BaseButton,
  BaseRadioButton,
} from '@grace-studio/graceful-next/components';
import BaseCheckbox from '@grace-studio/graceful-next/components/BaseCheckbox';
import BaseInputFile from '@grace-studio/graceful-next/components/BaseInputFile';
import classNames from 'classnames';
import { useState } from 'react';

export default function Home() {
  const [toggle, setToggle] = useState(true);
  return (
    <BaseContentWrapper className="mt-20">
      <Form defaultValues={{check: true}} onSubmit={console.log} onValuesChange={console.log}>
        <div className="grid grid-cols-1 gap-10">
          <BaseInputField
            label="label"
            // integer
            name="decimal"
            placeholder="Number input test - decimal"
            type="number"
            // decimalPoint="."
            // min={20}
            // max={300}
            // inputMode="decimal"
          />
          <BaseInputField
            integer
            label="label"
            name="integer"
            placeholder="Number input test - integer"
            type="number"
            // decimalPoint="."
            // min={20}
            // max={300}
            // inputMode="decimal"
          />

          <BaseInputFile
            multiple
            label="Filesss"
            name="file"
            onFilesChange={console.log}
          />

          <BaseRadioButton name="radio" value="val1" label="label 1" />
          <BaseRadioButton name="radio" value="val2" label="label 2" />

          <BaseCheckbox name="check"
            onStateChange={(state) => setToggle(state.checked)}
            className={classNames(
              'h-6 p-1 w-10',
              'appearance-none block rounded-full relative',
              'flex items-center',
              'after:content-[""] after:block after:bg-green-400',
              'after:h-full after:aspect-square after:rounded-full',
              'transition-all after:transition-all after:duration-700 duration-700',
              toggle ? 'bg-red-400' : 'bg-gray-200',
              toggle ? 'after:translate-x-full' : '',
            )}
          />
          
          <BaseButton submit>Submit</BaseButton>
        </div>
      </Form>
    </BaseContentWrapper>
  );
}

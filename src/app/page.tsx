'use client';
import {
  BaseContentWrapper,
  Form,
  BaseInputField,
  BaseButton,
} from '@grace-studio/graceful-next/components';
import BaseInputFile from '@grace-studio/graceful-next/components/BaseInputFile';

export default function Home() {
  return (
    <BaseContentWrapper className="mt-20">
      <Form onSubmit={console.log} onValuesChange={console.log}>
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

          <BaseButton submit>Submit</BaseButton>
        </div>
      </Form>
    </BaseContentWrapper>
  );
}

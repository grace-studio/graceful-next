'use client';
import {
  BaseContentWrapper,
  Form,
  BaseInputField,
  BaseButton,
} from '@grace-studio/graceful-next/components';

export default function Home() {
  return (
    <BaseContentWrapper className="mt-20">
      <Form onSubmit={console.log}>
        <div className="grid grid-cols-1 gap-10">
          <BaseInputField
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
            name="integer"
            placeholder="Number input test - integer"
            type="number"
            // decimalPoint="."
            // min={20}
            // max={300}
            // inputMode="decimal"
          />
          <BaseButton submit>Submit</BaseButton>
        </div>
      </Form>
    </BaseContentWrapper>
  );
}

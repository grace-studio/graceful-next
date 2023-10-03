'use client';

import {
  BaseAccordion,
  BaseButton,
  BaseCheckbox,
  BaseContentWrapper,
  BaseInputField,
  BaseInputFile,
  BaseRadioButton,
  BaseSelect,
  Drawer,
  Form,
  FocusTrap,
} from '@grace-studio/graceful-next/components';
import { useSetClassOnTab } from '@grace-studio/graceful-next/hooks';
import { useState } from 'react';

const selectOptions = [
  {
    label: 'name 1',
    value: 'value-1',
  },
  {
    label: 'name 2',
    value: 'value-2',
  },
  {
    label: 'name 3',
    value: 'value-3',
  },
  {
    label: 'name 4',
    value: 'value-4',
  },
];

const Home = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeTrap, setActiveTrap] = useState(1);
  const [show, setShow] = useState(true);
  useSetClassOnTab('tabbing', 'body');

  return (
    <BaseContentWrapper className="mt-20">
      <BaseButton onClick={() => setIsDrawerOpen(true)}>Open drawer</BaseButton>

      <Drawer
        disableFocusTrap
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        backdropClassName="bg-gray-900/30"
        transition="fade"
        position="center"
      >
        <FocusTrap mode="solo" active={isDrawerOpen}>
          <div className="bg-white p-10">
            <div className="flex justify-end">
              <BaseButton onClick={() => setIsDrawerOpen(false)}>X</BaseButton>
            </div>
            <Form
              defaultValues={{ check: true }}
              onSubmit={(val) => {
                console.log('sub');
                console.log(val);
              }}
            >
              <div className="grid grid-cols-1 gap-10">
                <BaseInputField
                  type="text"
                  label="label"
                  name="text"
                  placeholder="Text input"
                  onEnter={() => {
                    console.log('hej');
                  }}
                />
                {/* <BaseInputField
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
                <BaseSelect
                  label="Select"
                  name="select"
                  onStateChange={console.log}
                  options={selectOptions}
                /> */}
                <BaseRadioButton
                  name="radio"
                  value="val1"
                  label="radio label 1"
                />
                <BaseRadioButton
                  name="radio"
                  value="val2"
                  label="radio label 2"
                />

                <BaseCheckbox name="check" label="checkbox" />

                {/* <BaseAccordion initiallyOpen>
                  <BaseAccordion.Title>
                    <div>title</div>
                  </BaseAccordion.Title>
                  <BaseAccordion.Content>child</BaseAccordion.Content>
                </BaseAccordion> */}

                <BaseButton submit>Submit</BaseButton>
              </div>
            </Form>
          </div>
        </FocusTrap>
      </Drawer>

      <div className="mt-20">
        <BaseButton onClick={() => setShow(false)}>Remove</BaseButton>

        {/* <FocusTrap mode="combined" noInitialFocus active> */}
        <div className="mt-10 p-4 grid grid-cols-2 gap-10 border-4 border-red-400">
          <BaseButton
            hotKey="a+s+d"
            onClick={() => setActiveTrap(activeTrap === 1 ? 2 : 1)}
          >
            Toggle trap
          </BaseButton>
        </div>
        {/* </FocusTrap> */}

        <Form
          onSubmit={console.log}
          onValuesChange={console.log}
          defaultValues={{ radio: 'val2' }}
        >
          <div className="mt-10 grid gap-10 grid-cols-2">
            <FocusTrap mode="combined" active={activeTrap === 1}>
              <div
                className={`grid grid-cols-1 gap-10 h-min border-4 p-4 ${
                  activeTrap === 1 ? 'border-red-400' : 'border-gray-300'
                }`}
              >
                <BaseInputField
                  type="text"
                  label="label"
                  name="text"
                  placeholder="Text input"
                />
                <BaseRadioButton
                  wrapperClassName="grid grid-cols-[1fr_auto] items-center focus-active"
                  name="radio"
                  value="val1"
                  label="radio label 1"
                />
                <BaseRadioButton
                  wrapperClassName="grid grid-cols-[1fr_auto] items-center focus-active"
                  name="radio"
                  value="val2"
                  label="radio label 2"
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
              </div>
            </FocusTrap>
            {show && (
              <FocusTrap mode="combined" active={activeTrap === 2}>
                <div
                  className={`grid grid-cols-1 gap-10 h-min border-4 p-4 ${
                    activeTrap === 2 ? 'border-red-400' : 'border-gray-300'
                  }`}
                >
                  <BaseInputField
                    integer
                    label="int with max"
                    name="integerMax"
                    placeholder="Number input test - integer"
                    type="number"
                    // decimalPoint="."
                    // min={20}
                    max={-300}
                    onMaxValue={() => {
                      console.log('above max');
                    }}
                    // inputMode="decimal"
                  />
                  <BaseInputField
                    disabled
                    label="float with min"
                    name="integerMin"
                    placeholder="Number input test - float"
                    type="number"
                    decimalPoint="."
                    min={200}
                    onMinValue={() => {
                      console.log('below min');
                    }}
                    // max={300}
                    inputMode="decimal"
                  />
                </div>
              </FocusTrap>
            )}
          </div>

          <FocusTrap mode="combined" active>
            <div className="mt-10 p-4 grid grid-cols-2 gap-10 border-4 border-red-400">
              <BaseButton disabled submit>
                Submit
              </BaseButton>
            </div>
          </FocusTrap>
        </Form>
      </div>
    </BaseContentWrapper>
  );
};

export default Home;

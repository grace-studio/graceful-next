'use client';

import { useTranslation } from '@/hooks/useTranslation';
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
  BaseFileUploader,
} from '@grace-studio/graceful-next/components';
import { useSetClassOnTab } from '@grace-studio/graceful-next/hooks';
import { useLocale } from 'next-intl';
import Image from 'next/image';
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

  const t = useTranslation(useLocale());

  return (
    <BaseContentWrapper className="mt-20">
      <Image
        alt=""
        width={400}
        height={300}
        src="https://storage.googleapis.com/cdn-gracestudio-io/grace-webb/hero_img_ee85bedacf/hero_img_ee85bedacf.webp"
      />
      <Image
        alt=""
        width={400}
        height={300}
        src="https://cdn.gracestudio.io/sesol/sesol_app_huawei_DSC_0710_7dc36deaf4/sesol_app_huawei_DSC_0710_7dc36deaf4.webp"
      />
      <Image
        alt=""
        width={400}
        height={300}
        src="https://www.unfinishedman.com/wp-content/uploads/2016/05/terrible-taxidermy-fox.jpg"
      />
      <Image alt="" width={400} height={300} src="/resize.jpeg" />
      <div className="p-20">{t('str.e.hej.japp')}</div>
      <BaseButton onClick={() => setIsDrawerOpen(true)}>Open drawer</BaseButton>

      <BaseFileUploader
        messages={{
          duplicates: 'Följande filer är redan uppladdade',
          size: 'Följande filer är för stora',
          maxCount: 'Max antal filer är',
          blacklist: 'Denna filtyp går inte att ladda upp',
        }}
        options={{
          blacklist: ['txt', 'js', 'javascript', 'dmg', 'exe'],
        }}
      />

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
              preventSubmitOnEnter
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
                <BaseInputField
                  integer
                  label="testa här"
                  name="integer"
                  placeholder="Number input test - integer"
                  type="number"
                  decimalPoint="."
                  min={20}
                  max={300}
                  inputMode="decimal"
                />
                {/* 

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
          preventSubmitOnEnter
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
                <BaseCheckbox name="check" label="checkbox" />
                <BaseInputField
                  integer
                  label="testa här"
                  name="integer"
                  placeholder="Number input test - integer"
                  type="number"
                  decimalPoint="."
                  min={0}
                  max={300}
                  inputMode="decimal"
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
                    // disabled
                    label="float with min"
                    name="integerMin"
                    placeholder="Number input test - float"
                    type="number"
                    decimalPoint="."
                    min={20}
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
              <BaseButton submit>Submit</BaseButton>
            </div>
          </FocusTrap>
        </Form>
      </div>
    </BaseContentWrapper>
  );
};

export default Home;

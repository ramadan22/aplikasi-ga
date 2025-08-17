import PageBreadcrumb from '@/ui/components/common/PageBreadCrumb';
import CheckboxComponents from '@/ui/components/simple/form/form-elements/CheckboxComponents';
import DefaultInputs from '@/ui/components/simple/form/form-elements/DefaultInputs';
import DropzoneComponent from '@/ui/components/simple/form/form-elements/DropZone';
import FileInputExample from '@/ui/components/simple/form/form-elements/FileInputExample';
import InputGroup from '@/ui/components/simple/form/form-elements/InputGroup';
import InputStates from '@/ui/components/simple/form/form-elements/InputStates';
import RadioButtons from '@/ui/components/simple/form/form-elements/RadioButtons';
import SelectInputs from '@/ui/components/simple/form/form-elements/SelectInputs';
import TextAreaInput from '@/ui/components/simple/form/form-elements/TextAreaInput';
import ToggleSwitch from '@/ui/components/simple/form/form-elements/ToggleSwitch';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Next.js Form Elements | TailAdmin - Next.js Dashboard Template',
  description:
    'This is Next.js Form Elements page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template',
};

const FormElementsPage = () => {
  return (
    <div>
      <PageBreadcrumb pageTitle="From Elements" />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="space-y-6">
          <DefaultInputs />
          <SelectInputs />
          <TextAreaInput />
          <InputStates />
        </div>
        <div className="space-y-6">
          <InputGroup />
          <FileInputExample />
          <CheckboxComponents />
          <RadioButtons />
          <ToggleSwitch />
          <DropzoneComponent />
        </div>
      </div>
    </div>
  );
};

export default FormElementsPage;

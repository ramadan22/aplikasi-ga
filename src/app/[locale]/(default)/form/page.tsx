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
  title: 'General Affairs Administration',
  description: 'Internal administration interface for managing GA modules and services.',
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

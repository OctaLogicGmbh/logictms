import { Form, useLoaderData } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { DropdownMenuOptions } from '@/components/ui/dropdown/dropdown-menu-options';
import { 
  incotermValues, 
  operationsExecutiveValues,
  operationTypeValues,
  salesExecutiveValues,
  // shipmentSubStepStatusValues,
  shipmentTypeValues,
  // subStepKeyEnumValues,
  transportModeValues
} from '@/models/shipments/enums';
import { ShipmentSubStepGeneralInfo} from '@/models/shipments/substeps';
import { useShipmentContext } from '@/routes/shipments/shipment/context';

import { SubStepActionData } from '../../components/SubStepActionData';
import { SubStepBaseFields } from '../../components/SubStepBaseFields';

const useSubStepData = () => {
  return useLoaderData() as ShipmentSubStepGeneralInfo;
};

const SubStepGeneralInfoPage = () => {
  const { shipment_ref } = useShipmentContext();
  // const { sub_step_key, sub_step_name, status } = useSubStepData();
  const { sub_step_key, sub_step_name, status, operation_type, transport_mode, shipment_type, incoterm, operations_executive, sales_executive } = useSubStepData();

  const handleSelect = (option: string) => {
    console.log(option);
  };

  return (
    <Form method="PUT" className="flex w-60 flex-col gap-4 w-full">
      <SubStepBaseFields
        sub_step_key={sub_step_key}
        sub_step_name={sub_step_name}
        status={status}
      />
      <h3 className='text-slate-300 text-2xl font-semibold'>Shipment {shipment_ref}</h3>
      <div className='flex flex-row flex-wrap gap-3 box-border'>
        {/* <input name="" value={} /> */}
        <DropdownMenuOptions
          name="operation_type"
          label='Transaction Type'
          placeholder='Placeholder'
          options={operationTypeValues} 
          selected={operation_type} 
          onSelect={handleSelect}
          required
          additionalInfo='This is an additional text info'
          errorMessage='This is an error message' />
        <DropdownMenuOptions 
          name="transport_mode"
          label='Transport Mode'
          placeholder='Paceholder'
          options={transportModeValues} 
          selected={transport_mode} 
          onSelect={handleSelect} />
        <DropdownMenuOptions 
          name="shipment_type"
          label='Shipment Type'
          options={shipmentTypeValues} 
          selected={shipment_type} 
          onSelect={handleSelect} />
        <DropdownMenuOptions 
          name="incoterm"
          label='Incoterm'
          options={incotermValues} 
          selected={incoterm} 
          onSelect={handleSelect} />
        <DropdownMenuOptions 
          name="operations_executive"
          label='Operations Executive'
          options={operationsExecutiveValues} 
          selected={operations_executive} 
          onSelect={handleSelect} />
        <DropdownMenuOptions 
          name="sales_executive"
          label='Sales Executive'
          options={salesExecutiveValues} 
          selected={sales_executive} 
          onSelect={handleSelect} />
      </div>
      <div className='flex flex-row gap-2 w-full justify-end'>
        <Button variant="outline" className="w-40">
          Cancel
        </Button>
        <Button type="submit" className="w-40">
          Save
        </Button>
      </div>

      <SubStepActionData />
    </Form>
  );
};

export default SubStepGeneralInfoPage;

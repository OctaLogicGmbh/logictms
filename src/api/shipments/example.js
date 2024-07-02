export const work_steps = [
  {
    stage_key: 'default_initial',
    stage_name: 'Default Initial',
    step_key: 'shipment_create',
    step_name: 'New shipment',
    sub_steps: [
      {
        sub_step_key: 'header_data',
        sub_step_name: 'Header Data',
        status: 'completed',
      },
      {
        sub_step_key: 'owners',
        sub_step_name: 'Owners',
        status: 'in_progress',
      },
      {
        sub_step_key: 'involved_parties',
        sub_step_name: 'Involved Parties',
        status: 'in_progress',
      },
    ],
    prev: null,
    next: 'step2',
  },
  {
    stage_key: 'import_customs_clearance',
    stage_name: 'Import Customs Clearance',
    step_key: 'free_traffic',
    step_name: 'Free Traffic',
    sub_steps: [
      {
        sub_step_key: 'free_traffic_headers',
        sub_step_name: 'Headers',
        status: 'not_started',
      },
      {
        sub_step_key: 'free_traffic_sender',
        sub_step_name: 'Sender',
        status: 'not_started',
      },
      {
        sub_step_key: 'free_traffic_receiver',
        sub_step_name: 'Receiver',
        status: 'not_started',
      },
    ],
    prev: 'step1',
    next: 'step3',
  },
  {
    stage_key: 'default_final',
    stage_name: 'Default Final',
    step_key: 'close_shipment',
    step_name: 'Close shipment',
    sub_steps: [
      {
        sub_step_key: 'check_costs',
        sub_step_name: 'Check costs',
        status: 'not_started',
      },
      {
        sub_step_key: 'close_shipment',
        sub_step_name: 'Close shipment',
        status: 'not_started',
      },
    ],
    prev: 'step2',
    next: null,
  },
];

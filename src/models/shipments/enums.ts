import { z } from 'zod';

export const subStepKeyEnum = z.enum([
    'header_data', 'owners', 'involved_parties', 'free_traffic_headers',
    'free_traffic_sender', 'free_traffic_receiver', 'check_costs', 'close_shipment', 'general_info', 'basic',
]);
export const subStepKeyEnumValues = subStepKeyEnum.options;

export const shipmentSubStepStatus = z.enum(['completed', 'in_progress', 'not_started']);
export const shipmentSubStepStatusValues = shipmentSubStepStatus.options;

export const operationType = z.enum([
    'Import',
    'Export',
    'Local',
    'Intrahouse',
    'Crosstrade',
]);
export const operationTypeValues = operationType.options;

export const transportMode = z.enum([
    'Sea',
    'Air',
    'Land',
]);
export const transportModeValues = transportMode.options;

export const shipmentType = z.enum([
    'FCL',
    'LCL',
    'Not Contenerized',
]);
export const shipmentTypeValues = shipmentType.options;

export const incoterm = z.enum([
    'EXW',
    'FOB',
    'FCA',
    'CFR',
]);
export const incotermValues = incoterm.options;

export const operationsExecutive = z.enum([
    'Carlos Marquez',
    'Anastasiia Binsted',
    'Dmytro Bugeda',
    'Ariana Rubi',
]);
export const operationsExecutiveValues = operationsExecutive.options;

export const salesExecutive = z.enum([
    'Carlos Marquez',
    'Anastasiia Binsted',
    'Dmytro Bugeda',
    'Ariana Rubi',
]);
export const salesExecutiveValues = salesExecutive.options;

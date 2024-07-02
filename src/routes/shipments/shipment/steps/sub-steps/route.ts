import { RouteObject } from 'react-router-dom';

import { action as subStepAction } from './action';
import SubStepBasicPage from './forms/basic/page';
import SubStepCheckCostsPage from './forms/check_costs/page';
import SubStepCloseShipmentPage from './forms/close_shipment/page';
import SubStepFreeTrafficHeadersPage from './forms/free_traffic_headers/page';
import SubStepFreeTrafficReceiverPage from './forms/free_traffic_receiver/page';
import SubStepFreeTrafficSenderPage from './forms/free_traffic_sender/page';
import SubStepGeneralInfoPage from './forms/general_info/page';
import SubStepHeaderDataPage from './forms/header_data/page';
import SubStepInvolvedPartiesPage from './forms/involved_parties/page';
import SubStepOwnersPage from './forms/owners/page';
import { loader as subStepLoader } from './loader';

export const shipmentSubStepsRoute: RouteObject[] = [
  {
    path: 'check_costs',
    loader: subStepLoader('check_costs'),
    Component: SubStepCheckCostsPage,
    action: subStepAction,
  },
  {
    path: 'close_shipment',
    loader: subStepLoader('close_shipment'),
    Component: SubStepCloseShipmentPage,
    action: subStepAction,
  },
  {
    path: 'free_traffic_headers',
    loader: subStepLoader('free_traffic_headers'),
    Component: SubStepFreeTrafficHeadersPage,
    action: subStepAction,
  },
  {
    path: 'free_traffic_sender',
    loader: subStepLoader('free_traffic_sender'),
    Component: SubStepFreeTrafficReceiverPage,
    action: subStepAction,
  },
  {
    path: 'free_traffic_receiver',
    loader: subStepLoader('free_traffic_receiver'),
    Component: SubStepFreeTrafficSenderPage,
    action: subStepAction,
  },
  {
    path: 'header_data',
    Component: SubStepHeaderDataPage,
    loader: subStepLoader('header_data'),
    action: subStepAction,
  },
  {
    path: 'involved_parties',
    loader: subStepLoader('involved_parties'),
    Component: SubStepInvolvedPartiesPage,
    action: subStepAction,
  },
  {
    path: 'owners',
    loader: subStepLoader('owners'),
    Component: SubStepOwnersPage,
    action: subStepAction,
  },
  {
    path: 'general_info',
    loader: subStepLoader('general_info'),
    Component: SubStepGeneralInfoPage,
    action: subStepAction,
  },
  {
    path: 'basic',
    loader: subStepLoader('basic'),
    Component: SubStepBasicPage,
    action: subStepAction,
  },
];

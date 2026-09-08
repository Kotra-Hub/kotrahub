import { CommonAction, type AttachmentBasic } from "./common.interface";

export interface Dialog {
  title: string;
  message: string;
  btnYesName: string;
  btnNoName: string;
  btnYesColor: string;
  btnNoColor: string;
  loading: boolean;
  show: boolean;
  showRemarks: boolean;
  showChecklist?: boolean;
  showEmail: boolean;
  attachFiles: boolean;
  remarks?: string;
  remarksRequired?: boolean;
  attachments?: AttachmentBasic[];
  emails?: string[]
  checklist?: Checklist;
  action?: 'approve' | 'reject' | 'qualification' | 'calibration';
}

export const newDialog: Dialog = {
  title: 'Confirmation',
  message: 'Are you sure you want to proceed?',
  btnYesName: 'Yes',
  btnNoName: 'No',
  btnYesColor: 'primary',
  btnNoColor: 'lightprimary',
  loading: false,
  show: false,
  showRemarks: false,
  showEmail: false,
  attachFiles: false,
  showChecklist: false,
};

export const getYesBtnName = (inAction: string) => {
  return inAction == CommonAction.APPROVE 
    || inAction == CommonAction.VERIFY 
    || inAction == CommonAction.REJECT 
    || inAction == CommonAction.REQUEST_INFO 
    || inAction == CommonAction.ADD 
    ? inAction : CommonAction.CONFIRM;
    
  //   case CommonAction.REJECT:
  //     return 'Reject';
  //   case CommonAction.REQUEST_INFO:
  //     return 'Request Info';
  //   case CommonAction.ADD:
  //     return 'Add';
  //   default:
  //     return 'Confirm';
  // }
}

export const getBtnNoName = (inAction: string) => {
  return inAction == CommonAction.APPROVE 
    || inAction == CommonAction.VERIFY 
    || inAction == CommonAction.REJECT 
    ? CommonAction.REJECT  : CommonAction.CANCEL;

  // switch (inAction) {
  //   case 'approve':
  //     return 'Reject';
  //   case 'verify':
  //     return 'Reject';
  //   case 'reject':
  //     return 'Reject';
  //   default:
  //     return 'Cancel';
  // }
}
export interface Checklist {
  calibration: boolean;
  iq: boolean;
  oq: boolean;
  pq: boolean;
}
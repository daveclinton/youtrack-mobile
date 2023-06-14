import {
  createAttachmentTypes,
  attachmentActionMap,
} from 'components/attachments-row/attachment-helper';
import {getAttachmentActions} from 'components/attachments-row/attachment-actions';
const PREFIX: string = 'articleCreate';
export const attachmentTypes: Record<keyof typeof attachmentActionMap, string> = createAttachmentTypes(
  PREFIX,
);
export const attachmentActions: any = getAttachmentActions(PREFIX);

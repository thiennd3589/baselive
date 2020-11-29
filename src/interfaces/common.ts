import { AnyAction } from "redux";
import { SemanticICONS } from "semantic-ui-react/dist/commonjs/generic";

export interface Menu {
  icon?: SemanticICONS;
  title: string;
  route?: string;
}

export interface Obj {
  [key: string]: {} | undefined | null;
}

export interface Action<T> {
  type: string;
  payload: T;
  showLoading?: boolean;
  hideLoading?: boolean;
  errorMessage?: string;
  errorCode?: string;
  isResponse?: boolean;
}

export interface Request<T> extends AnyAction {
  response?: { success: string; failure: string };
  payload?: T;
}

export interface TicketInfo {
  ticketName: string;
  ticketPrice: number;
  ticketQuantity: number;
  startDate: string;
  endDate: string;
  endTime: string;
  endSale: string;
}

export interface EventInfo {
  id?: string | number;
  tags: string[];
  title: string;
  organizer?: string[];
  frequency?: string;
  categoryType?: Obj;
  category?: Obj;
  eventStart: string;
  eventEnd: string;
  endTime: string;
  startTime: string;
  summary?: string;
  description?: any;
  publishDate?: string;
  publishTime?: string;
  googleSlideUrl?: string;
  livestreamUrl?: string;
  adsImage?: string;
  adsUrl?: string;
  organizerList?: Obj[];
  documentList?: Obj[];
  eventImage?: string;
  ticketList?: TicketInfo[];
}

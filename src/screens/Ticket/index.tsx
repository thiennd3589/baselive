import Sidebar from "components/Sidebar";
import { Sidebar as SemanticSidebar, Icon } from "semantic-ui-react";
import { Global } from "global";
import React, { useEffect, useRef, useState } from "react";
import "./styles.scss";
import TextBox from "elements/TextBox";
import DateTimePicker from "elements/DateTimePicker";
import Button from "elements/Button";
import Header from "components/Header";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { State } from "redux-saga/reducers";
import { createTicket, saveEventBasicInfo } from "redux-saga/global-actions";
import { EventInfo, Obj, TicketInfo } from "interfaces/common";
import { useHistory } from "react-router-dom";

interface InforState {
  quantity: {
    value: number;
    errorMessage: string;
    showError: boolean;
  };
  name: {
    value: string;
    errorMessage: string;
    showError: boolean;
  };
  price: {
    value: number;
    errorMessage: string;
    showError: boolean;
  };
}

const TicketItem = (props: TicketInfo) => {
  return (
    <div className="TicketItem">
      <div className="Detail">
        <h3>{props.name}</h3>
        <span>{`${props.startTime} in ${props.startDate} ~ ${props.endTime} in ${props.endDate}`}</span>
      </div>
      <div className="Info">
        <div className="Quantity">{props.quantity}</div>
        <div className="Price">{props.price}</div>
        <div className="More">
          <Icon name="ellipsis vertical" />
        </div>
      </div>
    </div>
  );
};

const Ticket = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  ///State
  const [state, setState] = useState<InforState>({
    quantity: { value: 0, errorMessage: "", showError: false },
    name: { value: "", errorMessage: "", showError: false },
    price: { value: 0, errorMessage: "", showError: false },
  });
  const [, redraw] = useState({});
  const [createTicketVisible, setcreateTicketVisible] = useState(true);
  const { createEventResult, createTicketResult, eventInfo } = useSelector(
    (state: State) => ({
      createEventResult: state.createEventResult,
      createTicketResult: state.createTicketResult,
      eventInfo: state.basicInfoLocal,
    }),
    shallowEqual
  );
  ///Ref
  const listTicket = useRef<TicketInfo[]>([]);
  const ref = useRef<TicketInfo>({
    name: "",
    price: 0,
    quantity: 0,
    startDate: "",
    endDate: "",
    endTime: "",
    startTime: "",
  });

  const eventInfoRef = useRef<EventInfo>({
    tags: [],
    title: "",
    organizer: [],
    frequency: "",
    category: undefined,
    categoryType: undefined,
    eventStart: "",
    eventEnd: "",
    startTime: "",
    endTime: "",
  });
  ///Life cycle

  useEffect(() => {
    if (eventInfo) {
      eventInfoRef.current = (eventInfo as unknown) as EventInfo;
      if (eventInfoRef.current.ticketList) {
        listTicket.current = eventInfoRef.current.ticketList as TicketInfo[];
      }
      redraw({});
    }
  }, [eventInfo]);

  useEffect(() => {
    if (createTicketResult && createTicketResult.success) {
      listTicket.current.push(ref.current);
      redraw({});
    }
  }, [createTicketResult]);
  ///Function
  const toggleCreateTicket = () => {
    setcreateTicketVisible(true);
  };

  const onSubmit = () => {
    const params = {
      eventId: eventInfoRef.current.id
        ? eventInfoRef.current.id
        : (createEventResult?.response as Obj).data,
      ...ref.current,
    };
    dispatch(createTicket(params));
    setcreateTicketVisible(false);
  };

  const onCancel = () => {
    setcreateTicketVisible(false);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    ref.current = {
      ...ref.current,
      [event.target.name]: event.target.value,
    };
    setState((prevState) => ({
      ...prevState,
      [event.target.name]: {
        value: event.target.value,
        showError: false,
        errorMessage: "",
      },
    }));
  };

  const onDateTimeChange = (
    e: React.SyntheticEvent<HTMLElement, Event>,
    data: any,
    name: string
  ) => {
    ref.current = {
      ...ref.current,
      [name]: data.value,
    };
  };

  const saveTicket = () => {
    eventInfoRef.current.ticketList = listTicket.current;
    dispatch(saveEventBasicInfo((eventInfoRef.current as unknown) as Obj));
    listTicket.current = [];
    history.push("/publish");
  };

  ///
  return (
    <div className="Ticket">
      <Sidebar
        menus={Global.menu}
        eventName="Get Ins workshop"
        eventTime="Sat, 3 June, 2020"
        active="/ticket"
      />
      <div className="Main">
        <Header disableLogo />
        <div className="CreateTicket">
          <SemanticSidebar
            animation="overlay"
            icon="labeled"
            visible={createTicketVisible}
            direction="right"
            width="wide"
          >
            <div className="Title">Add ticket</div>
            <div className="Form">
              <TextBox
                label="Name"
                name="name"
                value={state.name.value ? state.name.value : ref.current.name}
                errorMessage={state.name.errorMessage}
                showError={state.name.showError}
                onChange={onChange}
              />
              <TextBox
                label="Quantity"
                name="quantity"
                value={
                  state.quantity.value
                    ? state.quantity.value
                    : ref.current.quantity
                }
                errorMessage={state.quantity.errorMessage}
                showError={state.quantity.showError}
                onChange={onChange}
              />
              <TextBox
                label="Price"
                name="price"
                value={
                  state.price.value ? state.price.value : ref.current.price
                }
                errorMessage={state.price.errorMessage}
                showError={state.price.showError}
                onChange={onChange}
              />
              <div className="DateTime">
                <div className="Start Time">
                  <DateTimePicker
                    label="Start date"
                    onChange={(e, data) => {
                      onDateTimeChange(e, data, "startDate");
                    }}
                    disabledIcon
                  />
                  <DateTimePicker
                    type="time"
                    label="End sale"
                    onChange={(e, data) => {
                      onDateTimeChange(e, data, "startTime");
                    }}
                  />
                </div>
                <div className="End Time">
                  <DateTimePicker
                    label="End date"
                    onChange={(e, data) => {
                      e.stopPropagation();
                      onDateTimeChange(e, data, "endDate");
                    }}
                    disabledIcon
                  />
                  <DateTimePicker
                    type="time"
                    label="End time"
                    onChange={(e, data) => {
                      e.stopPropagation();
                      onDateTimeChange(e, data, "endTime");
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="SubmitSection">
              <Button text="Cancel" className="Discard" onClick={onCancel} />
              <Button className="Continue" text={`Save`} onClick={onSubmit} />
            </div>
          </SemanticSidebar>
        </div>
        {listTicket.current.length > 0 ? (
          <>
            <div className="AllTicket">
              <div className="Title">
                <h3>All tickets</h3>
                <Button
                  text="Create ticket"
                  onClick={toggleCreateTicket}
                  className="ToggleCreateTicket"
                />
              </div>
              <div className="TableHeader TicketItem">
                <div className="Detail">
                  <span>Ticket details</span>
                </div>
                <div className="Info">
                  <div className="Quantity">Quantity</div>
                  <div className="Price">Price</div>
                  <div className="More">More</div>
                </div>
              </div>
              {listTicket.current.map((ticket, index) => (
                <TicketItem {...ticket} key={index} />
              ))}
            </div>
            <div className="SubmitSection">
              <Button text="Cancel" className="Discard" />
              <Button className="Continue" text={`Save`} onClick={saveTicket} />
            </div>
          </>
        ) : (
          <div className="Empty">
            <Icon name="credit card outline" />
            <h3>Let’s created tickets</h3>
            <p>
              Create a section if you want to sell multiple ticket type <br />
              that share the same inventory
            </p>
            <Button
              text="Create ticket"
              onClick={toggleCreateTicket}
              className="ToggleCreateTicket"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Ticket;

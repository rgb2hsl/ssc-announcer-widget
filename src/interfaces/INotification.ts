export interface INotificationSimple {
    type?: string;
    caption?: string;
    headline?: string;
    text: string;
}

export interface INotificationUrgent {
    type: "urgent";
    caption?: string;
    headline?: string;
    text: string;
}

export interface INotificationSchedule {
    type: "schedule";
    caption?: string;
    headline?: string;
    text: string;
    event_time: string; //"19:00"
}

export interface INotificationDonation {
    type: "donation";
    caption?: string;
    headline?: string;
    text: string;
}

export interface INotificationList {
    type: "list";
    caption?: string;
    headline?: string;
    lines: string[];
    text?: string;
}

export type INotification = INotificationSimple | INotificationUrgent | INotificationSchedule | INotificationDonation | INotificationList;
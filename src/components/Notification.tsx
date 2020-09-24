import * as React from "react";
import {INotification, INotificationList, INotificationSchedule} from "../interfaces/INotification";
import {useEffect, useState} from "react";
import {LIST_SCROLL_DELAY} from "../const/urlParameters";

interface IProps {
    notification: INotification;
    fade: boolean;
}

export const Notification = (props: IProps) => {
    const
        {notification, fade} = props;

    const [listItem, setListItem] = useState(0);
    useEffect(() => {
        try {if (props.notification.type === "list") {
            const timer = setTimeout(() => {
                setListItem((listItem + 1) % (notification as INotificationList).lines.length)
            }, LIST_SCROLL_DELAY);

            return () => {
                clearTimeout(timer);
            }
        }} catch (e) {
            console.error("List scrolling problem", e);
        }
    }, []);

    let content;

    if (notification.type == "list") {
        try {
            content = <div className="animate__animated animate__fadeIn">{(notification as INotificationList).lines[listItem]}</div>;
        } catch (e) {
            content = "";
            console.error("List rendering problem", e);

        }
    } else {
        content = notification.text;
    }

    const
        className = (notification.type ? `notification notification--${notification.type}` : "notification");

    let headerClassName = "notification__header";

    if (notification.type == "donation") {
        headerClassName = "notification__header animate__animated animate__delay-2s animate__bounce";
    }

    if (notification.type == "list") {
        headerClassName = "notification__header animate__animated animate__delay-2s animate__infinite animate__pulse";
    }



    const toast = notification.type == "donation"
        ? <img src="sr.apng" alt="" className="notification__toast"/>
        : null;

    return (
        <div className={`${className} animate__animated ${fade ? 'animate__backOutLeft' : 'animate__backInLeft'}`}>
            <div className={headerClassName}>
                {notification.caption ? (
                    <div className="notification__header-text">
                        {notification.caption}
                    </div>
                ) : null}
                {notification.type == "schedule" && (notification as INotificationSchedule).event_time ? (
                    <div className="notification__time">
                        {(notification as INotificationSchedule).event_time}
                    </div>
                ) : null}
            </div>
            <div className="notification__body">
                {notification.headline ? (
                    <div className="notification__headline">
                        {notification.headline}
                    </div>
                ) : null}
                <div className="notification__content">
                    {content}
                </div>
                {toast}
            </div>
        </div>
    );
};
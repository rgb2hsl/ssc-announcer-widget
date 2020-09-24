import React, {useEffect, useState} from "react";
import {INotification} from "./interfaces/INotification";
import axios from "axios";
import * as yup from "yup";
import {Notification} from "./components/Notification";

const
    api = process.env.REACT_APP_API ? process.env.REACT_APP_API : "",
    token = process.env.REACT_APP_TOKEN ? process.env.REACT_APP_TOKEN : "",

    fadeDelay = process.env.REACT_APP_FADE_DELAY ? parseInt(process.env.REACT_APP_FADE_DELAY) : 7000,

    pollDelay:number = process.env.REACT_APP_POLL_DELAY ? parseInt(process.env.REACT_APP_POLL_DELAY) : 500;

const pollSchema = yup.object().shape({
    type: yup.string().required(),
    caption: yup.string().required(),
    headline: yup.string().required(),
    text: yup.string().required(),
});

interface AppState {
    notification: null|INotification;
    fade: boolean;
}

export const App = () => {
    let pollTimeout: number, fadeTimeout: number, rePollTimeout: number;

    const
        [AppState, setState]:[AppState, Function] = useState({
            notification: null,
            fade: false
        }),

        poll = () => {
            axios.get(`${api}/api/poll/${token}`)
                .then(function (response) {

                    if (response.status === 200 && response.data.message && pollSchema.isValidSync(response.data.message)) {

                        setState({
                            notification: (response.data.message as INotification),
                            fade: false
                        });

                        fadeTimeout = window.setTimeout(() => {
                            setState({
                                notification: (response.data.message as INotification),
                                fade: true
                            });

                            //после завершения анимации возобновляем очередь
                            rePollTimeout = window.setTimeout(() => {
                                setState({
                                    notification: null,
                                    fade: false
                                });
                                poll();
                            }, pollDelay + 500);

                        }, fadeDelay);

                    } else {
                        //повторяем
                        pollTimeout = window.setTimeout(() => poll(), pollDelay);
                    }
                })
                .catch(function (error) {
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    } else if (error.request) {
                        // The request was made but no response was received
                        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                        // http.ClientRequest in node.js
                        console.log(error.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log('Error', error.message);
                    }
                    console.log(error.config);
                });
        };

    useEffect(() => {
        poll();

        return () => {
            try {
                clearTimeout(pollTimeout);
                clearTimeout(fadeTimeout);
                clearTimeout(rePollTimeout);
            } catch (e) {
                console.error(e);
            }
        }
    }, []);

    return (
        <div className="container-wrapper">
            <div className="container">
                {AppState.notification ? (
                    <Notification notification={AppState.notification} fade={AppState.fade}/>
                ) : null}
            </div>
        </div>
    );
};
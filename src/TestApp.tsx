import {INotification} from "./interfaces/INotification";
import {Notification} from "./components/Notification";
import React from "react";

export const TestApp = () => {
    const notifications: INotification[] = [
        {
            type: "urgent",
            caption: "любой важный текст",
            headline: "увага! это важно!",
            text: "Это сообщение гораздо контрастнее простого и нужно для каких-нибудь особых объявлений, такие дела",

        },
        {
            caption: "нет хедлайнера",
            text: "Это сообщение гораздо контрастнее простого и нужно для каких-нибудь особых объявлений, такие дела",

        },
        {
            caption: "любой текст",
            headline: "хэдлайн",
            text: "А это сам текст, лучше не пытаться делать это на HTML, а прям честно хранить отдельно. В это поле влезает 2 строчки",
        },
        {
            type: "schedule",
            caption: "далее",
            event_time: "19:00", //нужно чтобы это время тоже менялось при сдвиге сообщений, это важно!
            headline: "BADNIK LIVE 2020",
            text: "Уникальное описание фанатстической викторины! Не переключайтесь",
        },
        {
            type: "donation",
            caption: "нам пишут",
            headline: "Максим Поликарпов",
            text: "Почему Машу и Мишу убрали c постов? ХВАТИТ замалчивать ПРАВДА! Вы узурпировали власть, СЫЕНДУК!",
        },
        {
            type: "list",
            caption: "торжественный заголовок",
            headline: "победители конкурса косплея",
            lines: [
                "3 место — Денчик “DENCH” Поликарпов",
                "2 место — Сергей Смирнов",
                "1 место — Кек Пеков! Поздравляем!"
            ],
        }
    ];

    return (
        <div className="container-wrapper">
            <div className="test-container">
                {notifications.map((n, i) => <Notification fade={false} notification={n} key={i}/>)}
            </div>
        </div>
    );
};
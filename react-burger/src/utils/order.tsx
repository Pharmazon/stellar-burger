import {IFeedOrder} from "../types/feedOrder";
import {IIngredient} from "../types/ingredient";

export const calculateOrderTotal = (order: IFeedOrder, items: ReadonlyArray<IIngredient>) => {
    if (items === null) {
        return
    }

    const orderIngredients = order.ingredients.map((id) =>
        items.find((ing) => ing._id === id)
    );

    return (
        orderIngredients.reduce((sum, element) => {
            return sum + (element?.price || 0);
        }, 0)
    );
};

export const getFormattedDate = (isoString: string): string => {
    const date = new Date(isoString);
    const now = new Date();

    // Определяем часовой пояс пользователя
    const timeZoneOffset = -date.getTimezoneOffset() / 60; // в часах
    const timeZoneString = `i-GMT${timeZoneOffset >= 0 ? '+' : ''}${timeZoneOffset}`;

    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const dayBeforeYesterday = new Date(today);
    dayBeforeYesterday.setDate(dayBeforeYesterday.getDate() - 2);

    const inputDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    const timeString = date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
    });

    if (inputDate.getTime() === today.getTime()) {
        return `Сегодня, ${timeString} ${timeZoneString}`;
    } else if (inputDate.getTime() === yesterday.getTime()) {
        return `Вчера, ${timeString} ${timeZoneString}`;
    } else if (inputDate.getTime() === dayBeforeYesterday.getTime()) {
        return `2 дня назад, ${timeString} ${timeZoneString}`;
    } else {
        return `${date.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long'
        })}, ${timeString} ${timeZoneString}`;
    }
};
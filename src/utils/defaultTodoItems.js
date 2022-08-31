import randomizeId from './randomizeId';

const defaultTodoItems = [
    // список дел по умолчанию
    { id: randomizeId(), title: 'Помыть посуду' },
    { id: randomizeId(), title: 'Погладить кошку' },
    { id: randomizeId(), title: 'Сходить на прогулку' },
];

export default defaultTodoItems;

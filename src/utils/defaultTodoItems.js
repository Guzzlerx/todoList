import randomizeId from './randomizeId';

const defaultTodoItems = [
    // список дел по умолчанию
    {id: randomizeId(), title: 'Помыть посуду', status: 'completed'},
    {id: randomizeId(), title: 'Погладить кошку', status: 'inprocess'},
    {id: randomizeId(), title: 'Сходить на прогулку', status: 'waiting'},
];

export default defaultTodoItems;

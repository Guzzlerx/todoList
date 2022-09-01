import { useEffect, useState } from 'react';

import TodoList from './TodoList';
import TodoMenu from './TodoMenu';
import defaultTodoItems from '../utils/defaultTodoItems';
import randomizeId from '../utils/randomizeId';

import './App.css';

function filterItems(searchText, listOfItems) {
    // Функция поиска элементов по имени
    if (!searchText) {
        return listOfItems;
    }

    return listOfItems.filter(({ title }) =>
        title.toLowerCase().includes(searchText.toLowerCase())
    );
}

const App = () => {
    const [todoItems, setTodoItems] = useState(defaultTodoItems);
    const [selectedItem, setSelectedItem] = useState('Выберите дело из списка'); // стэйт отображаемого дела
    const [searchedItem, setSearchedItem] = useState(''); // стэйт инпута поиска
    const [editInputValue, setEditInputValue] = useState(''); // стэйт инпута редактирования
    const [addInputValue, setAddInputValue] = useState(''); // стэйт инпута добавления

    function selectItem(id) {
        // При клике сюда приходит id, фильтруем массив дел и рендерим дело в меню
        const filteredItem = todoItems.filter((item) => item.id === id)[0];

        setSelectedItem(filteredItem);
    }

    function searchItem(e) {
        // Обновляем стейт при вводе чего-либо в поиск
        setSearchedItem(e.target.value);
    }

    function deleteItem(id) {
        // Удаляем дело из списка через фильтрацию массива дел
        const clearedItems = todoItems.filter((item) => item.id !== id);

        setTodoItems(clearedItems);
        // Устанавливаем дело по умолчанию
        setSelectedItem('');
    }

    function editItem(id) {
        // Валидация на отсутствие пустого заголовка
        if (!editInputValue) {
            return;
        }

        // Ищем дело в массиве, если нашли, то меняем название на новое из инпута
        const editedItems = todoItems.map((item) => {
            if (item.id === id) {
                item.title = editInputValue;
            }
            return item;
        });

        setTodoItems(editedItems);
        // Очищаем инпут после изменений
        setEditInputValue('');
    }

    function addItem(e) {
        e.preventDefault();
        // Добавляем новое дело, если инпут с title не пустой
        if (addInputValue) {
            setTodoItems((state) => [
                ...state,
                { id: randomizeId(), title: addInputValue },
            ]);
        }
        // Очищаем инпут
        setAddInputValue('');
    }

    useEffect(() => {
        // При изменении зависимости вызываем функцию filterItems
        const filteredItems = filterItems(searchedItem, defaultTodoItems);

        setTodoItems(filteredItems);
    }, [searchedItem]);

    return (
        <div className="container">
            <TodoList
                todoItems={todoItems}
                searchedItem={searchedItem}
                onItemClick={selectItem}
                onSearch={searchItem}
                selectedItem={selectedItem}
            />
            <TodoMenu
                selectedItem={selectedItem}
                onDeleteClick={deleteItem}
                editInputValue={editInputValue}
                onEditInput={setEditInputValue}
                onEditClick={editItem}
                onAddClick={addItem}
                addInputValue={addInputValue}
                onAddInput={setAddInputValue}
            />
        </div>
    );
};

export default App;

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
    const [selectedItem, setSelectedItem] = useState(''); // стэйт отображаемого дела
    const [searchedItem, setSearchedItem] = useState(''); // стэйт инпута поиска

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

    function editItem(id, title) {
        // Валидация на отсутствие пустого заголовка
        if (!title) {
            return;
        }

        // Ищем дело в массиве, если нашли, то меняем название на новое из инпута
        const editedItems = todoItems.map((item) => {
            if (item.id === id) {
                item.title = title;
            }
            return item;
        });

        setTodoItems(editedItems);
    }

    function addItem(title) {
        // Добавляем новое дело, если инпут с title не пустой
        if (title) {
            setTodoItems((state) => [
                ...state,
                {id: randomizeId(), status: 'waiting', title},
            ]);
        }
    }

    function setItemStatus(id, value) {
        // при клике по чекбоксу меняем статус дела в массиве дел
        const editedTodoItems = todoItems.map((item) => {
            if (item.id === id) {
                item.status = value;
            }
            return item;
        });

        setTodoItems(editedTodoItems);
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
                onEditClick={editItem}
                onAddClick={addItem}
                onCheckboxClick={setItemStatus}
            />
        </div>
    );
};

export default App;

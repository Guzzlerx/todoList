import TodoItem from './TodoItem';

import './TodoList.css';

const TodoList = ({
    todoItems,
    onItemClick,
    searchedItem,
    onSearch,
    selectedItem,
    todoStatus,
}) => {
    return (
        <div className="list">
            <input
                placeholder="Введите название"
                className="list__input"
                value={searchedItem}
                onInput={onSearch}
            />
            <ul className="list__items">
                {todoItems.map((item) => (
                    <TodoItem
                        key={item.id}
                        {...item}
                        onItemClick={onItemClick}
                        selectedItem={selectedItem}
                        todoStatus={todoStatus}
                    />
                ))}
            </ul>
        </div>
    );
};

export default TodoList;

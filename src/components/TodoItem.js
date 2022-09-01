import './TodoItem.css';

const TodoItem = ({ id, status, title, onItemClick, selectedItem }) => {
    const isSelected = selectedItem.id === id;

    function handleClick() {
        onItemClick(id);
    }

    return (
        <li
            onClick={handleClick}
            // Если кликнут, то добавляем класс active
            // в зависимости от статуса добавляем доп.класс для цвета
            className={`list__item ${
                isSelected ? 'list__item_active' : ''
            } list__item_${status}`}
        >
            {title}
        </li>
    );
};

export default TodoItem;

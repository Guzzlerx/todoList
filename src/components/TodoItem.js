import './TodoItem.css';

const TodoItem = ({ id, title, onItemClick, selectedItem }) => {
    const isSelected = selectedItem.id === id;

    function handleClick() {
        onItemClick(id);
    }

    return (
        <li
            onClick={handleClick}
            className={`list__item ${isSelected ? 'list__item_active' : ''}`}
        >
            {title}
        </li>
    );
};

export default TodoItem;

import './TodoItem.css';

const TodoItem = ({ id, title, onItemClick }) => {
    function handleClick() {
        onItemClick(id);
    }

    return (
        <li onClick={handleClick} className="list__item">
            {title}
        </li>
    );
};

export default TodoItem;

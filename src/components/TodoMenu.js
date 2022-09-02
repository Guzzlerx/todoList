import { useEffect, useState } from 'react';

import './TodoMenu.css';
import './TodoItem.css';

const TodoMenu = ({
    selectedItem,
    onDeleteClick,
    onEditClick,
    onAddClick,
    onCheckboxClick,
}) => {
    const [editItemInput, setEditItemInput] = useState('');
    const [addItemInput, setAddItemInput] = useState('');

    // Если ничего не выбрано, то показывать текст по умолчанию
    const { id, status, title = 'Выберите дело из списка' } = selectedItem;
    const isItemSelected = title !== 'Выберите дело из списка';

    function handleDeleteClick(e) {
        e.preventDefault();

        onDeleteClick(id);
    }

    function handleEditInput(e) {
        // Меняем стэйт при изменении инпута
        setEditItemInput(e.target.value);
    }

    function handleEditButtonClick(e) {
        // Убираем стандартное поведение браузера и отдаем айдишник выше
        e.preventDefault();

        onEditClick(id, editItemInput);
    }

    function handleAddInput(e) {
        // Меняем стэйт при изменении инпута
        setAddItemInput(e.target.value);
    }

    function handleAddButtonClick(e) {
        // Убираем стандартное поведение браузера и отдаем айдишник выше
        e.preventDefault();

        onAddClick(addItemInput);
        // Очищаем инпут
        setAddItemInput('');
    }

    function handleCheckboxClick(e) {
        onCheckboxClick(id, e.target.value);
    }

    useEffect(() => {
        setEditItemInput(title);
    }, [title]);

    return (
        <div className="menu">
            <div className="menu__item">
                <h3 className={`menu__item-title list__item_${status}`}>
                    {title}
                </h3>
                {
                    // Рендерить форму, если только дело выбрано
                    isItemSelected && (
                        <>
                            <form className="menu__form">
                                <input
                                    value={editItemInput}
                                    onInput={handleEditInput}
                                />
                                <button
                                    name="btn-edit"
                                    className="menu__item-input"
                                    onClick={handleEditButtonClick}
                                >
                                    Редактировать
                                </button>
                                <button
                                    onClick={handleDeleteClick}
                                    name="btn-delete"
                                    className="menu__item-input"
                                >
                                    Удалить
                                </button>
                            </form>
                            <div className="menu__radio">
                                <label>
                                    <input
                                        name="todo-status"
                                        type="radio"
                                        value="waiting"
                                        checked={status === 'waiting'}
                                        onChange={handleCheckboxClick}
                                    />
                                    Ожидает
                                </label>
                                <label className="menu__radio_waiting">
                                    <input
                                        name="todo-status"
                                        type="radio"
                                        value="inprocess"
                                        checked={status === 'inprocess'}
                                        onChange={handleCheckboxClick}
                                    />
                                    В процессе
                                </label>
                                <label className="menu__radio_completed">
                                    <input
                                        name="todo-status"
                                        type="radio"
                                        value="completed"
                                        checked={status === 'completed'}
                                        onChange={handleCheckboxClick}
                                    />
                                    Выполнена
                                </label>
                            </div>
                        </>
                    )
                }
            </div>
            <hr />
            <div className="menu__item">
                <h3 className="menu__item-title">Добавить новое дело</h3>
                <form className="menu__form">
                    <input
                        value={addItemInput}
                        onInput={handleAddInput}
                        placeholder="Позвонить в банк"
                    />
                    <button
                        onClick={handleAddButtonClick}
                        name="btn-add"
                        type="submit"
                        className="menu__item-input"
                    >
                        Создать
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TodoMenu;

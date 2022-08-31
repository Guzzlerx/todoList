import './TodoMenu.css';

const TodoMenu = ({
    selectedItem,
    onDeleteClick,
    editInputValue,
    onEditInput,
    onEditClick,
    onAddClick,
    addInputValue,
    onAddInput,
}) => {
    // Если ничего не выбрано, то показывать текст по умолчанию
    const title = selectedItem.title || 'Выберите дело из списка';
    const id = selectedItem.id;

    function handleDeleteClick(e) {
        e.preventDefault();

        onDeleteClick(id);
    }

    function handleEditInput(e) {
        // Меняем стэйт при изменении инпута
        onEditInput(e.target.value);
    }

    function handleEditButton(e) {
        // Убираем стандартное поведение браузера и отдаем айдишник выше
        e.preventDefault();

        onEditClick(id);
    }

    function handleAddInput(e) {
        // Меняем стэйт при изменении инпута
        onAddInput(e.target.value);
    }

    return (
        <div className="menu">
            <div className="menu__item">
                <h3 className="menu__item-title">{title}</h3>
                {selectedItem.title && (
                    // Рендерить кнопки, если только дело выбрано
                    <form className="menu__form">
                        <input
                            placeholder={selectedItem.title}
                            value={editInputValue}
                            onInput={handleEditInput}
                        />
                        <button
                            name="btn-edit"
                            className="menu__item-input"
                            onClick={handleEditButton}
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
                )}
            </div>
            <hr />
            <div className="menu__item">
                <h3 className="menu__item-title">Добавить новое дело</h3>
                <form className="menu__form">
                    <input
                        value={addInputValue}
                        onInput={handleAddInput}
                        placeholder="Позвонить в банк"
                    />
                    <button
                        onClick={onAddClick}
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

const randomizeId = () => {
    // Функция генерации случайного id, чтобы key не повторялись
    return Math.floor(Math.random() * 100000000);
};

export default randomizeId;

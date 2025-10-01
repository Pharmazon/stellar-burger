import PropTypes from 'prop-types';

ProductPage.propTypes = {
    // Проверка пропса на соответствие определённому JS-типу.
    optionalString: PropTypes.string,
    optionalNumber: PropTypes.number,
    optionalBool: PropTypes.bool,
    optionalArray: PropTypes.array,
    optionalObject: PropTypes.object,
    optionalSymbol: PropTypes.symbol,
    optionalFunc: PropTypes.func,

    // Значение любого типа
    optionalAny: PropTypes.any,

    // Всё, что может быть отрендерено:
    // числа, строки, элементы или массивы
    // (или фрагменты), содержащие эти типы
    optionalNode: PropTypes.node,

    // React-элемент
    optionalElement: PropTypes.element,

    // Тип React-элемента (например, MyComponent).
    optionalElementType: PropTypes.elementType,

    // Можно указать, что пропс должен быть экземпляром класса
    // Для этого используется JS-оператор instanceof.
    optionalMessage: PropTypes.instanceOf(Review),

    // Вы можете задать ограничение конкретными значениями
    // при помощи перечисления
    optionalEnum: PropTypes.oneOf(['Size', 'Color', 'Brand']),

    // Объект одного из нескольких типов
    optionalUnion: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.instanceOf(Review)
    ]),

    // Массив объектов конкретного типа
    optionalArrayOf: PropTypes.arrayOf(PropTypes.number),

    // Объект со свойствами конкретного типа
    optionalObjectOf: PropTypes.objectOf(PropTypes.number),

    // Объект с определённой структурой
    optionalObjectWithShape: PropTypes.shape({
        color: PropTypes.string,
        fontSize: PropTypes.number
    }),

    // При наличии необъявленных свойств в объекте будут вызваны предупреждения
    optionalObjectWithStrictShape: PropTypes.exact({
        name: PropTypes.string,
        quantity: PropTypes.number
    }),

    // Можно добавить `isRequired` к любому приведённому выше типу,
    // чтобы показывать предупреждение,
    // если пропс не передан
    requiredFunc: PropTypes.func.isRequired,

    // Можно добавить собственный валидатор.
    // Он должен возвращать объект `Error` при ошибке валидации.
    // Не используйте `console.warn` или `throw`: 
    // это не будет работать внутри `oneOfType`
    customProp: function(props, propName, componentName) {
        if (!/matchme/.test(props[propName])) {
            return new Error(
                'Проп `' + propName + '` компонента' +
                ' `' + componentName + '` имеет неправильное значение'
            );
        }
    },

    // Можно задать свой валидатор для `arrayOf` и `objectOf`.
    // Он должен возвращать объект Error при ошибке валидации.
    // Валидатор будет вызван для каждого элемента в массиве
    // или для каждого свойства объекта.
    // Первые два параметра валидатора 
    // — это массив или объект и ключ текущего элемента
    customArrayProp: PropTypes.arrayOf(function(propValue, key, componentName, location, propFullName) {
        if (!/matchme/.test(propValue[key])) {
            return new Error(
                'Проп `' + propFullName + '` компонента' +
                ' `' + componentName + '` имеет неправильное значение'
            );
        }
    })
};
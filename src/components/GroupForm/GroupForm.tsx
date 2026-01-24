import '../FormLayout/FormLayout.css';
import './GroupForm.css';
import { type ChangeEvent, type SyntheticEvent, useCallback, useState } from 'react';

type Names = Record<string, string>;

export default function GroupForm() {
    const [emptyFieldsCount, setEmptyFieldsCount] = useState(0);

    const [groupName, setGroupName] = useState('');

    const [names, setNames] = useState<Names>({});

    const handleGroupNameInput = (e: ChangeEvent<HTMLInputElement>): void => {
        setGroupName(e.target.value);
    };

    const handleNameInput = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;

        setNames((prev: Names) => ({ ...prev, [name]: value }));
    }, []);

    const handleEditClick = (e: SyntheticEvent<HTMLElement>): void => {
        const el = e.currentTarget.querySelector('input[type="text"]') as HTMLInputElement;

        el.focus();
    };

    const handleAddClick = () => {
        setEmptyFieldsCount(prev => prev + 1);
    };

    const handleSubmitClick = useCallback(() => {
        console.log(groupName);
        console.log(names);
    }, [groupName, names]);

    return (
        <div className="form-layout__container">
            <div
                onClick={handleEditClick}
                className='form-layout__row form-layout__row_bordered form-layout__row_header-input group-form__row'
            >
                <input
                    className='form-layout__text-input_invisible-border form-layout__text-input_header'
                    type="text"
                    placeholder='Отчаянные козявки'
                    onChange={handleGroupNameInput}
                />
            </div>
            {Array.from({ length: emptyFieldsCount }).map((_: unknown, index: number) => (
                <div
                    onClick={handleEditClick}
                    className='form-layout__row form-layout__row_bordered group-form__row'
                    key={index}
                    style={{ cursor: 'text' }}
                >
                    <input
                        className='form-layout__text-input_invisible-border'
                        type='text'
                        placeholder='Введите имя'
                        onChange={handleNameInput}
                        name={`input-${String(index)}`}
                    />
                </div>
            ))}
            <div
                onClick={handleAddClick}
                className='form-layout__row form-layout__row_bordered group-form__row'
                style={{ cursor: 'pointer', gap: '1rem' }}
            >
                <div className='group-form__add-button'>
                    <span>+</span>
                </div>
                <div>
                    <span>Добавить члена группы</span>
                </div>
            </div>
            <button
                onClick={() => { handleSubmitClick(); }}
                className='form-layout__button_primary form-layout__button_full-width'
            >Создать группу</button>
        </div>
    );
}

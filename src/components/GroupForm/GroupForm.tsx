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
        <div className="group-form__container">
            <div>
                <h2 style={{ textAlign: 'left' }}>Создать группу</h2>
            </div>
            <div className='group-form__row group-form__header'>
                <div>
                    <span>Назовите группу:</span>
                </div>
                <div>
                    <input
                        className='group-form__text-input'
                        type="text"
                        placeholder='Отчаянные козявки'
                        onChange={handleGroupNameInput}
                    />
                </div>
            </div>
            {Array.from({ length: emptyFieldsCount }).map((_: unknown, index: number) => (
                <div
                    onClick={handleEditClick}
                    className='group-form__row'
                    key={index}
                >
                    <div>
                        <input
                            className='group-form__text-input'
                            type='text'
                            placeholder='Введите имя'
                            onChange={handleNameInput}
                            name={`input-${String(index)}`}
                        />
                    </div>
                </div>
            ))}
            <div
                onClick={handleAddClick}
                className='group-form__row'
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
                className='group-form__submit-button'
            >Создать группу</button>
        </div>
    );
}

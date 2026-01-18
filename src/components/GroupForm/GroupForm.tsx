import './GroupForm.css';
import { type ChangeEvent, type SyntheticEvent, useCallback, useState } from 'react';

export default function GroupForm() {
    const [emptyFieldsCount, setEmptyFieldsCount] = useState(0);

    const [groupName, setGroupName] = useState('');

    type Names = Record<number, string>;
    type SetNames = (names: Names) => void;

    const [names, setNames] = useState<Names>({});

    const handleGroupNameInput = (e: ChangeEvent<HTMLInputElement>) => {
        setGroupName(e.target.value);
    };

    const handleNameInput = useCallback((e: ChangeEvent<HTMLInputElement>, names: Names, setNames: SetNames) => {
        const { name, value } = e.target;

        setNames({ ...names, [name]: value });
    }, []);

    const handleEditClick = useCallback((e: SyntheticEvent<HTMLElement>) => {
        const el = e.currentTarget.querySelector('input[type="text"]') as HTMLInputElement;

        el.focus();
    }, []);

    const handleAddClick = useCallback(() => {
        setEmptyFieldsCount(prev => prev + 1);
    }, []);

    const handleSubmitClick = useCallback((groupName: string, names: Names) => {
        console.log(groupName);
        console.log(names);
    }, []);

    return (
        <div className="group-form-container">
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
                            onChange={(e: ChangeEvent<HTMLInputElement>) => { handleNameInput(e, names, setNames); }}
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
                onClick={() => { handleSubmitClick(groupName, names); }}
                className='group-form__submit-button'
            >Создать группу</button>
        </div>
    );
}

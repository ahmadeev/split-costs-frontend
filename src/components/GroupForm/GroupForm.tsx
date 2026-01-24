import '../FormLayout/FormLayout.css';
import './GroupForm.css';
import { type ChangeEvent, type SyntheticEvent, useCallback, useState } from 'react';
import FormLayout from '../FormLayout/FormLayout.tsx';
import type { Group, MemberResponseDTO } from '../../types/types.ts';

export type Names = Record<string, string>;

const handleEditClick = (e: SyntheticEvent<HTMLElement>): void => {
    const el = e.currentTarget.querySelector('input[type="text"]') as HTMLInputElement;

    el.focus();
};

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

    const handleAddClick = () => {
        setEmptyFieldsCount(prev => prev + 1);
    };

    const handleSubmitClick = useCallback(() => {
        const members: MemberResponseDTO[] = Object.entries(names).map(([id, name]: [string, string]): MemberResponseDTO => {
            return { id: +id, name: name };
        });

        const group: Group = { name: groupName, members };

        console.log(group);
    }, [groupName, names]);

    return (
        <FormLayout>
            <div
                className='form-layout__row form-layout__row_bordered form-layout__row_header-input'
                onClick={handleEditClick}
            >
                <input
                    type="text"
                    className='form-layout__text-input_invisible-border form-layout__text-input_header'
                    placeholder='Отчаянные козявки'
                    onChange={handleGroupNameInput}
                />
            </div>
            {Array.from({ length: emptyFieldsCount }).map((_: unknown, index: number) => (
                <div
                    className='form-layout__row form-layout__row_bordered'
                    onClick={handleEditClick}
                    key={index}
                    style={{ cursor: 'text' }}
                >
                    <input
                        type='text'
                        className='form-layout__text-input_invisible-border'
                        name={`input-${String(index)}`}
                        placeholder='Введите имя'
                        onChange={handleNameInput}
                    />
                </div>
            ))}
            <div
                className='form-layout__row form-layout__row_bordered'
                onClick={handleAddClick}
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
                className='form-layout__button_primary form-layout__button_full-width'
                onClick={() => {
                    handleSubmitClick();
                }}
            >Создать группу
            </button>
        </FormLayout>
    );
}

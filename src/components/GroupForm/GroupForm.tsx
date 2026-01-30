import '../FormLayout/FormLayout.css';
import './GroupForm.css';
import { type ChangeEvent, type SyntheticEvent, useCallback, useState } from 'react';
import FormLayout from '../FormLayout/FormLayout.tsx';
import type { Group, MemberResponseDTO } from '../../types/types.ts';
import Delete from '../../icons/delete_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg?react';
import TextInput from '../../ui/TextInput/TextInput.tsx';
import Button from '../../ui/Button/Button.tsx';

export type Names = Record<string, string>;

const handleEditClick = (e: SyntheticEvent<HTMLElement>): void => {
    const el = e.currentTarget.querySelector('input[type="text"]') as HTMLInputElement;

    el.focus();
};

export default function GroupForm() {
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
        setNames((prev: Names) => ({ ...prev, [crypto.randomUUID()]: '' }));
    };

    const handleSubmitClick = useCallback(() => {
        const members: MemberResponseDTO[] = Object.entries(names).map(([id, name]: [string, string]): MemberResponseDTO => {
            return { id: +id, name: name };
        });

        const group: Group = { name: groupName, members };

        console.log(group);
    }, [groupName, names]);

    const handleDeleteClick = useCallback((e: React.MouseEvent<HTMLDivElement>, name: string) => {
        e.stopPropagation();

        setNames(prev => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { [name]: _, ...rest } = prev;

            return { ...rest };
        });
    }, []);

    return (
        <FormLayout>
            <TextInput
                title={'Группа'}
                onChange={handleGroupNameInput}
                value={groupName}
                placeholder={'Отчаянные козявки'}
            />
            <div className='group-form__input-container'
                style={{
                    display: Object.keys(names).length ? 'flex' : 'none',
                    flexDirection: 'column',
                    gap: '0.5rem',
                }}
            >
                {Object.keys(names).map((nameKey: string, index: number) => (
                    <div
                        className='form-layout__row form-layout__row_bordered group-form__row'
                        onClick={handleEditClick}
                        key={index}
                        style={{ cursor: 'text', gap: '0.5rem' }}
                    >
                        <input
                            type='text'
                            className='form-layout__text-input_invisible-border'
                            name={nameKey}
                            value={names[nameKey]}
                            placeholder={`Участник #${String(index + 1)}`}
                            onChange={handleNameInput}
                            style={{ textOverflow: 'ellipsis' }}
                        />
                        <div
                            className='group-form__delete-button'
                            onClick={(e) => { handleDeleteClick(e, nameKey); }}
                        >
                            <Delete style={{ fill: '#424242' }} />
                        </div>
                    </div>
                ))}
            </div>
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
            <Button
                title={'Создать группу'}
                onClick={handleSubmitClick}
                type={'primary'}
            />
        </FormLayout>
    );
}

import '../../components/FormLayout/FormLayout.css';
import './GroupForm.css';
import { type ChangeEvent, type SyntheticEvent, useCallback, useState } from 'react';
import FormLayout from '../../components/FormLayout/FormLayout.tsx';
import Delete from '../../icons/delete_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg?react';
import Add from '../../icons/add_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg?react';
import TextInput from '../../ui/TextInput/TextInput.tsx';
import { Button } from '../../ui/Button/Button.tsx';
import type { CreateGroupDto } from '../../api/group/dto.ts';
import type { CreateMemberDto } from '../../api/member/dto.ts';
import { groupService } from '../../api/group/service.ts';

const MEMBERS_LIMIT = 5;

export type Names = Record<string, string>;

const handleEditClick = (e: SyntheticEvent<HTMLElement>): void => {
    const el = e.currentTarget.querySelector('input[type="text"]') as HTMLInputElement;

    el.focus();
};

export default function GroupForm() {
    const [groupName, setGroupName] = useState('');

    const [names, setNames] = useState<Names>({});

    const namesKeys = Object.keys(names);

    const handleGroupNameInput = (e: ChangeEvent<HTMLInputElement>): void => {
        setGroupName(e.target.value);
    };

    const handleNameInput = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;

        setNames((prev: Names) => ({ ...prev, [name]: value }));
    }, []);

    const handleAddClick = () => {
        if (namesKeys.length >= MEMBERS_LIMIT) {
            return;
        }

        setNames((prev: Names) => ({ ...prev, [crypto.randomUUID()]: '' }));
    };

    const handleSubmitClick = useCallback(() => {
        const members: CreateMemberDto[] = Object.entries(names).map(([, name]: [string, string], index: number): CreateMemberDto => {
            return { name: name ? name : `Участник #${String(index + 1)}` };
        });

        const group: CreateGroupDto = { name: groupName ? groupName : 'Новая группа', members };

        groupService.create(group)
            .then(() => {
                setGroupName('');
                setNames({});
            })
            .catch((error: unknown) => {
                console.error('Ошибка при создании группы', error);
            });
    }, [groupName, names]);

    const handleDeleteClick = useCallback((e: React.MouseEvent<HTMLElement>, name: string) => {
        e.stopPropagation();

        setNames(prev => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { [name]: _, ...rest } = prev;

            return { ...rest };
        });
    }, []);

    const isAddButtonDisabled = namesKeys.length >= MEMBERS_LIMIT;

    return (
        <FormLayout>
            <div className="form-layout__section">
                <TextInput
                    label={'Группа'}
                    onChange={handleGroupNameInput}
                    controlledValue={groupName}
                    placeholder={'Отчаянные козявки'}
                />
                <div className='group-form__input-container'
                    style={{
                        display: namesKeys.length ? 'flex' : 'none',
                        flexDirection: 'column',
                        gap: '0.5rem',
                    }}
                >
                    <div
                        style={{
                            color: 'var(--secondary-color)',
                            textAlign: 'left',
                            padding: '0.6rem 1.2rem',
                        }}
                    >
                        <span>Добавлено: {namesKeys.length} / {MEMBERS_LIMIT}</span>
                    </div>
                    {namesKeys.map((nameKey: string, index: number) => (
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
                                style={{ textOverflow: 'ellipsis', fontSize: '1rem' }}
                            />

                            <Button
                                children={<Delete style={{ fill: '#424242' }}/>}
                                className='group-form__delete-button'
                                onClick={(e) => {
                                    handleDeleteClick(e, nameKey);
                                }}
                            />
                        </div>
                    ))}
                </div>
                <Button
                    variant={'secondary'}
                    onClick={handleAddClick}
                    style={{ gap: '1rem', justifyContent: 'start', fontWeight: 'normal' }}
                    disabled={isAddButtonDisabled}
                >
                    <div className="group-form__add-button">
                        <Add style={{ fill: 'var(--secondary-color)' }} />
                    </div>
                    <div>
                        <span>Добавить члена группы</span>
                    </div>
                </Button>
            </div>
            <div className="form-layout__section">
                <Button
                    children={'Создать группу'}
                    onClick={handleSubmitClick}
                    variant={'primary'}
                />
            </div>
        </FormLayout>
    );
}

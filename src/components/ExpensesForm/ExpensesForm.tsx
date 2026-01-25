import '../FormLayout/FormLayout.css';
import './ExpensesForm.css';
import { type ChangeEvent, type SyntheticEvent, useState } from 'react';
import FormLayout from '../FormLayout/FormLayout.tsx';
import type { Expense, GroupResponseDTO, MemberResponseDTO } from '../../types/types.ts';
import SelectInput from '../../ui/SelectInput/SelectInput.tsx';

type Checks = Record<string, boolean>;
interface DividedSum { fraction: number, ways: number }

const getSumDivided = (amount: number, checkStates: Checks): DividedSum => {
    const numberOfChecked = Object.values(checkStates).reduce((acc, value) => {
        return value ? acc + 1 : acc;
    }, 0);

    if (!numberOfChecked || !amount) {
        return { fraction: 0, ways: 0 };
    }

    return { fraction: Math.round(amount / numberOfChecked * 100) / 100, ways: numberOfChecked };
};

const getHintString = (amount: number, checkStates: Checks): string => {
    const result: DividedSum = getSumDivided(amount, checkStates);

    if (!result.fraction || !result.ways) {
        return '';
    }

    return `${String(result.fraction)} руб/чел`;
};

const handleEditClick = (e: SyntheticEvent<HTMLElement>): void => {
    const el = e.currentTarget.querySelector('input[type="text"]') as HTMLInputElement;

    el.focus();
};

const GROUP: GroupResponseDTO = {
    id: 1,
    name: 'Buhaem v pyatnicu',
    members: [
        {
            id: 1,
            name: 'Леша',
        },
        {
            id: 2,
            name: 'Саша',
        },
        {
            id: 3,
            name: 'Ваня',
        },
        {
            id: 4,
            name: 'Дима',
        },
        {
            id: 5,
            name: 'Тима',
        },
        {
            id: 6,
            name: 'Фая',
        },
    ],
};

const GROUP_2: GroupResponseDTO = {
    id: 2,
    name: 'веселые посиделки',
    members: [
        {
            id: 1,
            name: 'Леша',
        },
    ],
};

const GROUPS: GroupResponseDTO[] = [GROUP, GROUP_2];

export default function ExpensesForm() {
    const [total, setTotal] = useState('');

    const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTotal(e.target.value);
    };

    const [group, setGroup] = useState<GroupResponseDTO>(GROUPS[0]);

    const [isDividedEvenly, setIsDividedEvenly] = useState<boolean>(true);

    const [checksState, setChecksState] = useState<Checks>(() => {
        return group.members.reduce((acc: Checks, value: MemberResponseDTO) => {
            return { ...acc, [value.name]: true };
        }, {});
    });

    const handleCheckStateChange = (e: ChangeEvent<HTMLInputElement>) => {
        const elementName = e.target.name;

        setChecksState({ ...checksState, [elementName]: !checksState[elementName] });
    };

    // todo: не обновляется c useMemo
    const hintString = getHintString(+total, checksState);

    const [details, setDetails] = useState('');

    const handleExpenseNameInput = (e: ChangeEvent<HTMLInputElement>): void => {
        setDetails(e.target.value);
    };

    const selectChangeHandler = (id: number) => {
        const group: GroupResponseDTO = GROUPS.find((group: GroupResponseDTO) => group.id === id)!;

        setGroup(group);

        setChecksState(() => {
            return group.members.reduce((acc: Checks, value: MemberResponseDTO) => {
                return { ...acc, [value.name]: isDividedEvenly };
            }, {});
        });
    };

    const isSubmitDisabled = (() => {
        const isAnyChosen: boolean = Object.values(checksState).some((value: boolean) => value);

        return !details || !total || (!isDividedEvenly && !isAnyChosen);
    })();

    return (
        <FormLayout>
            <span style={{ textAlign: 'left' }}>Комментарий</span>
            <div
                className='form-layout__row form-layout__row_bordered form-layout__row_header-input'
                onClick={handleEditClick}
            >
                <input
                    type="text"
                    className='form-layout__text-input_invisible-border form-layout__text-input_header'
                    placeholder='Например, пицца'
                    onChange={handleExpenseNameInput}
                />
            </div>
            <span style={{ textAlign: 'left' }}>Сумма</span>
            <div
                className='form-layout__row form-layout__row_bordered form-layout__row_header-input'
                onClick={handleEditClick}
            >
                <input
                    type="text"
                    name='input-total'
                    className='form-layout__text-input_invisible-border form-layout__text-input_header'
                    placeholder='Введите сумму'
                    value={total}
                    onChange={handleAmountChange}
                />
            </div>

            {hintString && (
                <div className={'form-layout__row'}>
                    <span>{hintString}</span>
                </div>
            )}

            <hr style={{ color: 'black', height: '1px' }}/>

            <span style={{ textAlign: 'left' }}>Группа</span>
            <div>
                <SelectInput options={GROUPS} defaultValue={group} handler={selectChangeHandler}/>
            </div>

            <button
                onClick={() => {
                    setChecksState((): Checks => {
                        return Object.keys(checksState).reduce((acc: Checks, name: string) => {
                            return { ...acc, [name]: !isDividedEvenly };
                        }, {});
                    });

                    setIsDividedEvenly((prev: boolean) => !prev);
                }}
            >{isDividedEvenly ? 'Выбрать из списка' : 'Разделить поровну'}</button>

            {
                isDividedEvenly ? (
                    <></>
                ) : (
                    group.members.map((member: MemberResponseDTO, index: number) => (
                        <div className='form-layout__row form-layout__row_bordered' key={index}>
                            <label style={{ cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    name={member.name}
                                    onChange={handleCheckStateChange}
                                    checked={checksState[member.name]}
                                    style={{ margin: '1rem', cursor: 'pointer' }}
                                />
                                <span>{member.name}</span>
                            </label>
                        </div>
                    ))
                )
            }

            <hr style={{ color: 'black', height: '1px' }}/>

            <button
                className='form-layout__button_primary form-layout__button_full-width'
                disabled={isSubmitDisabled}
                style={isSubmitDisabled ? { cursor: 'not-allowed' } : { cursor: 'pointer' }}
                onClick={() => {
                    const expense: Expense = {
                        total: +total,
                        details: details,
                        group: GROUP,
                    };

                    console.log(expense);
                }}
            >Сохранить
            </button>
        </FormLayout>
    );
}
